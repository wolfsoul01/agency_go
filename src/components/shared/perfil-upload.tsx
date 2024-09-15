import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  profileImage: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size ?? 0 <= 5000000, 'La imagen debe ser menor a 5MB'),
});

type FormData = z.infer<typeof schema>;

const ProfileImageUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Lógica para subir la imagen
    console.log('Imagen lista para subir:', data.profileImage);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
          Subir imagen de perfil
        </label>
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          {...register('profileImage')}
          onChange={handleImageChange}
          className="border p-2"
        />
        {errors.profileImage && (
          <p className="text-red-500">{errors.profileImage.message}</p>
        )}

        {preview && (
          <div className="mt-4">
            <p className="text-sm">Vista previa:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Subir Imagen
        </button>
      </div>
    </form>
  );
};

export default ProfileImageUpload;
