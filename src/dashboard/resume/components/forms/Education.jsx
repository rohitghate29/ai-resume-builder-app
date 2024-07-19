import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../service/GlobalAPI";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([{ ...formField }]);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);
  const addNewEducation = () => {
    setEducationList([...educationList, formField]);
  };

  const removeEducation = () => {
    setEducationList([...educationList.slice(0, -1)]);
  };
  const handleChange = (i, e) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[i][name] = value;
    setEducationList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };
    console.log(data);
    GlobalAPI.updateResume(param?.resumeId, data).then((res) => {
      console.log(res);
      setLoading(false);
      toast("Details Updated !");
    }),
      (err) => {
        setLoading(false);
        console.error(err);
        toast("Server error, please try again !");
      };
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);
  return (
    <div>
      <div className="shadow-lg p-5 border-t-primary border-t-4 rounded-lg mt-5">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details.</p>

        {educationList.map((item, index) => (
          <div className="mt-3" key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-sm">University Name</label>
                <Input
                  name="universityName"
                  defaultValue={item.universityName}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-sm">Degree</label>
                <Input
                  name="degree"
                  defaultValue={item.degree}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-sm">Major</label>
                <Input
                  name="major"
                  defaultValue={item.major}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-sm">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  defaultValue={item.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-sm">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  defaultValue={item.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Description</label>
                <Textarea
                  name="description"
                  defaultValue={item.description}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={addNewEducation}>
              {" "}
              + Add More Education
            </Button>
            <Button variant="outline" onClick={removeEducation}>
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
