import React from "react";

function SkillPreview({ resumeInfo }) {
  return (
    <div className="my-4">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((skill, i) => (
          <div key={i} className="flex items-center justify-between px-10">
            <h2 className="text-xs font-medium">{skill?.name}</h2>
            <div className="h-2 w-[120px] border-2 border-black bg-white">
              <div 
                className="h-full border border-black bg-black" 
                style={{ width: skill?.rating * 20 + "%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
