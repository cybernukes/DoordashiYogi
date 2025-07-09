// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDciaUdL8qu6WFzWGJQ29-NNQ2n4sBDliE",
  authDomain: "doordarsheesamooh.firebaseapp.com",
  projectId: "doordarsheesamooh",
  storageBucket: "doordarsheesamooh.appspot.com",
  messagingSenderId: "716013936590",
  appId: "1:716013936590:web:11d40f3cc5e7104ad6959f",
  measurementId: "G-VCBX847D80",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission handler
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;

  try {
    // Add data to Firestore
    await db.collection("formSubmissions").add({
      name: name,
      contact: contact,
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Redirect after successful submission
    window.location.href = "/pages/info.html";
  } catch (error) {
    console.error("Error saving data:", error);
    alert("There was an error submitting your form. Please try again.");
  }
});

console.log("Script is running");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("#nav");

  console.log("Hamburger:", hamburger);
  console.log("Nav:", nav);

  hamburger.addEventListener("click", function () {
    console.log("Hamburger clicked");
    nav.classList.toggle("active");
    console.log("Nav classes:", nav.classList);
  });
});

document.querySelector("data", function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var contact = document.getElementById("contact").value;

  if (!(email == null && password == null)) {
    window.location.replace("/index.html");
  } else {
    alert("Invalid information");
    return;
  }
});
