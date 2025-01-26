import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my_app/feeds',
      upload_preset: 'my_upload_preset',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};