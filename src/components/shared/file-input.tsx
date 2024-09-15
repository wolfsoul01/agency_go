'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from 'lucide-react'

export default function ProfilePhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  const handleRemovePhoto = () => {
    setPhoto(null)
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ease-in-out ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        {photo ? (
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={photo} alt="Profile photo" />
            <AvatarFallback>Preview</AvatarFallback>
          </Avatar>
        ) : (
          <div className="text-gray-500">
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <p className="text-sm">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag and drop your profile photo here, or click to select'}
            </p>
          </div>
        )}
      </div>
      {photo && (
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPhoto(null)}>
            Change Photo
          </Button>
          <Button variant="destructive" size="sm" onClick={handleRemovePhoto}>
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}