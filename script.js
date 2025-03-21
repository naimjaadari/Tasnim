var TimerLabel = document.getElementById("Timer");

var FirstDay = 11;
var FirstMonth = 4;
var FirstYear = 2024;

function padWithZero(value) {
  return value < 10 ? "0" + value : value;
}

function timeFromDate(day, month, year) {
  var givenDate = new Date(year, month - 1, day);
  var currentDate = new Date();
  var differenceInMilliseconds = Math.abs(currentDate - givenDate);

  var totalSeconds = Math.floor(differenceInMilliseconds / 1000);
  var totalMinutes = Math.floor(totalSeconds / 60);
  var totalHours = Math.floor(totalMinutes / 60);
  var totalDays = Math.floor(totalHours / 24);

  var years = Math.floor(totalDays / 365);
  var remainingDays = totalDays % 365;
  var hours = totalHours % 24;
  var minutes = totalMinutes % 60;
  var seconds = totalSeconds % 60;

  years = padWithZero(years);
  remainingDays = padWithZero(remainingDays);
  hours = padWithZero(hours);
  minutes = padWithZero(minutes);
  seconds = padWithZero(seconds);

  return `${years} : ${remainingDays} : ${hours} : ${minutes} : ${seconds}`;
}

function padWithZero(number) {
  return number.toString().padStart(2, "0");
}

function updateTimer() {
  TimerLabel.textContent = timeFromDate(FirstDay, FirstMonth, FirstYear);
}

setInterval(updateTimer, 1000);
updateTimer();

var HeaderisOpen = false;

function Appear_Header() {
  var header = document.getElementById("Main_Header");
  var Button = document.getElementById("Menu_Button");
  var mubtn = document.getElementById("Music_Button");
  var chatbtn = document.getElementById("Chat_Button");
  ClickSoundEffect();
  if (!HeaderisOpen) {
    header.style.top = "1vh";
    Button.style.display = "none";
    HeaderisOpen = true;
    mubtn.style.left = "2vw";
    chatbtn.style.left = "2vw";
    chatbtn.style.top = "11vh";
  } else {
    header.style.top = "-15vh";
    Button.style.display = "block";
    HeaderisOpen = false;
    mubtn.style.left = "calc(5vw + 6vmin)";
    chatbtn.style.left = "calc(7vw + 12vmin)";
    chatbtn.style.top = "3vh";
  }
}
var chatIsOpen = false;
var rot = 90;
let buttonClicked = false;
var animationDuration = 550;

function CloseElement(element) {
  element.style.transform = "translate(-50%, -50%) scale(0)";
  element.style.opacity = "0";
  setTimeout(function () {
    element.style.display = "none";
  }, animationDuration);
}
function AppearElement(element) {
  element.style.transform = "translate(-50%, -50%) scale(0)";
  element.style.opacity = "0";
  element.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.1)";
  element.style.display = "block";
  setTimeout(function () {
    element.style.transform = "translate(-50%, -50%) scale(1)";
    element.style.opacity = "1";
    element.style.boxShadow = "0 10px 30px rgba(255, 105, 180, 0.2)";
  }, 10);
}

function Appear_Chat() {
  ClickSoundEffect();
  var header = document.getElementById("message_container");
  if (buttonClicked) return;
  buttonClicked = true;
  if (musicIsOpen == true) {
    musicIsOpen = false;
    CloseElement(document.getElementById("music_player"));
    document.getElementById("Music_Button").style.transform =
      "rotate(0deg) scale(1)";
  } else {
    Appear_Black_Screen();
  }

  setTimeout(function () {
    buttonClicked = false;
  }, 500);

  if (chatIsOpen) {
    CloseElement(header);
    chatIsOpen = false;
  } else {
    AppearElement(header);
    chatIsOpen = true;
  }
}

