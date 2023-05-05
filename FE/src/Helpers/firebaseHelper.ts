import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "t11tutorapp.firebaseapp.com",
    projectId: "t11tutorapp",
    storageBucket: "t11tutorapp.appspot.com",
    messagingSenderId: "392713567509",
    appId: "1:392713567509:web:b5207dddf15c90d3343d1c"
  };

const app = initializeApp(firebaseConfig);

export const uploadImage = async (image: string | ArrayBuffer, path: string) => {
  const storage = getStorage(app);
  const reference = ref(storage, path);
  if (typeof(image) == 'string') {
    await uploadString(reference, image);
  } else {
    await uploadBytes(reference, image);
  }
  return await getDownloadURL(reference);
}