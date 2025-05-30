import express from "express"
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { addProblemToPlaylist, createPlayList, deletePlaylist, getAllPlayListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controllers.js";

const playlistRoutes = express.Router()

playlistRoutes.post("/create-playlist",isLoggedIn,createPlayList)
playlistRoutes.get("/",isLoggedIn,getAllPlayListDetails)
playlistRoutes.get("/:playlistId",isLoggedIn,getPlayListDetails)
playlistRoutes.post("/add-problem/:playlistId",isLoggedIn,addProblemToPlaylist)
playlistRoutes.delete("/delete-playlist/:playlistId",isLoggedIn,deletePlaylist)
playlistRoutes.post("/remove-problem/:playlistId" , isLoggedIn , removeProblemFromPlaylist)

export default playlistRoutes;