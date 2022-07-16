import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';
import {createPost} from '../../server/apis/post';

export const uploadImages = (
  imageUri,
  setImage,
  setFields,
  imagePath,
  setIsUploaded,
  userId,
) => {
  handleImagePicked(
    imageUri,
    setImage,
    setFields,
    imagePath,
    setIsUploaded,
    userId,
  );
};

const handleImagePicked = async (
  pickerResult,
  setImage,
  setFields,
  imagePath,
  setIsUploaded,
  userId,
) => {
  // setLoading(true)
  try {
    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(
        pickerResult.assets[0].uri,
        pickerResult,
        imagePath,
      );
      console.log(4);
      setImage(uploadUrl);
      setFields('profilePic', uploadUrl);

      // setUpload(false);
      setIsUploaded(true);
      try {
        return await createPost({
          user: userId._id,
          postAddressUrl: uploadUrl,
        });
      } catch (error) {
        console.log(error.message);
      }

      // setTimeout(() => {
      //   setProgress(0);
      // }, 2000);
    }
    // setLoading(false)
    // setChangeButton(true)
  } catch (e) {
    // setLoading(false)
    alert(e.message);
  } finally {
    // setUpload(false)
  }
};

async function uploadImageAsync(uri, imageUri, imagePath) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };

    xhr.responseType = 'blob';
    console.log(1);
    xhr.open('GET', uri, true);
    console.log(2);
    xhr.send(null);
  });
  const fileRef = ref(
    getStorage(),
    `${imagePath}/${imageUri.assets[0].fileName}`,
  );
  console.log(5);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
