function qrGeneration() {
    // Отримуємо значення введеного тексту або URL
    let qrText = document.getElementById("input-id").value

    // Перевірка, чи введений текст не є порожнім
    if (qrText === "") {
        alert("Oops, please enter your text or URL to generate QR code.");
        return;
    }

    // Отримуємо посилання на зображення QR-коду
    let qrImg = document.getElementById("qrImg");

    // Змінюємо джерело зображення для відповідного QR-коду
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    let imgBox = document.getElementById("imgBox");
    imgBox.classList.add('show');
}
