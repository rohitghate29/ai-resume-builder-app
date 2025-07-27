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


const PROMPT = `You are a professional resume writer. Generate 5-7 compelling bullet points for work experience based on the position title provided.

Position Title: {positionTitle}

Requirements:
- Generate exactly 5-7 bullet points
- Each bullet point should be 15-25 words
- Use strong action verbs to start each point
- Include quantifiable achievements where applicable (use realistic percentages/numbers)
- Focus on accomplishments, not just job duties
- Make it ATS-friendly with relevant keywords
- Use professional, results-oriented language

Format Requirements:
- Return ONLY the bullet points in HTML unordered list format
- Use <ul> and <li> tags
- Do not include any other text, explanations, or formatting
- Each <li> should contain one complete bullet point

Example format:
<ul>
<li>Developed and implemented comprehensive marketing strategies that increased brand awareness by 35% and generated $2M in additional revenue</li>
<li>Led cross-functional teams of 8-12 members to deliver complex projects on time and 15% under budget</li>
<li>Streamlined operational processes using data analytics, resulting in 25% improvement in efficiency and cost reduction</li>
<li>Collaborated with stakeholders to identify business requirements and delivered innovative solutions that enhanced user experience</li>
<li>Managed client relationships and maintained 95% satisfaction rate while expanding account portfolio by 40%</li>
</ul>

Now generate bullet points for: {positionTitle}`;


function RichTextEditor({ onRichEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateWorkSummaryFromAIEnhanced = async () => {
  setLoading(true);
  
  if (!resumeInfo.experience?.[index].title) {
    toast("Please add position title");
    setLoading(false);
    return;
  }

  try {
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience?.[index].title
    );
    
    const result = await AIChatSession.sendMessage(prompt);
    let responseText = result.response.text();
    
    // Comprehensive cleanup
    responseText = responseText
      .replace(/```html/gi, '')
      .replace(/```/g, '')
      .replace(/^\s*[\r\n]/gm, '')
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\*/g, '') // Remove markdown
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .trim();
    
    // Parse and reconstruct to ensure valid HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(responseText, 'text/html');
    let listItems = Array.from(doc.querySelectorAll('li'));
    
    // If no proper li elements found, try to extract from raw text
    if (listItems.length === 0) {
      const lines = responseText
        .split(/\n|<br>|<br\/>/)
        .map(line => line.replace(/<[^>]*>/g, '').replace(/^[-•*]\s*/, '').trim())
        .filter(line => line.length > 10); // Filter out very short lines
      
      if (lines.length > 0) {
        const validBulletPoints = lines.slice(0, 7); // Take max 7 points
        const htmlList = '<ul>' + 
          validBulletPoints.map(point => `<li>${point}</li>`).join('') + 
          '</ul>';
        setValue(htmlList);
      } else {
        toast("Unable to generate proper bullet points. Please try again.");
      }
    } else {
      // Use the parsed li elements
      const bulletPoints = listItems
        .map(li => li.textContent.trim())
        .filter(text => text.length > 10)
        .slice(0, 7);
      
      const htmlList = '<ul>' + 
        bulletPoints.map(point => `<li>${point}</li>`).join('') + 
        '</ul>';
      setValue(htmlList);
    }
    
  } catch (error) {
    console.error('Error generating work summary:', error);
    toast("Failed to generate work summary. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="flex justify-between my-2 items-center px-4">
        <h2>Summary</h2>
        <Button
          size="sm"
          variant="outline"
          className="text-[#0081a7] border-[#0081a7] flex gap-2"
          onClick={generateWorkSummaryFromAIEnhanced}
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
