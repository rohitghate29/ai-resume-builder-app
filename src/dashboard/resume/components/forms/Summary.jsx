import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "../../../../../service/GlobalAPI";
import { toast } from "sonner";
import { Brain, Clipboard, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines for fresher.";
function Summary({ enableNext }) {
  const param = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState(null);

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = result.response.text();
      console.log("AI Response Text:", responseText);

      let aiSummary;
      try {
        aiSummary = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
      }

      if (aiSummary && aiSummary.summary) {
        setAiGeneratedSummary(aiSummary);
      } else {
        console.error("AI response does not have summary: ", aiSummary);
      }
    } catch (error) {
      console.error("Error generating summary: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const txt = navigator.clipboard.writeText(aiGeneratedSummary.summary);
    toast("Summary coppied.");
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalAPI.updateResume(param?.resumeId, data).then((res) => {
      enableNext(true);
      setLoading(false);
      toast("Details updated successfully.");
    }),
      (err) => {
        console.log(err);
        setLoading(false);
      };
  };
  return (
    <div>
      <div className="shadow-lg p-5 border-t-primary border-t-4 rounded-lg mt-5">
        <h2 className="font-bold text-lg">Summary</h2>
        <form onSubmit={onSave}>
          <div className="flex justify-between items-center">
            <p>Add summary for your job title.</p>
            <Button
              size="sm"
              variant="outline"
              className="text-[#0081a7] border-[#0081a7] flex gap-2"
              onClick={() => generateSummaryFromAI()}
              disabled={loading}
            >
              <Brain className="h-4 w-4" />
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Generate With AI"
              )}
            </Button>
          </div>
          <div>
            <Textarea
              className="mt-5"
              name="summary"
              required
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummary && (
        <div className="transition-all duration-100 shadow-lg mt-6 px-4 py-2 border">
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <h2 className="font-bold my-1">Suggested Summary</h2>
              <div className="shadow-lg p-2 cursor-pointer border">
                <Clipboard className="cursor-pointer" onClick={handleCopy} />
              </div>
            </div>
            <p className="text-gray-500 transition-all">
              {aiGeneratedSummary.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
