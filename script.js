// URL endpoint Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNHit9HEvKhD7AlpvDjutTnMCsuNpcI8ieJkheiMj-QEUhE7DXDOGD7KnXARPh_zmtWA/exec";

// Menangani event submit pada form
document.getElementById("absenForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // Ambil data dari form
  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").files[0];
  const status = document.getElementById("status");

  status.innerText = "Mengirim..."; // Tampilkan status proses

  // Baca file foto sebagai base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result.split(",")[1]; // Ambil bagian base64

    // Siapkan data untuk dikirim
    const formData = new FormData();
    formData.append("title", title);
    formData.append("filename", photo.name);
    formData.append("image", base64Image);

    try {
      // Kirim data ke Google Apps Script
      const res = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const text = await res.text();

      // Jika respons mengandung URL, jangan tampilkan
      if (text.includes("http") || text.includes("https")) {
        status.innerText = "✅ Data berhasil dikirim.";
      } else {
        status.innerText = "✅ " + text;
      }

      // Reset form setelah berhasil
      document.getElementById("absenForm").reset();
    } catch (err) {
      // Tampilkan pesan gagal tanpa URL
      status.innerText = "❌ Gagal mengirim data.";
    }
  };

  reader.readAsDataURL(photo); // Mulai membaca file foto
});
