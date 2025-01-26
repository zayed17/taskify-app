import { useState } from 'react';
import { useCreateFeedMutation, useGetFeedQuery,useDeleteFeedMutation } from '../api';
import { showSuccessNotification, showErrorNotification } from '../utils/notifications';


export const useFeed = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createFeed, { isLoading: isCreatingFeed }] = useCreateFeedMutation();
  const { data, isLoading: isFetchingFeeds, error ,refetch} = useGetFeedQuery('');
  const [deleteFeed] = useDeleteFeedMutation();

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      showErrorNotification('Invalid File', 'You can only upload image files!');
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    setFile(file);
    return false;
  };

  const onFinish = async (values: { caption: string }) => {
    try {
      if (!file) {
        showErrorNotification('Missing Image', 'Please upload an image!');
        return;
      }
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', 'my_upload_preset'); 

      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dg20rzuao/image/upload', 
        {
          method: 'POST',
          body: formData,
        }
      );


      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryData.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const feedData = {
        caption: values.caption,
        imageUrl: cloudinaryData.secure_url,
      };

      console.log(feedData)
      await createFeed(feedData).unwrap(); 
      showSuccessNotification('Feed added successfully!');
      refetch()
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      showErrorNotification('Failed to add feed', 'Something went wrong');
    }
  };


  const onDelete = async (feedId: string) => {
    try {
        console.log(feedId,"cece")
      await deleteFeed(feedId).unwrap();
      console.log("fsdfsf")
      showSuccessNotification('Feed deleted successfully!');
      refetch();
    } catch (error) {
      showErrorNotification('Failed to delete feed', 'Something went wrong');
    }
  };


  return {
    feeds:data?.feeds,
    isLoading: isFetchingFeeds || isCreatingFeed,
    error,
    imagePreview,
    beforeUpload,
    onFinish,
    onDelete,
  };
};