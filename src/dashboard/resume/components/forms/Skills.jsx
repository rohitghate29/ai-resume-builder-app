import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../service/GlobalAPI";
import { toast } from "sonner";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalAPI.updateResume(resumeId, data).then((res) => {
      console.log(res);
      setLoading(false);
      toast("Details updated !");
    }),
      (error) => {
        setLoading(false);
        toast("Server error, please try again");
      };
  };

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="shadow-lg p-5 border-t-primary border-t-4 rounded-lg mt-5">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your Key Skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-3 my-2"
          >
            <div>
              <label>Name</label>
              <Input
                defaultValue={item?.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewSkills}>
            {" "}
            + Add More Skills
          </Button>
          <Button variant="outline" onClick={removeSkills}>
            {" "}
            - Remove
          </Button>
        </div>
        <Button onClick={() => onSave()} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
