"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import Img from "@/assets/user-default.jpg";

interface Props {
  onUpload?: (data: File) => Promise<void>;
  defaultImage?: string;
}

export default function ProfilePhotoUpload({ onUpload ,defaultImage}: Props) {
  const [photo, setPhoto] = useState<string | null>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);

      console.log(file);

      onUpload && onUpload(file);
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
      <header>
        <h3 className="font-medium text-2xl">Perfil</h3>
      </header>
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
            <AvatarImage src={photo ??  defaultImage ?? Img.src} alt="Profile photo" />
            <AvatarFallback>Preview</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <aside>
        <p className="text-gray-500 opacity-80 text-sm font-normal">
          Permitido *.jpeg, *.jpg, *.png, *.gif max 3 Mb
        </p>
      </aside>
      {photo && (
        <div className="flex justify-center space-x-2">
          <Button variant="destructive" size="sm" onClick={handleRemovePhoto}>
            <X className="w-4 h-4 mr-2" />
            Remover imagen
          </Button>
        </div>
      )}
    </div>
  );
}
