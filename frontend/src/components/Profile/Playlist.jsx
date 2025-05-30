import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { Link } from "react-router";
import { X } from "lucide-react";
import CreatePlaylistModal from "../Problem/CreatePlaylistModal";
const Playlist = () => {

  const { createPlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    getAllPlaylists,
    playlists,
    currentPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist,
  } = usePlaylistStore();

  useEffect(() => {
    getAllPlaylists();
  }, []);

  // console.log("playlists2 :", playlists);
  const playlistData = playlists;

  const togglePlaylist = (id) => {
    setExpandedPlaylist(expandedPlaylist === id ? null : id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };


  const handleDeletePlaylist = (id) => {
    // console.log(id);
    deletePlaylist(id);
  };
  const handleRemovePlaylist = (playlistId, problemIds) => {
    // console.log("playlistId1 :", playlistId);
    // console.log("problemIds2 :", problemIds);
    removeProblemFromPlaylist(playlistId, problemIds);
  };

  return (

    <div className="max-w-7xl mx-auto p-4 sm:p-6 font-sans mt-6 sm:mt-10 rounded-lg mb-6 sm:mb-10">
     
      {/* Header with Create Playlist button */}
      <div
        style={{ fontFamily: "font4" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
          My Playlist
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
        >
          Create Playlist
        </button>
      </div>

      {/* Empty State */}
      {playlistData?.length === 0 && (
        <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-500 rounded-lg bg-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3
            style={{ fontFamily: "font4" }}
            className="mt-2 text-base sm:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-700 to-pink-300"
          >
            No playlist found
          </h3>
          <p className="mt-1 text-sm sm:text-base text-gray-400">
            Create your first playlist to get started
          </p>
          <div className="mt-3 sm:mt-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base"
            >
              Create Playlist
            </button>
          </div>
        </div>
      )}

      {/* Playlist List */}
      {playlistData?.length !== 0 && (
        <div className="space-y-4 bg-slate-700 px-3 py-3 sm:px-5 sm:py-5 rounded-lg mt-6 sm:mt-10">
          
          {playlistData?.map((playlist) => (
            <div
              key={playlist.id}
              className="rounded-lg overflow-hidden bg-slate-800"
            >
              {/* Playlist Header */}
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => togglePlaylist(playlist.id)}
              >
                <h2
                  style={{ fontFamily: "font4" }}
                  className="font-semibold text-sm sm:text-base text-green-500"
                >
                  {playlist.name}
                </h2>
                <span className="text-yellow-500 text-sm sm:text-base">
                  {expandedPlaylist === playlist.id ? "▼" : "▲"}
                </span>
              </div>

              {/* Playlist Meta */}
              <div className="flex items-center px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-gray-400">
                  Created {playlist.createdAt}
                </span>
              </div>

              {/* Expanded Content */}
              {expandedPlaylist === playlist.id && (
                <div className="p-3 sm:p-4 border-t border-gray-500">
                  <h3
                    style={{ fontFamily: "font4" }}
                    className="text-base sm:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-pink-500 to-red-500 mb-3 sm:mb-4"
                  >
                    Problems in this playlist
                  </h3>

                  {/* Empty Problems State */}
                  {playlist?.problems?.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-500 rounded-lg bg-slate-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-2 text-sm sm:text-base text-gray-400">
                        This playlist has no problems yet
                      </p>
                    </div>
                  ) : (
                    /* Problems Table */
                    <div className="overflow-x-auto rounded-lg">
                      <table className="min-w-full divide-y divide-gray-500 rounded-lg">
                        
                        <thead className="bg-slate-900 rounded-lg">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Problem
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Difficulty
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Tags
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Action
                            </th>
                            {/* <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Status
                            </th> */}
                            <th
                              scope="col"
                              className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              Remove
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-slate-900 divide-y divide-gray-500">
                          {playlist?.problems?.map((problem) => (
                            <tr key={problem.id}>
                              <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-white hover:underline">
                                {problem.problem.title}
                              </td>
                              <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                                <span
                                  className={`px-2 py-1 rounded-full text-xxs sm:text-xs font-semibold ${
                                    problem.problem.difficulty === "EASY"
                                      ? "bg-green-300 text-green-900"
                                      : problem.problem.difficulty === "MEDIUM"
                                      ? "bg-yellow-300 text-yellow-800"
                                      : "bg-red-300 text-red-800"
                                  }`}
                                >
                                  {problem.problem.difficulty}
                                </span>
                              </td>
                              <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                <div className="flex flex-wrap gap-1">
                                  {problem?.problem?.tags?.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xxs sm:text-xs border-1 border-yellow-400 text-yellow-400"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                <Link
                                  to={`/problem/${problem.problem.id}`}
                                  className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                                >
                                  View
                                </Link>
                              </td>
                              {/* <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                {problem.problem.solved ? (
                                  <span className="text-green-600">Solved</span>
                                ) : (
                                  <span className="text-red-500">Unsolved</span>
                                )}
                              </td> */}
                              <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                <button
                                  onClick={() =>
                                    handleRemovePlaylist(
                                      playlist.id,
                                      problem.problem.id
                                    )
                                  }
                                  className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm  flex items-center justify-center"
                                >
                                  <span>
                                    <X className="w-5 h-5 text-red-600" />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  )}

                  {/* Delete Button */}
                  <div className="mt-3 sm:mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      style={{ fontFamily: "font4" }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm"
                    >
                      Delete Playlist
                    </button>
                  </div>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

    </div>
    
  );
};

export default Playlist;
