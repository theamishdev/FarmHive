import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAkbNbatPiqhHrxiwW6yIJrNSjepZMhNxU",
    authDomain: "farmhive-34486.firebaseapp.com",
    projectId: "farmhive-34486",
    storageBucket: "farmhive-34486.firebasestorage.app",
    messagingSenderId: "144319246212",
    appId: "1:144319246212:web:f76b4b258189b41bf3b7d1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("Login Successful: " + user.email);
  } catch (error) {
    alert("Login Failed: " + error.message);
  }
});

