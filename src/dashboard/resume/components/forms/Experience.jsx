import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import RichTextEditor from "@/dashboard/components/RichTextEditor";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalAPI from "../../../../../service/GlobalAPI";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([{ ...formField }]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    resumeInfo && setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichEditorChange = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalAPI.updateResume(param?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        console.log(error + error.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="shadow-lg p-5 border-t-primary border-t-4 rounded-lg mt-5">
        <h2 className="font-bold text-lg">Proffessional Experience</h2>
        <p>Add previous work experience</p>
        <div>
          {experienceList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-sm">Position Title</label>
                  <Input
                    defaultValue={item?.title}
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-sm">Company Name</label>
                  <Input
                    name="companyName"
                    defaultValue={item?.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-sm">City</label>
                  <Input
                    name="city"
                    defaultValue={item?.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-sm">State</label>
                  <Input
                    name="state"
                    defaultValue={item?.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-sm">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={item?.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-sm">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={item?.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm">Work Summary</label>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichEditorChange={(event) =>
                      handleRichEditorChange(event, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={addNewExperience}>
              {" "}
              + Add More Experience
            </Button>
            <Button variant="outline" onClick={removeExperience}>
              {" "}
              - Remove
            </Button>
          </div>
          <Button onClick={() => onSave()} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
