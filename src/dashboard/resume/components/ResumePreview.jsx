import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react'
import PersonalInfo from './preview/PersonalInfo';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillPreview from './preview/SkillPreview';

function ResumePreview() {

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div
      className="h-full shadow-lg p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor || "black" }}
    >
      {/* Personal Info  */}
      <PersonalInfo resumeInfo={resumeInfo} />

      {/* Summary Info */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Experience Preview */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Education Section */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skiil Preview */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;