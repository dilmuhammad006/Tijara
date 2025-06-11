import customAxios from "../../config/axios.config";

const $ = (el) => document.querySelector(el);

const form = $("#register");
const email = $("#Remail");
const name = $("#name");
const password = $("#Rpassword");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const nameValue = name.value.trim();
    await customAxios.post("/auth/register", {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    });

    window.location.href = "../../main.html";
  } catch (error) {
    console.error("Register error:", error);
    if (error.response) {
      const message = error.response.data.message || "Error while register!";
      alert(`Error: ${message}`);
    } else if (error.request) {
      alert("Internal server error!");
    } else {
      alert("Internal server error!");
    }
  }
});


