import "../scss/styles.scss"
import $ from "jquery";
import { loadPage } from "./model.js"
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";





function changeRoute() {
let hashTag = window.location.hash;
 let pageID = hashTag.replace('#', '');
// console.log(hashTag + ' ' + pageID);
if (pageID) {
    loadPage(pageID);
}else{
    loadPage("home");
}
}


function initListeners() {
  $(document).on("click", "#login", function(e) {
   e.preventDefault();
   
   // Check if user is logged in by checking auth state
   const user = auth.currentUser;
   
   if(user) {
     // User is logged in, so log them out
     signOut(auth).then(() => {
       console.log("User signed out successfully");
       // Redirect to home page after logout
       window.location.hash = "#home";
     }).catch((error) => {
       console.error("Error signing out:", error);
     });
   } else {
     // User is not logged in, navigate to login page
     window.location.hash = "#login";
   }
  });
}

 
function initURLListener() {
$(window).on('hashchange', changeRoute);
changeRoute();
}

$(document).ready(function () {
initURLListener();
initListeners();
});


const firebaseConfig = {
  apiKey: "AIzaSyD39Tll1Sqbagwkc0Rzu_kfo0d93ecSKds",
  authDomain: "jungle-315.firebaseapp.com",
  projectId: "jungle-315",
  storageBucket: "jungle-315.appspot.com",
  messagingSenderId: "27741378378",
  appId: "1:27741378378:web:570c9ecfb7130b3a1453b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let canSeeInformation = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    canSeeInformation = true;
  } else {
    console.log("No user is signed in.");
    canSeeInformation = false;
  }
});

$(document).on("click", "#login-btn", function(e) {
  e.preventDefault(); // Prevent form submission
  let emailInput = document.querySelector(".login .email");
  let passwordInput = document.querySelector(".login .password");
  
  if (!emailInput || !passwordInput) {
    console.error("Email or password input not found");
    return;
  }

  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();
  
  if (!email || !password) {
    console.error("Email and password are required");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Update last login time
      return setDoc(doc(db, "users", user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true });
    })
    .then(() => {
      console.log("User logged in successfully");
    })
    .catch((error) => {
      console.error("Error logging in:", error.code, error.message);
    });
});

$(document).on("click", "#signup-btn", function(e) {
  e.preventDefault(); // Prevent form submission
  let emailInput = document.querySelector(".signup .email");
  let passwordInput = document.querySelector(".signup .password");
  let fNameInput = document.getElementById("fName");
  let lNameInput = document.getElementById("lName");
  
  if (!emailInput || !passwordInput || !fNameInput || !lNameInput) {
    console.error("One or more input fields not found");
    return;
  }

  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();
  let fName = fNameInput.value.trim();
  let lName = lNameInput.value.trim();
  
  if (!email || !password || !fName || !lName) {
    console.error("All fields are required");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // First update the auth profile
      return updateProfile(user, {
        displayName: `${fName} ${lName}`
      }).then(() => {
        // Then store additional user data in Firestore
        return setDoc(doc(db, "users", user.uid), {
          firstName: fName,
          lastName: lName,
          email: email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
      });
    })
    .then(() => {
      console.log("User signed up and data stored successfully!");
    })
    .catch((error) => {
      console.error("Error signing up:", error.code, error.message);
    });
});