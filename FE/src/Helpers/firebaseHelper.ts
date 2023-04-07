import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABuco52HsFr4uyH3-rLV5GaGvngb_YTPU",
    authDomain: "t11tutorapp.firebaseapp.com",
    projectId: "t11tutorapp",
    storageBucket: "t11tutorapp.appspot.com",
    messagingSenderId: "392713567509",
    appId: "1:392713567509:web:b5207dddf15c90d3343d1c"
  };

const app = initializeApp(firebaseConfig);

export const uploadImage = async (image: string | ArrayBuffer, path: string) => {
  const storage = getStorage(app);
  const reference = ref(storage, 'jah200003.png');
  if (typeof(image) == 'string') {
    await uploadString(reference, image);
  } else {
    await uploadBytes(reference, image);
  }
  return await getDownloadURL(reference);
}