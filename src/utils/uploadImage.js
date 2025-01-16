import axios from 'axios';

// Upload img to imgbb server and get the image url
const uploadImage = async (selectedImage) => {
  const imageObj = new FormData();
  imageObj.append('image', selectedImage);
  const { data } = await axios.post(
    `${import.meta.env.VITE_IMG_API_URL}?key=${
      import.meta.env.VITE_IMG_API_KEY
    }`,
    imageObj
  );
  return data.data.display_url;
};

export default uploadImage;
