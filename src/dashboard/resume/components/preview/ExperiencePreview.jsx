import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-4">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Proffesional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((exp, i) => (
        <div key={i} className="my-4">
          <h2 className="font-bold" style={{ color: resumeInfo?.themeColor }}>
            {exp?.title}
          </h2>
          <div key={i} className="flex justify-between text-xs font-semibold">
            <h2>
              {exp?.companyName}, {exp?.city}, {exp?.state}
            </h2>
            <h2>
              {exp?.startDate} {" to "}
              {exp?.currentlyWorking ? "Present" : exp?.endDate}
            </h2>
          </div>
          <div
            className="text-xs"
            dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
