document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "090417"; 

  // Pages
  const loginPage = document.getElementById("loginPage");
  const listPage = document.getElementById("listPage");
  const viewPage = document.getElementById("viewPage");

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

  let diaries = [];

  // Prepare audio
  const audio = new Audio("audio/audio.mp3");
  audio.loop = true; // audio akan repeat

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

  // ✅ Handle login click (works across all devices)
  const handleLogin = () => {
    const password = passwordInput.value.trim();
    if (password === correctPassword) {
      $(loginPage).fadeOut(400, function() {
        $(listPage).fadeIn(400, function() {
          loadDiaries(); // Load diaries after fade-in; audio plays inside if successful
        });
      });

      // Display current date with day of the week (shows immediately after fade-in starts)
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options); // e.g., "Sunday, 19 Oct 2025"
      document.getElementById("currentDate").textContent = formattedDate;
    } else {
      loginError.textContent = "Password Salah. Masukkan Tarikh Birthday.";
    }
  };

  loginBtn.addEventListener("click", handleLogin);
  loginBtn.addEventListener("touchstart", handleLogin); // mobile tap fix

  async function logVisit(note) {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbzwXECGGfU05ATMG866E0rJuUL3wZH5WcFGIuGiiJB5NR-yRxgtpc5AqdTS-nRmVuyJ/exec", {
      method: "POST",
      body: JSON.stringify({ message: note }),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors" // untuk elak CORS error
    });
  } catch (err) {
    console.error("Log failed:", err);
  }
}

  // ✅ Load diary list from JSON
  function loadDiaries() {
    fetch("letter for tina.json")
      .then((res) => {
        console.log('Fetch status:', res.status);  // Logs 200, 404, etc.
        console.log('Fetch URL:', res.url);  // Shows the full path it's trying
        if (!res.ok) throw new Error("Failed to load diary.json - Status: " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Loaded data:', data);  // Logs the JSON if successful
        diaries = data.diaries;
        diaryList.innerHTML = "";
        diaries.forEach((entry, index) => {
          const li = document.createElement("li");
          li.textContent = entry.title;
          li.addEventListener("click", () => openDiary(index));
          diaryList.appendChild(li);
        });
        audio.play(); // Play audio here, after list appears (fetch succeeds and list is populated)
      })
      .catch((err) => {
        diaryList.innerHTML = '<li style="color:black;">Sorry.. Tak Dapat Nak Access</li>';
        console.error('Fetch error:', err.message);  // Logs the real error
      });
  }

// ✅ View diary details
function openDiary(index) {
  const entry = diaries[index];
  if (!entry) return;
  $(listPage).fadeOut(400, function() {
    $(viewPage).fadeIn(400);
  });
  diaryTitle.textContent = entry.title;
  diaryContent.textContent = entry.content;
  document.getElementById("diaryDate").textContent = entry.date ? entry.date : '';

  // Clear any existing Polaroid
  const existingPolaroid = document.querySelector('.polaroid');
  if (existingPolaroid) {
    existingPolaroid.remove();
  }

  // Add Polaroid if image exists
  if (entry.image) {
    const polaroid = document.createElement('div');
    polaroid.classList.add('polaroid');
    const img = document.createElement('img');
    img.src = entry.image;
    img.alt = 'Polaroid image for diary entry';
    polaroid.appendChild(img);
    viewPage.appendChild(polaroid);  // Append to #viewPage

    // Click to show popup modal
    polaroid.addEventListener('click', () => {
      document.getElementById('modalImage').src = entry.image;
      document.getElementById('polaroidModal').style.display = 'flex';
    });
  }
}

// Add modal close logic (outside openDiary, in DOMContentLoaded)
const modal = document.getElementById('polaroidModal');
modal.addEventListener('click', () => {
  modal.style.display = 'none';  // Close on click anywhere
});
   
  // ✅ Back to list
  backBtn.addEventListener("click", () => {
    $(viewPage).fadeOut(400, function() {
      $(listPage).fadeIn(400);
    });
  });

 // jika di bukak google sheet detect 
    logVisit("Opened");
  
  // ✅ Logout
  logoutBtn.addEventListener("click", () => {
    $(listPage).fadeOut(400, function() {
      $(viewPage).fadeOut(400, function() {
        $(loginPage).fadeIn(400);
      });
    });
    passwordInput.value = "";
    loginError.textContent = "";
    audio.pause(); // Pause audio on logout
    audio.currentTime = 0; // Reset audio
  });
});
