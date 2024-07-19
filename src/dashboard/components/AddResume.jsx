import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalAPI from "./../../../service/GlobalAPI.js";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalAPI.createNewResume(data).then((res) => {
      if (res) {
        setLoading(false);
        navigate("/dashboard/resume/" + res.data.documentId + "/edit");
      }
    }),
      (error) => {
        console.log(error.message);
        setLoading(false);
      };
  };

  return (
    <div>
      <div
        className="p-14 py-24 mx-4 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-5">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!resumeTitle || loading}
              onClick={() => onCreate()}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <h1 className="font-semibold text-center my-1">Create New Resume</h1>
    </div>
  );
}

export default AddResume;
