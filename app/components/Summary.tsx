import ScoreBadge from "./ScoreBadge";
import ScoreGuage from "./ScoreGuage";

function Category ({ title, score }: { title: string; score: number }) {

    const textColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
          <div className="category">
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-2xl">{title}</p>
              <ScoreBadge score={score} />
            </div>
            <p className="text-2xl">
              <span className={textColor}>{score}</span>
            </p>
          </div>
        </div>
    );
}

function Summary({ feedback }: { feedback: Feedback }) {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGuage score={feedback.overallScore || 0} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">Your Resume Score</h2>
                  <p className="text-sm text-gray-500">This score is caclculated based on the variables listed below</p>
                </div>
            </div>
          <Category title="Tone and Style" score={feedback.toneAndStyle.score || 0} />
          <Category title="Content" score={feedback.content.score || 0} />
          <Category title="Structure" score={feedback.structure.score || 0} />
          <Category title="Skills" score={feedback.skills.score || 0} />
        </div>
    );
}

export default Summary;
