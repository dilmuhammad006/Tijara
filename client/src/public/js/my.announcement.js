import customAxios from "../../config/axios.config";

const list = document.getElementById("announcementList");

async function loadAnnouncements() {
  try {
    const res = await customAxios.get(`/announcement`);
    const data = res.data.data;

    if (data.length === 0) {
      list.innerHTML = "<p>No announcements found.</p>";
      return;
    }

    list.innerHTML = "";

    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "announcement";
      card.setAttribute("data-id", item.id);

      const images = item.images.map(
        (img) => `http://localhost:3000/uploads/${img}`
      );
      const imageHtml = `
        <div class="image-slider" data-index="${index}">
          <img src="${images[0]}" class="slider-img" />
          <button class="prev-btn">&#10094;</button>
          <button class="next-btn">&#10095;</button>
        </div>
      `;

      card.innerHTML = `
        ${imageHtml}
        <div class="announcement-content">
          <div class="title">${item.name}</div>
          <div class="price">$${Number(item.price).toLocaleString()}</div>
          <div class="info">📍 ${item.location}</div>
          <div class="desc">${item.description}</div>
        </div>
        <div class="actions">
          <button class="like-btn" data-index="${index}">❤️ <span>0</span></button>
          <button class="delete-btn" data-id="${item.id}">🗑 Delete</button>
        </div>
      `;

      list.appendChild(card);

      const slider = card.querySelector(".image-slider");
      const imgTag = slider.querySelector(".slider-img");
      const prevBtn = slider.querySelector(".prev-btn");
      const nextBtn = slider.querySelector(".next-btn");
      let current = 0;

      prevBtn.addEventListener("click", () => {
        current = (current - 1 + images.length) % images.length;
        imgTag.src = images[current];
      });

      nextBtn.addEventListener("click", () => {
        current = (current + 1) % images.length;
        imgTag.src = images[current];
      });
    });

    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const span = btn.querySelector("span");
        const card = btn.closest(".announcement");

        const announcementId = card.getAttribute("data-id");
        const userId = localStorage.getItem("userId");

        const count = parseInt(span.textContent);
        const liked = btn.classList.toggle("liked");
        span.textContent = liked ? count + 1 : count - 1;

        try {
          await customAxios.post("/liked", {
            userId:1,
            announcementId:1,
          });
        } catch (err) {
          console.error("❌ Error", err);
          alert("Error while connecting the server");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("Are you sure you want to delete this announcement?")) {
          try {
            await customAxios.delete(`/announcement/${id}`);
            btn.closest(".announcement").remove();
          } catch (err) {
            alert("❌ Failed to delete announcement.");
          }
        }
      });
    });
  } catch (err) {
    console.error(err);
    list.innerHTML =
      "<p style='color:red;'>❌ Failed to load announcements.</p>";
  }
}

loadAnnouncements();
