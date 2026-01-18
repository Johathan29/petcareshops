// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYBRP8bKbCGZwouxwnGDDI4fp3U7Ne8mI",
  authDomain: "tienda-mascotas-dfa68.firebaseapp.com",
  projectId: "tienda-mascotas-dfa68",
  storageBucket: "tienda-mascotas-dfa68.firebasestorage.app",
  messagingSenderId: "22762561888",
  appId: "1:22762561888:web:05e12ac1718b797cc77e05",
  measurementId: "G-D5VSBMZ764"
};

// ✅ Inicializar UNA sola vez
const app = initializeApp(firebaseConfig);

// ✅ Exportar servicios
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;