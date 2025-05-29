import React from 'react';
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory } from 'lucide-react';

const SubmissionResults = ({ submission }) => {
  
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.submission.memory || '[]');
  const timeArr = JSON.parse(submission.submission.time || '[]');

  // Calculate averages
  const avgMemory = memoryArr
    .map(m => parseFloat(m)) // remove ' KB' using parseFloat
    .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime = timeArr
    .map(t => parseFloat(t)) // remove ' s' using parseFloat
    .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.submission.testCases.filter(tc => tc.passed).length;
  const totalTests = submission.submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      
      {/* Overall Status */}
      <div style={{fontFamily:"font4"}} className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <div  className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 style={{fontFamily:"font4"}} className="card-title text-sm text-[#FFD580] ">Status</h3>
            <div style={{fontFamily:"font4"}} className={`text-lg font-bold ${
              submission.submission.status === 'Accepted' ? 'text-success' : 'text-error'
            }`}>
              {submission.submission.status}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm text-[#FFD580]">Success Rate</h3>
            <div className="text-lg font-bold text-blue-500">
              {successRate.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2 text-[#FFD580]">
              <Clock className="w-4 h-4" />
              Avg.Runtime
            </h3>
            <div className="text-lg font-bold text-blue-500">
              {avgTime.toFixed(3)}s
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2 text-[#FFD580]">
              <Memory className="w-4 h-4 " />
              Avg.Memory
            </h3>
            <div className="text-lg font-bold text-blue-500">
              {avgMemory.toFixed(0)}KB
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 style={{fontFamily:"font4"}} className="card-title mb-4 text-[#FFD580]">Test Cases Results</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">

              <thead>
                <tr style={{fontFamily:"font4"}} className='border-1'>
                  <th className='border-1 text-[#FFD580]'>Status</th>
                  <th className='border-1 text-[#FFD580]'>Expected Output</th>
                  <th className='border-1 text-[#FFD580]'>Your Output</th>
                  <th className='border-1 text-[#FFD580]'>Memory</th>
                  <th className='border-1 text-[#FFD580] '>Time</th>
                </tr>
              </thead>

              <tbody  className='border-1 border-[#FFD580] !bg-[#1D232A]'>
                {submission.submission.testCases.map((testCase) => (
                  <tr style={{fontFamily:"font4"}} key={testCase.id} className='border-1 border-[#FFD580]'>
                    <td className='border-1 border-[#FFD580]'>
                      {testCase.passed ? (
                        <div style={{fontFamily:"font4"}} className="!bg-[#1D232A] flex items-center gap-2 text-success ">
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error">
                          <XCircle className="w-5 h-5" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td style={{fontFamily:"font4"}} className="font-mono border-1 border-[#FFD580]">{testCase.expected}</td>
                    <td style={{fontFamily:"font4"}} className="font-mono border-1 border-[#FFD580]">{testCase.stdout || 'null'}</td>
                    <td className=" border-1 border-[#FFD580]">{testCase.memory}</td>
                    <td  className=" border-1 border-[#FFD580]">{testCase.time}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SubmissionResults;