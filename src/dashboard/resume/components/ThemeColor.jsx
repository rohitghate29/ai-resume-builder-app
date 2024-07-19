import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalAPI from "./../../../../service/GlobalAPI";
import { toast } from "sonner";

function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [selectedColor, setSelectedColor] = useState();

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalAPI.updateResume(resumeId, data).then((res) => {
      toast("Theme color changed !");
    });
  };

  const colors = [
    "#00b4d8",
    "#ffb703",
    "#fb8500",
    "#ef233c",
    "#2b2d42",
    "#2ec4b6",
    "#e07a5f",
    "#9f86c0",
    "#274c77",
    "#70e000",
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="font-bold text-sm mb-2">Select theme color</h2>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`w-8 h-8 rounded-lg cursor-pointer hover:border-black border ${
                selectedColor == item && "border border-black"
              }`}
              style={{ background: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
