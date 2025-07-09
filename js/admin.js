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
const auth = firebase.auth();

let contactMessagesListener = null;
let formSubmissionsListener = null;
let membershipApplicationsListener = null;

// Update login functionality
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Sign in with Firebase Authentication
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    // Check if user is admin (you can add custom claims for more robust admin checks)
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-container").style.display = "block";
    loadAllData();
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
});

// Add logout functionality (add this button to your admin panel HTML)
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut().then(() => {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("admin-container").style.display = "none";
  });
});

// Check auth state when page loads
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-container").style.display = "block";
    loadAllData();
  } else {
    // User is signed out
    document.getElementById("login-container").style.display = "block";
    document.getElementById("admin-container").style.display = "none";
  }
});

// Load all data from Firestore
function loadAllData() {
  loadContactMessages();
  loadFormSubmissions();
  loadMembershipApplications();

  // Initialize DataTables after data is loaded
  setTimeout(() => {
    $("#contactTable").DataTable();
    $("#formTable").DataTable();
    $("#membershipTable").DataTable();
  }, 1000);
}

// Load contact messages
function loadContactMessages() {
  const tableBody = document.getElementById("contactTableBody");
  tableBody.innerHTML = "";

  db.collection("contactMessages")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp?.toDate() || new Date();

        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${data.name || "-"}</td>
                    <td>${data.email || "-"}</td>
                    <td>${
                      data.message ? data.message.substring(0, 50) + "..." : "-"
                    }</td>
                    <td>${date.toLocaleString()}</td>
                    <td class="status-${data.status || "pending"}">${
          data.status || "pending"
        }</td>
                    <td>
                        <button class="btn btn-sm btn-primary view-message" data-id="${
                          doc.id
                        }" data-type="contact">View</button>
                        <button class="btn btn-sm btn-success mark-read" data-id="${
                          doc.id
                        }" data-type="contact">Mark Read</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });

      // Add event listeners to new buttons
      addMessageViewListeners();
      addMarkReadListeners();
    });
}

// Load form submissions
function loadFormSubmissions() {
  const tableBody = document.getElementById("formTableBody");
  tableBody.innerHTML = "";

  db.collection("formSubmissions")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp?.toDate() || new Date();

        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${data.name || "-"}</td>
                    <td>${data.contact || "-"}</td>
                    <td>${data.email || "-"}</td>
                    <td>${date.toLocaleString()}</td>
                `;
        tableBody.appendChild(row);
      });
    });
}

// Load membership applications
function loadMembershipApplications() {
  const tableBody = document.getElementById("membershipTableBody");
  tableBody.innerHTML = "";

  db.collection("membershipApplications")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp?.toDate() || new Date();
        const location = `${data.city || ""}${
          data.city && data.state ? ", " : ""
        }${data.state || ""}`;

        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${data.name || "-"}</td>
                    <td>${data.contact || "-"}</td>
                    <td>${data.email || "-"}</td>
                    <td>${data.age || "-"}</td>
                    <td>${location || "-"}</td>
                    <td>${date.toLocaleString()}</td>
                    <td class="status-${data.status || "pending"}">${
          data.status || "pending"
        }</td>
                    <td>
                        <button class="btn btn-sm btn-primary view-application" data-id="${
                          doc.id
                        }">View</button>
                        <button class="btn btn-sm btn-success approve-application" data-id="${
                          doc.id
                        }">Approve</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });

      // Add event listeners to new buttons
      addApplicationViewListeners();
      addApproveListeners();
    });
}

// View message in modal
function addMessageViewListeners() {
  document.querySelectorAll(".view-message").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      const type = e.target.getAttribute("data-type");

      const doc = await db.collection(`${type}Messages`).doc(id).get();
      const data = doc.data();

      document.getElementById(
        "messageModalTitle"
      ).textContent = `Message from ${data.name}`;
      document.getElementById("messageModalBody").innerHTML = `
                <p><strong>Name:</strong> ${data.name || "-"}</p>
                <p><strong>Email:</strong> ${data.email || "-"}</p>
                <p><strong>Date:</strong> ${
                  data.timestamp?.toDate().toLocaleString() || "-"
                }</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${data.message || "-"}</p>
            `;

      const modal = new bootstrap.Modal(
        document.getElementById("messageModal")
      );
      modal.show();
    });
  });
}

// Mark message as read
function addMarkReadListeners() {
  document.querySelectorAll(".mark-read").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      const type = e.target.getAttribute("data-type");

      await db.collection(`${type}Messages`).doc(id).update({
        status: "read",
      });
    });
  });
}

// View application details
function addApplicationViewListeners() {
  document.querySelectorAll(".view-application").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");

      const doc = await db.collection("membershipApplications").doc(id).get();
      const data = doc.data();
      const date = data.timestamp?.toDate() || new Date();
      const location = `${data.city || ""}${
        data.city && data.state ? ", " : ""
      }${data.state || ""}`;

      document.getElementById(
        "messageModalTitle"
      ).textContent = `Application from ${data.name}`;
      document.getElementById("messageModalBody").innerHTML = `
                <p><strong>Name:</strong> ${data.name || "-"}</p>
                <p><strong>Contact:</strong> ${data.contact || "-"}</p>
                <p><strong>Email:</strong> ${data.email || "-"}</p>
                <p><strong>Age:</strong> ${data.age || "-"}</p>
                <p><strong>Location:</strong> ${location || "-"}</p>
                <p><strong>Date:</strong> ${date.toLocaleString()}</p>
                <p><strong>Status:</strong> ${data.status || "pending"}</p>
                <hr>
                <button class="btn btn-success approve-application" data-id="${id}">Approve Application</button>
            `;

      const modal = new bootstrap.Modal(
        document.getElementById("messageModal")
      );
      modal.show();

      // Add approve listener to modal button
      document
        .querySelector("#messageModalBody .approve-application")
        .addEventListener("click", async () => {
          await db.collection("membershipApplications").doc(id).update({
            status: "approved",
          });
          modal.hide();
        });
    });
  });
}

// Approve application
function addApproveListeners() {
  document.querySelectorAll(".approve-application").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");

      await db.collection("membershipApplications").doc(id).update({
        status: "approved",
      });
    });
  });
}
