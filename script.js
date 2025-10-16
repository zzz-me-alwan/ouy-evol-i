const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAuz1ytOj1zujqA4l8bPB96KMjGW3ydyRXkGgzJH2b2zLz0uYocOfa55H6A6ccmRif8A/exec";

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
