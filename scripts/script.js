let timer;
let stopwatch;
let timerRunning = false;
let stopwatchRunning = false;
let timerStartTime;
let stopwatchStartTime;
let pausedTime;

function openTab(event, tabName) {
  // Знайдіть всі елементи з класом "tabcontent" та сховайте їх
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Знайдіть всі кнопки з класом "tablinks" та видаліть клас "active"
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // Показати вміст поточної вкладки та позначити вибрану кнопку як активну
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
  
  // Якщо ви переключились на вкладку з таймером, скидайте таймер
  if (tabName === "Timer") {
    resetTimer();
  }
  // Якщо ви переключились на вкладку з секундоміром, скидайте секундомір
  else if (tabName === "Stopwatch") {
    resetStopwatch();
  }
}

function startTimer() {
  let timeParts = document.getElementById("timerInput").value.split(":");
  let hours = parseInt(timeParts[0]) || 0;
  let minutes = parseInt(timeParts[1]) || 0;
  let seconds = parseInt(timeParts[2]) || 0;

  let totalTime = hours * 3600 + minutes * 60 + seconds;

  if (!timerRunning) {
    timerRunning = true;
    timerStartTime = Date.now() - pausedTime;

    timer = setInterval(() => {
      let elapsedTime = Math.floor((Date.now() - timerStartTime) / 1000);
      let remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(timer);
        document.getElementById("timerDisplay").textContent = "Час вийшов!";
        timerRunning = false;
      } else {
        let hours = Math.floor(remainingTime / 3600);
        let minutes = Math.floor((remainingTime % 3600) / 60);
        let seconds = remainingTime % 60;

        document.getElementById("timerDisplay").textContent =
          pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (timerRunning) {
    clearInterval(timer);
    timerRunning = false;
    pausedTime = Date.now() - timerStartTime;
  }
}

function resetTimer() {
  clearInterval(timer);
  timerRunning = false;
  pausedTime = 0;
  document.getElementById("timerInput").value = "";
  document.getElementById("timerDisplay").textContent = "00:00:00";
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchStartTime = Date.now() - pausedTime;

    stopwatch = setInterval(() => {
      let elapsedTime = Math.floor((Date.now() - stopwatchStartTime) / 1000);

      let hours = Math.floor(elapsedTime / 3600);
      let minutes = Math.floor((elapsedTime % 3600) / 60);
      let seconds = elapsedTime % 60;

      document.getElementById("stopwatchDisplay").textContent =
        pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    }, 1000);
  }
}

function pauseStopwatch() {
  if (stopwatchRunning) {
    clearInterval(stopwatch);
    stopwatchRunning = false;
    pausedTime = Date.now() - stopwatchStartTime;
  }
}

function resetStopwatch() {
  clearInterval(stopwatch);
  stopwatchRunning = false;
  pausedTime = 0;
  document.getElementById("stopwatchDisplay").textContent = "00:00:00";
}

function pad(number) {
  return (number < 10 ? "0" : "") + number;
}

// За замовчуванням показати першу вкладку
document.getElementById("Timer").style.display = "block";
document.getElementsByClassName("tablinks")[0].classList.add("active");
