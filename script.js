document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "090325";

  // Pages
  const loginPage = document.getElementById("loginPage");
  const listPage = document.getElementById("listPage");
  const viewPage = document.getElementById("viewPage");
  const gamePage = document.getElementById("gamePage");

 // From Arcade Pages Pass 
  const fromArcade =
    new URLSearchParams(
        window.location.search
    ).get("from") === "arcade";

  // Login elements
  const passwordInput = document.getElementById("passwordInput");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");

  // Diary elements
  const diaryList = document.getElementById("diaryList");
  const diaryTitle = document.getElementById("diaryTitle");
  const diaryContent = document.getElementById("diaryContent");
  const logoutBtn = document.getElementById("logoutBtn");
  const backBtn = document.getElementById("backBtn");

  // Game elements
  const ticTacToeBtn = document.getElementById("ticTacToeBtn");
  const backToListBtn = document.getElementById("backToListBtn");
  const cells = document.querySelectorAll(".cell");
  const gameStatus = document.getElementById("gameStatus");

  let diaries = [];

  // Audio files
  const audioFiles = [
    "audio/audio.mp3",
    "audio/audio2.mp3",
    "audio/audio3.mp3",
    "audio/audio4.mp3",
    "audio/audio5.mp3"
  ];

  let currentAudioIndex = 0;
  const audio = new Audio(audioFiles[currentAudioIndex]);

  audio.addEventListener("ended", () => {
    currentAudioIndex++;

    if (currentAudioIndex >= audioFiles.length) {
      currentAudioIndex = 0;
    }

    audio.src = audioFiles[currentAudioIndex];
    audio.play();
  });

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordBtn.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      togglePasswordBtn.textContent = "Show";
    }
  });

  // Login
  const handleLogin = () => {
    const password = passwordInput.value.trim();

    if (password === correctPassword) {
      $(loginPage).fadeOut(400, function() {
        $(listPage).fadeIn(400, function() {
          loadDiaries();
        });
      });

      const now = new Date();

      const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
      };

      const formattedDate =
        now.toLocaleDateString("en-US", options);

      document.getElementById("currentDate").textContent =
        formattedDate;

    } else {
      loginError.textContent =
        "Password Salah. Masukkan Tarikh Birthday.";
    }
  };

  loginBtn.addEventListener("click", handleLogin);

  // Google Sheet visit log
  async function logVisit(note) {
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyL--HnLaXjU3os1NPVL_lVzpUJtrz3IbXnyFkotiGtCu_I1sUzBXkFP2cCt2q-V1wIug/exec",
        {
          method: "POST",
          body: JSON.stringify({
            message: note
          }),
          headers: {
            "Content-Type": "application/json"
          },
          mode: "no-cors"
        }
      );
    } catch (err) {
      console.error("Log failed:", err);
    }
  }

  // Load diary list
  function loadDiaries() {
    fetch("letter for raa.json")
      .then((res) => {
        console.log("Fetch status:", res.status);
        console.log("Fetch URL:", res.url);

        if (!res.ok) {
          throw new Error(
            "Failed to load JSON. Status: " +
            res.status
          );
        }

        return res.json();
      })
      .then((data) => {
        console.log("Loaded data:", data);

        diaries = data.diaries;

        diaryList.innerHTML = "";

        diaries.forEach((entry, index) => {
          const li = document.createElement("li");

          li.textContent = entry.title;

          li.addEventListener("click", () => {
            openDiary(index);
          });

          diaryList.appendChild(li);
        });

        audio.play();
      })
      .catch((err) => {
        diaryList.innerHTML =
          '<li style="color:black;">Sorry.. Tak Dapat Nak Access</li>';

        console.error(
          "Fetch error:",
          err.message
        );
      });
  }

  if (fromArcade) {
  loginPage.style.display = "none";
  listPage.style.display = "block";
  loadDiaries();
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  };
    
  const formattedDate =
    now.toLocaleDateString(
      "en-US",
      options
    );
  document.getElementById(
    "currentDate"
  ).textContent = formattedDate;
}

  // Open diary
  function openDiary(index) {
    const entry = diaries[index];

    if (!entry) return;

    $(listPage).fadeOut(400, function() {
      $(viewPage).fadeIn(400);
    });

    diaryTitle.textContent = entry.title;

    diaryContent.textContent = entry.content;

    document.getElementById("diaryDate").textContent =
      entry.date ? entry.date : "";

    const existingPolaroid =
      document.querySelector(".polaroid");

    if (existingPolaroid) {
      existingPolaroid.remove();
    }

    if (entry.image) {
      const polaroid =
        document.createElement("div");

      polaroid.classList.add("polaroid");

      const img =
        document.createElement("img");

      img.src = entry.image;

      img.alt =
        "Polaroid image for diary entry";

      polaroid.appendChild(img);

      viewPage.appendChild(polaroid);

      polaroid.addEventListener("click", () => {
        document.getElementById(
          "modalImage"
        ).src = entry.image;

        document.getElementById(
          "polaroidModal"
        ).style.display = "flex";
      });
    }
  }

  // Close image modal
  const modal =
    document.getElementById("polaroidModal");

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Back to diary list
  backBtn.addEventListener("click", () => {
    $(viewPage).fadeOut(400, function() {
      $(listPage).fadeIn(400);
    });
  });

  // Log website visit
  logVisit("Opened");

  // Logout
  logoutBtn.addEventListener("click", () => {
    $(listPage).fadeOut(400, function() {
      $(viewPage).fadeOut(400, function() {
        $(gamePage).fadeOut(400, function() {
          $(loginPage).fadeIn(400);
        });
      });
    });

    passwordInput.value = "";

    loginError.textContent = "";

    audio.pause();

    audio.currentTime = 0;
  });

  // =========================
  // TIC-TAC-TOE
  // =========================

  ticTacToeBtn.addEventListener("click", () => {
    $(listPage).fadeOut(400, function() {
      $(gamePage).fadeIn(400);
    });
  });

  let currentPlayer = "X";

  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (
        cell.textContent !== "" ||
        !gameActive
      ) {
        return;
      }

      cell.textContent = currentPlayer;

      checkWinner();

      if (gameActive) {
        currentPlayer =
          currentPlayer === "X"
            ? "O"
            : "X";

        gameStatus.textContent =
          `Player ${currentPlayer}'s turn`;
      }
    });
  });

  function checkWinner() {
    for (
      let combination
      of winningCombinations
    ) {
      const [a, b, c] = combination;

      if (
        cells[a].textContent &&
        cells[a].textContent ===
        cells[b].textContent &&
        cells[a].textContent ===
        cells[c].textContent
      ) {
        gameStatus.textContent =
          `Player ${cells[a].textContent} wins!`;

        gameActive = false;

        return;
      }
    }

    const draw =
      [...cells].every(
        (cell) =>
          cell.textContent !== ""
      );

    if (draw) {
      gameStatus.textContent =
        "It's a draw!";

      gameActive = false;
    }
  }

  // Back from game to diary
  backToListBtn.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    currentPlayer = "X";

    gameActive = true;

    gameStatus.textContent =
      "Your turn";

    $(gamePage).fadeOut(400, function() {
      $(listPage).fadeIn(400);
    });
  });
});
