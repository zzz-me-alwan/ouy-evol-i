const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNHit9HEvKhD7AlpvDjutTnMCsuNpcI8ieJkheiMj-QEUhE7DXDOGD7KnXARPh_zmtWA/exec";

document.getElementById("absenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").files[0];
  const status = document.getElementById("status");
  status.innerText = "Mengirim... 💌";

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result.split(",")[1];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("filename", photo.name);
    formData.append("image", base64Image);

    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const text = await res.text();

      if (text.includes("ok") || text.includes("success")) {
        status.innerText = "✅ Absen berhasil dikirim!";
      } else {
        status.innerText = "❌ Gagal mengirim absen.";
      }

      document.getElementById("absenForm").reset();
    } catch {
      status.innerText = "❌ Terjadi kesalahan. Coba lagi ya 💔";
    }
  };

  reader.readAsDataURL(photo);
});

/* === LOVE BUBBLES === */
function createLove() {
  const love = document.createElement("div");
  love.className = "love";
  love.innerHTML = "💖";
  love.style.left = Math.random() * 100 + "vw";
  love.style.fontSize = 14 + Math.random() * 24 + "px";
  love.style.animationDuration = 6 + Math.random() * 5 + "s";
  document.getElementById("love-bg").appendChild(love);

  setTimeout(() => love.remove(), 9000);
}

setInterval(createLove, 400);
