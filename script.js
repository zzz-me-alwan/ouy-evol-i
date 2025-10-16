const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzm7ODOZMkckKuS7B-1PMe0zfG9X52K5k4LgQvyyPGfCFvtGZJojikVtHxSc__UFPkY9A/exec";

document.getElementById("absenForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").files[0];
  const status = document.getElementById("status");

  status.innerText = "Mengirim...";

  // Convert foto ke base64
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
      status.innerText = "✅ " + text;
      document.getElementById("absenForm").reset();
    } catch (err) {
      status.innerText = "❌ Gagal: " + err.message;
    }
  };
  reader.readAsDataURL(photo);
});

