import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';

export const uploadImages = (imageUri, setImage, setFields) => {
  handleImagePicked(imageUri, setImage, setFields);
};

const handleImagePicked = async (pickerResult, setImage, setFields) => {
  // setLoading(true)
  try {
    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(
        pickerResult.assets[0].uri,
        pickerResult,
      );
      console.log(4);
      setImage(uploadUrl);
      setFields('profilePic', uploadUrl);

      // setUpload(false);
      alert('Image uploaded successfully');

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

async function uploadImageAsync(uri, imageUri) {
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
    `UserProfile/${imageUri.assets[0].fileName}`,
  );
  console.log(5);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