var musicIsOpen = false;
function Appear_MusicPlayer() {
  ClickSoundEffect();
  var header = document.getElementById("music_player");
  var button = document.getElementById("Music_Button");
  if (buttonClicked) return;
  buttonClicked = true;
  if (chatIsOpen) {
    chatIsOpen = false;
    CloseElement(document.getElementById("message_container"));
  } else {
    Appear_Black_Screen();
  }

  setTimeout(function () {
    buttonClicked = false;
  }, 500);
  if (musicIsOpen) {
    CloseElement(header);
    musicIsOpen = false;
  } else {
    AppearElement(header);
    musicIsOpen = true;
  }
  if (musicIsOpen) {
    rot = rot === 90 ? -90 : 90;
    var ch = `rotate(${rot}deg) scale(1.5)`;
    button.style.transform = ch;
  } else {
    var ch = `rotate(0deg) scale(1)`;
    button.style.transform = ch;
  }
}

let currentIndex = 0;
const dates = document.querySelectorAll(".Date_Holder");
const totalDates = dates.length;

function showSlide(index) {
  dates.forEach((date, i) => {
    date.classList.remove("active");
    date.style.transform = `translateX(${(i - index) * 60}vmin)`;
  });
  dates[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalDates;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalDates) % totalDates;
  showSlide(currentIndex);
}
showSlide(currentIndex);
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

var T = [
  "نقعدو عالبحر فالليل",
  "نحكيلك عالنوت",
  "نعملو اول 100 بومبا مع بعضنا",
  "نعملك شطر كاس تاي",
  "SiaSnowman نرقصو على",
  "Frozen نتفرجو على",
  "نهديلك كتاب شعر ليك",
  "نسمو قطوسنا طيطو وقطوستنا طاطا ووردتنا روزي",
];

var ok = true;
var i = 0;

function ChangeFuture() {
  var Element = document.getElementById("Input");

  if (ok) {
    ok = false;
    Element.textContent = "";
    for (let j = 0; j < T[i].length; j++) {
      setTimeout(() => {
        Element.textContent += T[i][j];
        if (j === T[i].length - 1) {
          ok = true;
          if (i + 1 >= T.length) {
            i = 0;
          } else {
            i += 1;
          }
        }
      }, j * 50);
    }
  }
}

function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

