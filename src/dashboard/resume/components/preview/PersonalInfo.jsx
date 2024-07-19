import React from "react";

function PersonalInfo({ resumeInfo }) {
  return (
    <div>
      <h2
        className="font-bold text-center text-xl"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}{" "}
      </h2>
      <h2 className="font-medium text-center text-sm capitalize">
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="font-normal text-center text-xs">{resumeInfo?.address}</h2>
      <div className="flex justify-between my-1 px-2">
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr className="border-[1.5px]"
      style={{borderColor: resumeInfo?.themeColor}}/>
    </div>
  );
}

export default PersonalInfo;
