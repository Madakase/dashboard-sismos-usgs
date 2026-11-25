import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdJPezGTe-bybxOV56r-OdZc__PxY6mGc",
  authDomain: "data-repository-31315.firebaseapp.com",
  databaseURL: "https://data-repository-31315-default-rtdb.firebaseio.com",
  projectId: "data-repository-31315",
  storageBucket: "data-repository-31315.firebasestorage.app",
  messagingSenderId: "224938749286",
  appId: "1:224938749286:web:022bf9196cd28c42cdeca7"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);