window.addEventListener("message", async function (event) {
  if (event.data.type === "changeBox1") {
    var Answer = event.data.text;
    var Bubble = document.getElementById("Level_Title" + event.data.Q);
    if (Answer) {
      Bubble.style.background = "radial-gradient(lime, green)";
    } else {
      Bubble.style.background = "radial-gradient(pink, red)";
    }
  } else if (event.data.type === "OpenNextQ") {
    await wait(0.25);
    document.getElementById("Game_Frame").style.opacity = "0";
    await wait(0.25);
    var link = document.getElementById("Game_Frame").src;
    var Bar = document.getElementById("Real_Bar");
    Num = Number(link.substring(link.length - 6, link.length - 5)) + 1;
    Bar.style.width = Num - 1 + "0vw";
    link = "Level" + Num + ".html";
    document.getElementById("Game_Frame").src = "backup/Pages/" + link;
    await wait(0.5);
    document.getElementById("Game_Frame").style.opacity = "1";
  } else if (event.data.type == "Complete") {
    document.getElementById("Game_Frame").src = "backup/Pages/Final.html";
    document.getElementById("dat").href = "#Dates";
    document.getElementById("fut").href = "#Future";
    document.getElementsByClassName("lock")[0].style.display = "none";
    document.getElementsByClassName("lock")[1].style.display = "none";
  }
});
// Music Player
document.addEventListener("DOMContentLoaded", () => {
  const musicList = [
    { title: "ROSE & Bruno Mars - APT", file: "backup/file_music/apt.mp3" },
    {
      title: "Rewrite the stars",
      file: "backup/file_music/Rewrite_the_stars.mp3",
    },
    {
      title: "The Night We Met",
      file: "backup/file_music/The_Night_We_Met.mp3",
    },
    {
      title: "Years And Years - Breathe",
      file: "backup/file_music/Breathe.mp3",
    },
    { title: "Yung kai - blue", file: "backup/file_music/blue.mp3" },
    {
      title: "Die With A Smile",
      file: "backup/file_music/die_with_a_smile.mp3",
    },
  ];
  const musicListElement = document.getElementById("music-list");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const playIcon = document.getElementById("play-icon");
  const nowPlayingElement = document.getElementById("now-playing");

  let currentAudio = null;
  let isPlaying = false;
  let currentTrackIndex = 0;
  function populateMusicList() {
    musicList.forEach((track, index) => {
      const li = document.createElement("li");
      li.className = "music-item";
      li.setAttribute("data-index", index);
      li.innerHTML = ` 
          <span class="music-item-icon">♪</span>
          ${track.title}
        `;
      li.addEventListener("click", () => {
        playTrack(index);
      });

      musicListElement.appendChild(li);
    });
  }
  function playTrack(index) {
    if (currentAudio) {
      currentAudio.pause();
      isPlaying = false;
      document.querySelectorAll(".music-item").forEach((item) => {
        item.classList.remove("playing");
      });
    }
    currentTrackIndex = index;
    const track = musicList[index];
    currentAudio = new Audio();
    currentAudio.src = track.file;
    currentAudio.addEventListener("ended", () => {
      playNextTrack();
    });
    document
      .querySelector(`.music-item[data-index="${index}"]`)
      .classList.add("playing");
    nowPlayingElement.textContent = `Playing: ${track.title}`;
    currentAudio.play().catch((e) => {
      console.log(
        "Audio playback failed. This is expected in this demo since we don't have actual audio files."
      );
    });
    isPlaying = true;
    updatePlayIcon();
  }
  function updatePlayIcon() {
    ClickSoundEffect();
    if (isPlaying) {
      playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    } else {
      playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  }
  playBtn.addEventListener("click", () => {
    if (!currentAudio && musicList.length > 0) {
      playTrack(0);
      return;
    }

    if (isPlaying) {
      currentAudio.pause();
      isPlaying = false;
    } else {
      currentAudio.play().catch((e) => {
        console.log("Audio playback failed. This is expected in this demo.");
      });
      isPlaying = true;
    }

    updatePlayIcon();
  });
  prevBtn.addEventListener("click", () => {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = musicList.length - 1;
    }
    playTrack(prevIndex);
  });
  nextBtn.addEventListener("click", () => {
    playNextTrack();
  });

  function playNextTrack() {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= musicList.length) {
      nextIndex = 0;
    }
    playTrack(nextIndex);
  }
  populateMusicList();
});

var OpenedPhotoId = "Photo1";

function OpenPhoto(PhotoId) {
  ClickSoundEffect();
  if (PhotoId != OpenedPhotoId) {
    OpenedPhotoId = PhotoId;
    var Container = document.getElementById("Photos_Container");
    for (let i = 0; i < Container.childElementCount; i++) {
      var child = Container.children[i];
      if (child.id != PhotoId) {
        child.style.width = "20%";
        child.style.filter = "grayscale(100%)";
      } else {
        child.style.width = "60%";
        child.style.filter = "grayscale(0)";
      }
    }
  }
}
function LoadTimes() {
  let messageContent = document.getElementById("message_content");
  requestAnimationFrame(() => {
    messageContent.scrollTop = messageContent.scrollHeight;
  });
  let messages = document.getElementsByClassName("message_time");
  let Current_Date = new Date();

  for (let i = 0; i < messages.length; i++) {
    let Message_Date = messages[i].id;
    let msgDate = new Date(Message_Date.replace(/-/g, "/"));
    let FinalMessage = "";

    let timeDiff = Current_Date - msgDate;
    let dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      FinalMessage = "Today";
    } else if (dayDiff === 1) {
      FinalMessage = "Yesterday";
    } else if (dayDiff <= 7 && msgDate.getMonth() === Current_Date.getMonth()) {
      FinalMessage = `${dayDiff} days ago`;
    } else {
      FinalMessage = `${msgDate.getFullYear()}-${String(
        msgDate.getMonth() + 1
      ).padStart(2, "0")}-${String(msgDate.getDate()).padStart(2, "0")}`;
    }

    FinalMessage += `, ${Message_Date.substring(11, 16)}`;
    messages[i].textContent = FinalMessage;
  }
}

