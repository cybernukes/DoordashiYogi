// Firebase configuration
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
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    // Add data to Firestore
    await db.collection("contactMessages").add({
      name: name,
      email: email,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread", // You can use this to track read/unread messages
    });

    // Show success message
    alert("Your message has been sent successfully!");

    // Reset form
    document.querySelector("form").reset();

    // Optionally redirect after successful submission
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error sending message:", error);
    alert("There was an error sending your message. Please try again.");
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
