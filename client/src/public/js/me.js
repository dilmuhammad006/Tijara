import customAxios from "../../config/axios.config.js";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function displayProfile(userData) {
  const user = userData.data;

  document.getElementById("userName").textContent = user.name;
  document.getElementById("userRole").textContent = user.role;

  document.getElementById("userId").textContent = user.id;
  document.getElementById("userNameDetail").textContent = user.name;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userCreatedAt").textContent = formatDate(
    user.createdAt
  );
}

function showError(message) {
  document.getElementById("errorText").textContent = message;
  document.getElementById("errorMessage").style.display = "block";
}

async function fetchProfile() {
  try {
    const response = await customAxios.get("/auth/me");

    if (response.data && response.data.message === "success") {
      displayProfile(response.data);
      document.getElementById("profileContent").style.display = "block";
    } else {
      showError("Incorrect profile info");
    }
  } catch (error) {
    console.error("Error while getting profile info", error);

    if (error.response && error.response.status === 401) {
      showError("Authorization error");
      setTimeout(() => {
        window.location.href = "./sign.html";
      }, 2000);
    } else {
      showError("Please login");
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchProfile();
});
