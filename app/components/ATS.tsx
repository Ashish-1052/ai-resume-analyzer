import ScoreBadge from "./ScoreBadge";

function ATS({ score, suggestions }: { score: number; suggestions: { type: "good" | "improve"; tip: string; }[] }) {
  const textColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-6 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-800">ATS Compatibility Score</h2>
          <p className="text-sm text-gray-500">How well your resume parses in Applicant Tracking Systems</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-4xl font-bold ${textColor}`}>{score}</span>
          <ScoreBadge score={score} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-700">Suggestions for Improvement</h3>
        {suggestions.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex flex-row gap-3 items-start text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{suggestion.tip}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No specific suggestions available.</p>
        )}
      </div>
    </div>
  );
}

export default ATS;