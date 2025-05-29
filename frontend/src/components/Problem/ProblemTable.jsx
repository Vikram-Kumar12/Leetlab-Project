import React, { useState, useMemo } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link } from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  Trash,
  TrashIcon,
  Plus,
  Loader2,
} from "lucide-react";
import { useActions } from "../../store/useActionStore.js";
import AddToPlaylist from "./AddToPlaylist.jsx";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import { usePlaylistStore } from "../../store/usePlaylistStore.js";

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { isDeletingProblem, onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  //   Define allowed difficulties
  const difficulties = ["ESAY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (
      (problems || [])
        // ham aaha searching kar rhe hai
        .filter((problem) =>
          problem.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((problem) =>
          difficulty === "ALL" ? true : problem.difficulty === difficulty
        )
        .filter((problem) =>
          selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
        )
    );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic, kahne ka mtlb hai ki ham ak page mein kitna problem show karwa rhe hai, and ki koi user agr filter kiya hai to usko kitna information show karwa rhe hai, sara information nhi show karwana hai. ham esko scroller rendering se impelement kar sakte hai.
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (

    <div className="w-full max-w-7xl mx-auto mt-20 mb-10">
      {/* Header with Create Playlist Button */}
      <div className="flex justify-between items-center mb-6">
        <h2
          style={{ fontFamily: "font4" }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 hover:scale-105 duration-300"
        >
          Problems
        </h2>
        <button
          style={{ fontFamily: "font4" }}
          className="btn btn-primary gap-2 text-[#FFD580] hover:text-white hover:scale-105 duration-300"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4 outline-none">
        {/* Serach by title ke liye input field */}
        <input
          type="text"
          placeholder="Search by title"
          className="input  w-full md:w-1/3 bg-base-200 focus:outline-none focus:ring-0 focus:shadow-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* This is filter based on deficalties (esay,hard,medium) */}
        <select
          className="select select-bordered bg-base-200 focus:outline-none focus:ring-0 focus:shadow-none"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toUpperCase()}
            </option>
          ))}
        </select>
        {/* This is based on tages like math, string, conditnal based question */}
        <select
          className="select select-bordered bg-base-200 focus:outline-none focus:ring-0 focus:shadow-none"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md bg-slate-800">
        <table className="table  table-lg  text-base-content border-1 border-zinc-600">
          <thead className="">
            <tr style={{ fontFamily: "font4" }} className="text-[#FFD580]">
              <th className="border-b-1 border-zinc-600">Solved</th>
              <th className="border-b-1 border-zinc-600">Title</th>
              <th className="border-b-1 border-zinc-600">Tags</th>
              <th className="border-b-1 border-zinc-600">Difficulty</th>
              <th className="border-b-1 border-zinc-600">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <tr key={problem.id} className="">
                    <td className="border-b-1 border-zinc-600">
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm text-green-500"
                      />
                    </td>
                    <td className="border-b-1 border-zinc-600">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-semibold hover:underline  "
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="border-b-1 border-zinc-600">
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge badge-outline badge-warning text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border-b-1 border-zinc-600">
                      <span
                        className={`badge font-semibold text-xs text-white ${
                          problem.difficulty === "ESAY"
                            ? "badge-success"
                            : problem.difficulty === "MEDIUM"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="border-b-1 border-zinc-600">
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="btn btn-sm btn-error"
                            >
                              {isDeletingProblem ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                              ) : (
                                <TrashIcon className="w-4 h-4 text-white" />
                              )}
                            </button>
                            <button disabled className="btn btn-sm btn-warning">
                              <PencilIcon className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}
                        <button
                          className="btn btn-sm btn-outline flex gap-2 items-center"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Save to Playlist
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
    
  );
};

export default ProblemsTable;
