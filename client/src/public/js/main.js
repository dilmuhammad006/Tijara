import customAxios from "../../config/axios.config";

const categorySelect = document.getElementById("categorySelect");

async function loadCategories() {
  try {
    const res = await customAxios.get("/category");
    const categories = res.data.data;

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error("❌ Kategoriyalarni olishda xatolik:", err);
  }
}

loadCategories();
