document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.visibility = "hidden";

  const loadingScreen = document.getElementById("loading-screen");
  const skipButton = document.getElementById("skip-button");

  window.addEventListener("load", function () {
    document.documentElement.style.visibility = "visible";
    setTimeout(function () {
      loadingScreen.style.opacity = "0";
      setTimeout(function () {
        loadingScreen.style.display = "none";
      }, 300);
    }, 5000);
  });

  skipButton.addEventListener("click", function () {
    document.documentElement.style.visibility = "visible";
    loadingScreen.style.opacity = "0";
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 10);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dates = document.querySelectorAll(".date");
  dates.forEach((dateElement) => {
    let text = dateElement.textContent.trim();
    const match = text.match(
      /([A-Za-z]+) (\d{1,2}), (\d{4}) (\d{1,2}):(\d{2})\s?(AM|PM)/i
    );
    if (match) {
      const monthStr = match[1];
      let day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      let hours = parseInt(match[4], 10);
      const minutes = parseInt(match[5], 10);
      const period = match[6].toUpperCase();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = monthNames.indexOf(monthStr);
      if (monthIndex === -1) return;
      if (period === "PM" && hours !== 12) {
        hours += 12;
      }
      if (period === "AM" && hours === 12) {
        hours = 0;
      }
      const dateObj = new Date(year, monthIndex, day, hours, minutes);
      dateObj.setHours(dateObj.getHours() + 9);
      const newMonthStr = monthNames[dateObj.getMonth()];
      const newDay = dateObj.getDate();
      const newYear = dateObj.getFullYear();
      const newHours = dateObj.getHours().toString().padStart(2, "0");
      const newMinutes = dateObj.getMinutes().toString().padStart(2, "0");

      const newText = `${newMonthStr} ${newDay}, ${newYear} ${newHours}:${newMinutes}`;

      dateElement.textContent = newText;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fade = document.createElement("div");
  fade.id = "fade";
  const closeBtn = document.createElement("span");
  closeBtn.id = "close-btn";
  closeBtn.innerHTML = "&times;";
  fade.appendChild(closeBtn);
  const expandedMedia = document.createElement("div");
  expandedMedia.id = "expanded-media";
  fade.appendChild(expandedMedia);
  document.body.appendChild(fade);

  // Store reference to the original video
  let originalVideo = null;

  document.querySelectorAll(".photo").forEach((photo) => {
    photo.addEventListener("click", function () {
      expandedMedia.innerHTML = `<img src="${photo.src}" id="expanded-img" />`;
      const img = expandedMedia.querySelector("img");
      img.style.display = "block";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "90vh";
      fade.style.display = "flex";
    });
  });
  document.querySelectorAll(".video").forEach((video) => {
    video.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      originalVideo = video;
      if (!video.paused) {
        video.pause();
      }
      expandedMedia.innerHTML = `
        <video id="expanded-video" controls autoplay>
          <source src="${video.querySelector("source").src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
      const vid = expandedMedia.querySelector("video");
      vid.style.display = "block";
      vid.style.maxWidth = "100%";
      vid.style.maxHeight = "90vh";
      fade.style.display = "flex";
    });
  });
  closeBtn.addEventListener("click", function () {
    fade.style.display = "none";
    expandedMedia.innerHTML = "";
    if (originalVideo) {
      originalVideo = null;
    }
  });
  fade.addEventListener("click", function (e) {
    if (e.target === fade) {
      fade.style.display = "none";
      expandedMedia.innerHTML = "";
      if (originalVideo) {
        originalVideo = null;
      }
    }
  });
});

function clear_search(ok) {
  let search = document.getElementById("search-input");
  search.readOnly = true;
  ch = search.value;
  let i = ch.length;
  document.getElementById("Found").innerHTML = "";
  function clearCharacter() {
    if (i > 0) {
      ch = ch.substring(0, i - 1);
      search.value = ch;
      i--;
      setTimeout(clearCharacter, 50);
    } else {
      search.readOnly = false;
    }
  }
  clearCharacter();
}

let currentSearchIndex = -1;
let currentMatches = [];

function Search_Chat(ok) {
  const searchInput = document.getElementById("search-input");
  const Found = document.getElementById("Found");
  const container = document.querySelector(".chat-container");
  let searchText;
  if (ok == "") {
    searchText = searchInput.value.trim();
  } else {
    searchText = ok;
  }
  if (!searchText) {
    Found.innerHTML = "Type Something...";
    return;
  }

  const messages = document.querySelectorAll(".message-content");

  if (searchInput.dataset.lastSearch !== searchText) {
    messages.forEach((msg) => {
      const parent = msg.parentElement;
      parent.style.transform = "";
      parent.style.background = "";
    });

    currentMatches = [];
    currentSearchIndex = -1;
    messages.forEach((message, index) => {
      const messageText = message.textContent || message.innerText;
      if (messageText.toLowerCase().includes(searchText.toLowerCase())) {
        currentMatches.push(index);
      }
    });

    searchInput.dataset.lastSearch = searchText;

    if (currentMatches.length === 0) {
      Found.innerHTML = "0 / 0";
      return;
    }
  }

  if (ok == "") {
    currentSearchIndex = (currentSearchIndex + 1) % currentMatches.length;
    Found.innerHTML = currentSearchIndex + 1 + " / " + currentMatches.length;
  } else {
    currentSearchIndex = 0;
  }

  const matchIndex = currentMatches[currentSearchIndex];
  const matchedMessage = messages[matchIndex];
  const parentMatch = matchedMessage.parentElement;
  const messagePosition = parentMatch.offsetTop;
  container.scrollTop = messagePosition - 10;

  const messageType = parentMatch.classList.contains("sent")
    ? "sent"
    : "received";

  if (messageType == "sent") {
    parentMatch.style.transform = "scale(1.05)";
    parentMatch.style.background = "#89d3f8";
    setTimeout(() => {
      parentMatch.style.transform = "scale(1)";
      parentMatch.style.background = "#aee1f9";
    }, 3000);
  } else if (messageType == "received") {
    parentMatch.style.transform = "scale(1.05)";
    parentMatch.style.background = "#ffbdde";
    setTimeout(() => {
      parentMatch.style.transform = "scale(1)";
      parentMatch.style.background = "#ffd6eb";
    }, 3000);
  }
}
function Typing() {
  document.getElementById("Found").innerHTML = "";
  setTimeout;
}
function GoUp() {
  const container = document.querySelector(".chat-container");
  container.scrollTop = 0;
}

function GoDown() {
  const container = document.querySelector(".chat-container");
  container.scrollTop = container.scrollHeight;
}
let ScrollToOpened = false;
function OpenScrollTo() {
  if (ScrollToOpened) {
    CloseScrollTo();
  } else {
    element = document.getElementsByClassName("cute-container")[0];
    element.style.transform = "translate(-50%, -50%) scale(1)";
    ScrollToOpened = true;
  }
}
function CloseScrollTo() {
  element = document.getElementsByClassName("cute-container")[0];
  element.style.transform = "translate(-50%, -50%) scale(0)";
  ScrollToOpened = false;
}
T = [
  "نحبك 🙃💗",
  "توحشتك",
  "تهني حبي 😔💗",
  "حاسه في لخر بش ترصيلي نبيع بطاطا online",
  "Aug 3, 2024 00:00",
  "نخلوها في ليستت اول حاجات نعملوها بعد مانعرسو 🙂",
  "كل مانجي نرقد تجيني موجة سعادة 🙂",
  "W machrou3 lm3iz ch3malt fih😂",
];

function ScrollTo(i) {
  const container = document.querySelector(".chat-container");
  Search_Chat(T[i]);
  CloseScrollTo();
}

document.addEventListener("DOMContentLoaded", function () {
  const messages = document.querySelectorAll(".message-content");

  messages.forEach((message) => {
    message.addEventListener("dblclick", function () {
      const textToCopy = this.textContent
        .replace(this.querySelector(".date").textContent, "")
        .trim();
      navigator.clipboard.writeText(textToCopy);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.querySelector(".chat-container");
  const messages = document.querySelectorAll(".message");
  let currentMessageIndex = 0;
  function getVisibleMessageIndex() {
    for (let i = 0; i < messages.length; i++) {
      const rect = messages[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        return i;
      }
    }
    return 0;
  }
  function scrollToMessage(index) {
    if (index >= 0 && index < messages.length) {
      const message = messages[index];
      const offset = 10;
      const messageTop = message.offsetTop;

      chatContainer.scrollTo({
        top: messageTop - offset,
        behavior: "smooth",
      });

      currentMessageIndex = index;
    }
  }

  scrollToMessage(0);
  document.addEventListener("keydown", function (event) {
    currentMessageIndex = getVisibleMessageIndex();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (currentMessageIndex < messages.length - 1) {
        scrollToMessage(currentMessageIndex + 1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (currentMessageIndex > 0) {
        scrollToMessage(currentMessageIndex - 1);
      }
    }
  });
});
