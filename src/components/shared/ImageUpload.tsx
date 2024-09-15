/* eslint-disable @next/next/no-img-element */
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {}

export default function ImageUpload({}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([acceptedFiles[0]]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (files.length === 0) return;

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(imagePreviews);

    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [files]);

  return (
    <div className="flex flex-col space-y-4">
      <div
        {...getRootProps()}
        className="rounded-full"
      >
        <input {...getInputProps()} />
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <X
                onClick={() =>
                  setPreviews(previews.filter((p) => p !== preview))
                }
                className="cursor-pointer absolute text-white "
              />
              <img
                src={preview}
                alt={`preview-${index}`}
                className="h-32 w-32 object-cover rounded-lg "
              />
            </div>
          ))}
        </div>
      )}

      <Button onClick={() => console.log(files)}>Upload</Button>
    </div>
  );
}
