import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalAPI from "./../../service/GlobalAPI";
import ResumeCard from "./components/ResumeCard";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && getResumeList();
  }, [user]);

  /**
   * used to get users resumes
   **/
  const getResumeList = () => {
    GlobalAPI.getResumes(user?.primaryEmailAddress.emailAddress).then((res) => {
      setResumeList(res.data.data);
    });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-bold text-3xl text-sky-600">My Resume</h1>
      <p>Start creating your AI Resume for your next job role.</p>
      <div className="py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
        {resumeList && resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard resume={resume} key={index} refreshData={getResumeList} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
