import React from 'react'

function EducationPreview({resumeInfo}) {
  return (
    <div className="my-4">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education?.map((edu,i) => (
        <div key={i}>
          <h2
            className="font-bold mt-3"
            style={{ color: resumeInfo?.themeColor }}
          >
            {edu?.universityName}
          </h2>
          <div key={i} className="flex justify-between text-xs font-semibold">
            <h2>
              {edu?.degree} in {edu?.major}
            </h2>
            <h2>
              {edu?.startDate} - {edu?.endDate}
            </h2>
          </div>
          <p className="text-xs my-1">{edu?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview