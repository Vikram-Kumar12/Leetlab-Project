import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createPlayList = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json(new ApiError(400, "All fields are required!"));
  }

  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json(new ApiError(404, "User not found!"));
  }

  const existing = await db.playlist.findFirst({
    where: { userId, name },
  });
  if (existing) {
    return res
      .status(409)
      .json(new ApiError(409, "This playlist already exists!"));
  }

  const playlist = await db.playlist.create({
    data: {
      name,
      description,
      userId,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Playlist created successfully!", playlist));
});

export const getAllPlayListDetails = asyncHandler(async (req, res) => {
  const playlists = await db.playlist.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Playlist fetched successfully!", playlists));
});

export const getPlayListDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await db.playlist.findUnique({
    where: {
      id: playlistId,
      userId: req.user.id,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlist) {
    return res.status(404).json(new ApiError(404, "Playlist not found!"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Playlist Details fetched successfully!", playlist),
    );
});

export const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  let { problemIds } = req.body;
  //   console.log(req.params);
  //   console.log(req.body);

  if (typeof problemIds === "string") {
    problemIds = [problemIds]; // Wrap in array
  }
  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    // console.log(problemIds.length);
    // console.log(Array.isArray(problemIds));
    return res
      .status(400)
      .json(new ApiError(400, "Invalid or missing problemsId"));
  }

  // create records for each problems in the playlist
  const problemsInPlaylist = await db.problemInPlaylist.createMany({
    data: problemIds.map((problemId) => ({
      // schema se match karke karna hai nhi to bar bar error aayega : (Argument `playListId` is missing.)
      playListId: playlistId,
      problemId,
    })),
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Problems added to playlist successfully!",
        problemsInPlaylist,
      ),
    );
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const deletedPlaylist = await db.playlist.delete({
    where: {
      id: playlistId,
    },
  });

  res
    .status(204)
    .json(
      new ApiResponse(204, "Playlist deleted successfully!", deletedPlaylist),
    );
});

export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  // console.log("playlistid backend :",playlistId);
  // console.log("problemIds backend :",problemIds);

  if (typeof problemIds === "string") {
    problemIds = [problemIds]; // Wrap in array
  }
  if (!problemIds || !Array.isArray(problemIds)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid problem IDs" });
  }
  // console.log("🧹 Checking if record exists before deletion");
  // const existing = await db.problemInPlaylist.findMany({
  //   where: {
  //     playListId: playlistId,
  //     problemId: { in: problemIds },
  //   },
  // });
  // console.log("🧐 Found records:", existing.length);
  // console.log(existing);

  const deleted = await db.problemInPlaylist.deleteMany({
    where: {
      playListId: playlistId, // ✅ this now matches your schema
      problemId: { in: problemIds },
    },
  });
  // console.log("✅ Deleted count:", deleted.count);
  res
    .status(200)
    .json({ success: true, message: "Problems removed from playlist" });
});
