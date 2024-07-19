import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { Forward } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "./../../../../service/GlobalAPI";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { RWebShare } from "react-web-share";

function ViewResumeInfo() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeById();
  }, []);

  const getResumeById = () => {
    GlobalAPI.getResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print-area">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <div>
            <h2 className="text-2xl font-medium text-center">
              Congrats! Your ultimate AI generated Resume is ready.
            </h2>
            <p className="text-gray-400 text-center">
              Now you can download your resume and also you can share resumes
              with unique url. 😍
            </p>
            <div className="flex justify-end gap-3 px-44 my-10">
              <Button onClick={handleDownload}>Download</Button>
              <RWebShare
                data={{
                  text: "Hey Everyone, this is my resume",
                  url:
                    import.meta.env.VITE_BASE_URL +
                    "/my-resumes/" +
                    resumeId +
                    "/view",
                  title:
                    resumeInfo?.firstName +
                    " " +
                    resumeInfo?.lastName +
                    " Resume",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button>
                  Share <Forward />
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResumeInfo;
