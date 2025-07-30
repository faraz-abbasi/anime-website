// Intro Screen and Music Toggle Logics
window.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById("intro-screen");
  const main = document.getElementById("main-site");
  const enterBtn = document.getElementById("enter-btn");
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  const isMuted = sessionStorage.getItem("musicMuted") === "true";
  const lastTime = parseFloat(sessionStorage.getItem("musicTime")) || 0;

  if (music) {
    music.currentTime = lastTime;
    music.volume = 0.4;

    if (isMuted) {
      music.pause();
    } else {
      
    }
  }

  // === INTRO SCREEN LOGIC ===
  if (sessionStorage.getItem("introShown")) {
    if (intro) intro.style.display = "none";
    if (main) main.style.display = "block";

    // Play music right away if allowed
    if (!isMuted && music) {
      music.play().catch(() => {});
    }
  } else if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      intro.classList.add("fade-out");
      setTimeout(() => {
        intro.style.display = "none";
        main.style.display = "block";
        sessionStorage.setItem("introShown", "true");

        //  Play music here as a user-initiated action
        if (!isMuted && music) {
          music.play().catch(() => {});
        }
      }, 1000);
    });
  }

  // === MUSIC TOGGLE LOGIC ===
  if (music && toggleBtn) {
    toggleBtn.innerHTML = isMuted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';

    toggleBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play().catch(() => {});
        toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        sessionStorage.setItem("musicMuted", "false");
      } else {
        music.pause();
        toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        sessionStorage.setItem("musicMuted", "true");
      }
    });

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("musicTime", music.currentTime);
    });
  }
});



// Anime Quotes Section
const quotes = [
  { jp: "信じろってばよ！", en: "Believe it! – Naruto Uzumaki" },
  { jp: "海賊王に俺はなる！", en: "I'm gonna be King of the Pirates! – Monkey D. Luffy" },
  { jp: "力は必要に応じて生まれる。", en: "Power comes in response to a need. – Son Goku" },
  { jp: "世界を見て、理解したいんだ。", en: "I want to see and understand the world. – Eren Yeager" },
  { jp: "痛みのない教訓には意味がない。", en: "A lesson without pain is meaningless. – Edward Elric" },
  { jp: "恐怖は悪じゃない。それは弱さを教えてくれる。", en: "Fear is not evil. It tells you what your weakness is. – Gildarts Clive" },
  { jp: "自分を信じない者の努力など無意味だ。", en: "Hard work is worthless for those that don’t believe in themselves. – Naruto Uzumaki" },
  { jp: "忘れることは傷のようなものだ。治っても跡は残る。", en: "Forgetting is like a wound. The wound may heal, but it has already left a scar. – Monkey D. Luffy" },
  { jp: "困難を乗り越えてこそ人は成長する。", en: "A person grows up when he's able to overcome hardships. – Jiraiya" },
  { jp: "守りたいものがあると人は強くなる。", en: "A person becomes strong when they have someone to protect. – Haku" },
  { jp: "明日のことは明日の自分に任せよう。", en: "I'll leave tomorrow's problems to tomorrow's me. – Saitama" },
  { jp: "寄り道も楽しむべきだ。", en: "You should enjoy the little detours. – Ginko" }
];

function typeLine(text, target, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      $(target).append(text.charAt(i));
      i++;
      setTimeout(type, 40);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function showQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  $('#anime-quote').fadeOut(200, function () {
    $(this).html('<p class="jp"></p><p class="en"></p>').fadeIn(200);
    typeLine(quote.jp, '#anime-quote .jp', () => {
      setTimeout(() => {
        typeLine(quote.en, '#anime-quote .en');
      }, 600);
    });
  });

  setTimeout(showQuote, 9000); // Show new quote every 9 seconds
}

$(document).ready(function () {
  showQuote();
});


// Most Watched Shows Section

  const scrollRow = document.getElementById('scrollRow');
  document.getElementById('scrollLeft').onclick = () => {
    scrollRow.scrollBy({ left: -200, behavior: 'smooth' });
  };
  document.getElementById('scrollRight').onclick = () => {
    scrollRow.scrollBy({ left: 200, behavior: 'smooth' });
  };