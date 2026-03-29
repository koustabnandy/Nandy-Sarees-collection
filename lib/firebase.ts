import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpJWwZHstf33VA_yciKnCfkw3bzPqsXlA",
  authDomain: "nandy-saree.firebaseapp.com",
  projectId: "nandy-saree",
  storageBucket: "nandy-saree.firebasestorage.app",
  messagingSenderId: "401210586700",
  appId: "1:401210586700:web:86180d0a4a2bb33e4326e9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Save order function (FIXED)
export const saveOrderToFirebase = async (orderData: any) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(), // ✅ better timestamp
    });

    console.log("✅ Order saved to Firebase");
  } catch (error) {
    console.error("❌ Firebase error:", error);
  }
};