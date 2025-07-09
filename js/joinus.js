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
document.getElementById("joinus").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const application = {
    name: document.getElementById("Name").value,
    contact: document.getElementById("Contact").value,
    email: document.getElementById("email").value,
    age: document.getElementById("Age").value,
    city: document.getElementById("address").value,
    state: document.getElementById("state").value,
    status: "pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    // Add data to Firestore
    await db.collection("membershipApplications").add(application);

    // Show success message
    alert("Thank you for your application! We will contact you soon.");

    // Reset form
    document.getElementById("joinus").reset();

    // Optionally redirect after submission
    // window.location.href = '/index.html';
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("There was an error submitting your application. Please try again.");
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
