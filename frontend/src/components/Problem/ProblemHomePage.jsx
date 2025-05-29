import React, { useEffect } from "react";
import { useProblemStore } from "../../store/useProblemStore.js";
import { Loader } from "lucide-react";
import ProblemTable from "./ProblemTable.jsx";

const ProblemHomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);
  // console.log("Get all problems data in jsx :",problems);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (

    <div className="bg-slate-900 flex flex-col items-center px-4 pt-10 relative z-10">

      {/* Background elements */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md -z-50"></div>
      <div className="fixed top-1/3 right-0 w-1/4 h-1/4 bg-purple-500 opacity-20 blur-3xl rounded-full -z-50"></div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <h1
          style={{ fontFamily: "font1" }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-[#7B3306] via-yellow-500 to-orange-500"
        >
          Welcome to{" "}
          <span className="text-primary animate-text-gradient">LeetLab</span>
        </h1>

        <p
          style={{ fontFamily: "font1" }}
          className="mt-3 text-center text-base sm:text-lg md:text-xl font-medium max-w-3xl leading-relaxed animate-slide-up delay-100 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-500 to-orange-500"
        >
          LeetLab is your ultimate coding dojo, meticulously crafted to
          transform developers into interview champions. Our platform combines
          the rigor of competitive programming with the precision of technical
          interviews, offering a curated collection of problems that mirror
          real-world challenges at top tech companies. Whether you're preparing
          for FAANG interviews or sharpening your algorithmic thinking, LeetLab
          provides the tools, community, and structured path to coding mastery.
        </p>

        {problems.length > 0 ? (
          <div className="w-full animate-slide-up delay-300">
            <ProblemTable problems={problems} />
          </div>
        ) : (
          <p className="mt-10 text-center text-lg font-semibold text-gray-200 border border-primary/50 px-6 py-3 rounded-md border-dashed hover:bg-primary/10 transition-all duration-300 cursor-default">
            No problems found. Start by adding some coding challenges!
          </p>
        )}
      </div>
      
    </div>
    
  );
};

export default ProblemHomePage;
