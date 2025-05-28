import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../../store/useProblemStore.js";
import { getLanguageId } from "../../lib/lang.js";
import { useExecutionStore } from "../../store/useExecutionStore.js";
import { useSubmissionStore } from "../../store/useSubmissionStore.js";
import Submission from "./Submission.jsx";
import SubmissionsList from "./SubmissionList.jsx";
import Button from "../ReUseAbleCode/Button.jsx"
const ProblemPageById = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  // console.log("submission", submissions);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      // console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">

            {/* description */}
            <p className="text-lg mb-6  bg-gradient-to-r from-zinc-700 via-black to-[#eb9e56] rounded-md px-2 py-2 ">{problem.description}</p>

            {/* example, input, output, explanation */}
            {problem.examples && (
              <>
                <h3  className="text-xl font-bold mb-4 text-[#FFD580]">Examples:</h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2  font-semibold text-xl">
                          Input: <span className="text-white font-semibold text-lg">{example.input}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-xl font-semibold">
                          Output: <span className="text-lg font-semibold text-white">
                          {example.output}
                        </span>
                        </div>
                        
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-xl font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-sem">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {/* Constraints */}
            {problem.constraints && (
              <>
                <h3 style={{ fontFamily: "font4" }} className="text-xl font-bold mb-4 text-[#FFD580]">Constraints:</h3>
                <div className="bg-base-200 px-3 py-4 rounded-xl mb-6">
                  <span className=" px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-5 px-1 bg-slate-900">

      {/* Navbar */}
      <nav className="navbar shadow-lg px-4 py-3 bg-[#8E7353] flex flex-wrap items-start gap-4 transition-all duration-300 ease-in-out rounded-md">
        <div className="flex-1 min-w-[280px]">
          <Link
            to={"/problem-section"}
            className="flex items-center gap-2 text-[#F5F5F5] hover:text-white transition duration-300"
          >
            <Home className="w-6 h-6" />
            <ChevronRight className="w-4 h-4" />
          </Link>

          <div className="mt-3">
            <h1 style={{ fontFamily: "font4" }} className="text-lg md:text-xl font-bold text-[#FFD580] transition duration-300">
              {problem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-[C6B6A5] mt-4">
              <Clock className="w-4 h-4 text-[#FFD580]" />
              <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="text-white/30 hidden sm:inline">•</span>
              <Users className="w-4 h-4 hidden sm:inline text-[#FFD580]" />
              <span className="hidden sm:inline">
                {submissionCount} Submissions
              </span>

              <span className="text-white/30 hidden md:inline">•</span>
              <ThumbsUp className="w-4 h-4 hidden md:inline text-[#FFD580]" />
              <span className="hidden md:inline">95% Success Rate</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center min-w-[200px] justify-end flex-wrap">
          <button
            className={`btn btn-circle bg-[#8E7353] border-none hover:scale-110 hover:bg-[#9e876a] duration-200 ${
              isBookmarked ? "text-primary" : "text-white "
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5 text-[#FFD580]" />
          </button>

          <button className="btn btn-circle bg-[#8E7353] border-none hover:scale-110 hover:bg-[#9e876a] duration-200">
            <Share2 className="w-5 h-5 text-[#FFD580]" />
          </button>

          <select
          // select select-bordered select-primary w-36 md:w-40 transition-all duration-300
            className="bg-slate-900 outline-none w-36 md:w-40 h-10 rounded text-[#FFD580] px-1"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container mx-auto py-4">

        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-1 bg-red-300">

          {/* All information like, discription, example, etc */}
          <div className="shadow-xl bg-[#8E7353] rounded-xl">
            <div className="card-body p-0">

              {/* icon :  description, submission, discussion, hints*/}
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 text-white ${
                    activeTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4 text-[#FFD580]" />
                  Description
                </button>
                <button
                  className={`tab gap-2 text-white ${
                    activeTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4 text-[#FFD580]" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "discussion" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4 text-[#FFD580]" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "hints" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4 text-[#FFD580]" />
                  Hints
                </button>
              </div>

              <div className="px-2 ">{renderTabContent()}</div>
            </div>
          </div>

          {/* Code-Editor and run, submit button */}
          <div className="h-fit  shadow-xl bg-[#8E7353]  px-2 rounded-xl">
            <div className="card-body p-0 mb-5">

              <div className="tabs tabs-bordered">
                <button className="tab tab-active gap-2 text-[#FFD580] text-lg">
                  <Terminal className="w-4 h-4 text-[#FFD580]" />
                  Code Editor
                </button>
              </div>

              {/* Code-editor */}
              <div style={{ borderRadius: "10px", overflow: "hidden" }} className="h-[600px] w-full border-1 border-black hover:border-orange-300">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"                 
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 20,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* Run and submit button */}
              <div className="p-4 border-t border-base-300 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <button
                    className={`btn btn-primary gap-2 ${
                      isExecuting ? "loading" : ""
                    }`}
                    onClick={handleRunCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4" />}
                    Run Code                   
                  </button>
                  <button className="btn btn-success gap-2">
                    Submit Solution
                  </button>
                </div>
              </div>
              
            </div>
          </div>

        </div>

        {/* Test-cases */}
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Test Cases</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono">{testCase.input}</td>
                          <td className="font-mono">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemPageById;
