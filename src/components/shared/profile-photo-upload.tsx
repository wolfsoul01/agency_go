"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneOutgoing, X } from "lucide-react";
import defaultImage from "@/assets/user-default.jpg";
import { cn } from "@/lib/utils";

export default function ProfilePhotoUpload() {
  const [photo, setPhoto] = useState<string | null>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <div
        {...getRootProps()}
        className={`group-hover relative border-2 border-dashed rounded-full  text-center cursor-pointer transition-colors duration-200 ease-in-out ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <div className="">
          <input {...getInputProps()} />
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={photo ?? defaultImage.src} alt="Profile photo" />
            <AvatarFallback>Preview</AvatarFallback>
          </Avatar>

          <aside
          >
            {/* <PhoneOutgoing  className={cn(
              " absolute transition-all duration-150 ease-in-out group-hover:scale-125",
              isDragActive && "opacity-100 scale-125  "
            )}/> */}
          </aside>
        </div>
      </div>
      {photo && (
        <div className="flex justify-center space-x-2">
          <Button variant="destructive" size="sm" onClick={handleRemovePhoto}>
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
