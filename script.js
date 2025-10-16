const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0edcc2ZdEQa7tnWtsYbtDWOmhH15iPHG8LiFChUvwyzYk1lVLFXPtbQGaFQ5Nqiw-8g/exec";

document.getElementById("absenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").files[0];
  const status = document.getElementById("status");

  status.innerText = "📤 Mengirim absen...";

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result.split(",")[1];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("filename", photo.name);
    formData.append("image", base64Image);

    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const data = await res.json();
      status.innerText = data.message || "Absen selesai.";
      document.getElementById("absenForm").reset();
    } catch (err) {
      status.innerText = "❌ Gagal mengirim absen.";
    }
  };
  reader.readAsDataURL(photo);
});

