import React, { useContext, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const {resumeId} = useParams()
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeIndex > 1 && (
            <Button size="sm" onClick={() => setActiveIndex(activeIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal details  */}
      {activeIndex == 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeIndex == 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : activeIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeIndex == 4 ? (
        <Education />
      ) : activeIndex == 5 ? (
        <Skills />
      ) : activeIndex == 6 ? (
        <Navigate to={"/my-resumes/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
}

export default FormSection;
