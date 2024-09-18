/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Plugins de FilePond
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import { toast } from "sonner";
import query from "@/lib/axios.config";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

interface Props {
  roomId: number;
  defaultImageUrl?: string;
}

function RoomImageUpload({ roomId, defaultImageUrl }: Props) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (formData: FormData) => {
    formData.append("roomId", roomId.toString());

    try {
      setIsLoading(true);
      await query.post("/room/upload", formData);
    } catch (error: any) {
      toast.error("Error subiendo la imagen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false}
        maxFiles={1}
        onupdatefiles={setFiles}
        server={{
          url: "http://localhost:3001",
          process: {
            url: "/room/upload",
            method: "POST",
            withCredentials: false,
            ondata(data) {
              handleFileUpload(data);
              return data;
            },
            onload: (response) => {
              toast.success("Imagen subida con éxito");
              return response;
            },
            onerror: (response) => {
              toast.error("Error subiendo la imagen");
              return response;
            },
          },
        }}
        name="file"
        labelIdle="Arrastra y suelta tu imagen "
        acceptedFileTypes={["image/png", "image/jpeg"]}
        allowFileTypeValidation={true}
      />

      {isLoading && <p>Cargando imagen...</p>}
    </div>
  );
}

export default RoomImageUpload;
