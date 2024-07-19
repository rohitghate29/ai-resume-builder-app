import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../service/AIModal";
import { toast } from "sonner";

const PROMPT =
  "generate 5-7 bullet points for my experience in resume for {positionTitle}, give me result in html format";
function RichTextEditor({ onRichEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateWorkSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience?.[index].title) {
      toast("Please add position title");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience?.[index].title
    );
    const result = await AIChatSession.sendMessage(prompt);
    const responseText = result.response.text();
    setValue(responseText.replace("[", "").replace('" ]', ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2 items-center px-4">
        <h2>Summary</h2>
        <Button
          size="sm"
          variant="outline"
          className="text-[#0081a7] border-[#0081a7] flex gap-2"
          onClick={generateWorkSummaryFromAI}
        >
          <Brain className="h-4 w-4" />
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Generate With AI"
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichEditorChange(e);
          }}
        >
          <Toolbar>
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
