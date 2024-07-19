import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import cv from "./../../../public/pic2.png";
import { LoaderCircle, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalAPI from "./../../../service/GlobalAPI";
import { toast } from "sonner";

function ResumeCard({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(resume.themeColor);

  const handleDelete = () => {
    setLoading(true);
    GlobalAPI.deleteResumeById(resume.documentId).then((res) => {
      toast("Resueme deleted !");
      refreshData();
      setLoading(false);
      setOpenDeleteDialog(false);
    }),
      (error) => {
        setLoading(false);
      };
  };
  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className={`relative mx-2 p-4 flex flex-col items-center bg-secondary rounded-lg h-[310px] hover:scale-105 transition-all hover:shadow-md cursor-pointer bg-gradient-to-t from-indigo-400 to-indigo-500 overflow-hidden
          border border-t-4`}
          style={{
            borderColor: resume.themeColor,
          }}
        >
          <div className="md:h-[200px]  mt-8">
            <img src={cv} />
          </div>
          <div
            className="absolute bottom-0  flex items-center w-full justify-between p-2 cursor-default text-white capitalize"
            onClick={(e) => e.preventDefault()}
            style={{
              backgroundColor: resume.themeColor,
            }}
          >
            <h2 className="font-semibold">{resume.title}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="h-4 w-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    navigate("/dashboard/resume/" + resume.documentId + "/edit")
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate("/my-resumes/" + resume.documentId + "/view")
                  }
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate("/my-resumes/" + resume.documentId + "/view")
                  }
                >
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDeleteDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you really want to delete this resume ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-white bg-red-600 hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ResumeCard;