//Float Text Based On The Langue Used For The Text
document.querySelectorAll(".message").forEach((message) => {
  function updateTextAlignment() {
    if (/[\u0600-\u06FF]/.test(message.textContent)) {
      message.style.textAlign = "right";
    } else {
      message.style.textAlign = "left";
    }
  }

  updateTextAlignment();
  message.addEventListener("input", updateTextAlignment);
});

function ClickedMessage(e) {
  POPSoundEffect();
  const event = e || window.event;
  const messageEl = event.currentTarget;
  const rect = messageEl.getBoundingClientRect();
  const isHeartClick =
    event.clientX > rect.right - 30 && event.clientY > rect.bottom - 30;
  if (isHeartClick) {
    return;
  }
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  messageEl.style.position = "relative";
  const colors = [
    "#FF9CC4",
    "#FFB6C1",
    "#FFC0CB",
    "#FF85A2",
    "#FF619B",
    "#FFA6D5",
    "#FF73B9",
  ];
  const emojis = ["♥", "🌸", "✿"];
  const particleCount = 12;
  const bubble = document.createElement("div");
  bubble.style.position = "absolute";
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.width = "60px";
  bubble.style.height = "60px";
  bubble.style.borderRadius = "50%";
  bubble.style.background =
    "radial-gradient(circle at 30% 30%, white, #FFC0CB)";
  bubble.style.boxShadow = "0px 0px 15px rgba(255, 182, 193, 0.9)";
  bubble.style.transform = "translate(-50%, -50%) scale(0)";
  bubble.style.opacity = "0.95";
  bubble.style.zIndex = "1000";
  bubble.style.pointerEvents = "none";
  bubble.style.transition = "all 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)";

  try {
    messageEl.appendChild(bubble);
    setTimeout(() => {
      bubble.style.transform = "translate(-50%, -50%) scale(1.3)";
    }, 10);

    setTimeout(() => {
      bubble.style.transform = "translate(-50%, -50%) scale(1.1)";
    }, 150);

    setTimeout(() => {
      bubble.style.transform = "translate(-50%, -50%) scale(0.8)";
      bubble.style.opacity = "0";
    }, 300);
    const flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.width = "100px";
    flash.style.height = "100px";
    flash.style.borderRadius = "50%";
    flash.style.background =
      "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)";
    flash.style.transform = "translate(-50%, -50%) scale(0)";
    flash.style.opacity = "0.7";
    flash.style.zIndex = "998";
    flash.style.pointerEvents = "none";
    flash.style.transition = "all 0.3s ease-out";
    messageEl.appendChild(flash);

    setTimeout(() => {
      flash.style.transform = "translate(-50%, -50%) scale(1.5)";
      flash.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      if (flash.parentNode === messageEl) {
        messageEl.removeChild(flash);
      }
    }, 300);
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 15 + 10;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 40;
      const duration = Math.random() * 800 + 600;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isEmoji = Math.random() > 0.5;

      if (isEmoji) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        particle.innerHTML = emoji;
        particle.style.fontSize = `${size}px`;
      } else {
        particle.innerHTML = "♥";
        particle.style.fontSize = `${size}px`;
      }

      particle.style.position = "absolute";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.color = color;
      particle.style.textShadow = "0px 0px 5px rgba(255,255,255,0.7)";
      particle.style.transform = "translate(-50%, -50%) scale(0) rotate(0deg)";
      particle.style.transformOrigin = "center center";
      particle.style.opacity = "0.95";
      particle.style.zIndex = "999";
      particle.style.pointerEvents = "none";
      particle.style.transition = `all ${duration}ms cubic-bezier(0.1, 0.8, 0.3, 1)`;

      messageEl.appendChild(particle);
      const rotation = (Math.random() - 0.5) * 60;

      setTimeout(() => {
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance - 20;
        particle.style.left = `${targetX}px`;
        particle.style.top = `${targetY}px`;
        particle.style.transform = `translate(-50%, -50%) scale(${
          Math.random() * 0.5 + 0.8
        }) rotate(${rotation}deg)`;
      }, 10);

      setTimeout(() => {
        particle.style.transform = `translate(-50%, -50%) scale(${
          Math.random() * 0.3 + 0.7
        }) rotate(${rotation + 10}deg)`;
      }, duration / 3);

      setTimeout(() => {
        particle.style.opacity = "0";
        particle.style.transform = `translate(-50%, -50%) scale(${
          Math.random() * 0.2 + 0.5
        }) rotate(${rotation + 20}deg)`;
      }, (duration * 2) / 3);

      setTimeout(() => {
        if (particle.parentNode === messageEl) {
          messageEl.removeChild(particle);
        }
      }, duration);
    }

    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("div");
        const sparkleSize = Math.random() * 5 + 3;
        const sparkleAngle = Math.random() * Math.PI * 2;
        const sparkleDistance = Math.random() * 30 + 20;
        const sparkleDuration = Math.random() * 400 + 300;

        sparkle.innerHTML = "✦";
        sparkle.style.position = "absolute";
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.fontSize = `${sparkleSize}px`;
        sparkle.style.color = "white";
        sparkle.style.textShadow = "0px 0px 3px rgba(255, 215, 0, 0.8)";
        sparkle.style.transform = "translate(-50%, -50%) scale(0)";
        sparkle.style.opacity = "0.9";
        sparkle.style.zIndex = "997";
        sparkle.style.pointerEvents = "none";
        sparkle.style.transition = `all ${sparkleDuration}ms ease-out`;

        messageEl.appendChild(sparkle);

        setTimeout(() => {
          const targetX = x + Math.cos(sparkleAngle) * sparkleDistance;
          const targetY = y + Math.sin(sparkleAngle) * sparkleDistance;
          sparkle.style.left = `${targetX}px`;
          sparkle.style.top = `${targetY}px`;
          sparkle.style.transform = "translate(-50%, -50%) scale(1)";
        }, 50);

        setTimeout(() => {
          sparkle.style.opacity = "0";
        }, sparkleDuration / 2);

        setTimeout(() => {
          if (sparkle.parentNode === messageEl) {
            messageEl.removeChild(sparkle);
          }
        }, sparkleDuration);
      }
    }, 100);
    setTimeout(() => {
      if (bubble.parentNode === messageEl) {
        messageEl.removeChild(bubble);
      }
    }, 900);
  } catch (error) {
    console.error("Error in ClickedMessage:", error);
  }
}

function ClickSoundEffect() {
  let audio = new Audio("backup/clickeffect.wav");
  audio.play();
}
function POPSoundEffect() {
  let audio = new Audio("backup/POP.mp3");
  audio.play();
}
let black_screen_IsOpen = false;

function Appear_Black_Screen() {
  let fade = document.getElementById("black_screen");
  if (black_screen_IsOpen) {
    black_screen_IsOpen = false;
    fade.style.opacity = 0;
    setTimeout(() => {
      fade.style.display = "none";
    }, 500);
  } else {
    black_screen_IsOpen = true;
    fade.style.display = "block";
    setTimeout(() => {
      fade.style.opacity = 0.8;
    }, 0);
  }
}
