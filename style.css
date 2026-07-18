@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Georgia", serif;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #ff6b6b, #fddb92, #4facfe, #43e97b);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  color: white;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.page {
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  width: 90%;
  max-width: 400px;
  position: relative; /* For pseudo-elements if needed */
}

.hidden {
  display: none;
}

input {
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.6);
  color: #000;
}



ul {
  list-style: none;
  padding: 0;
  max-height: 300px; /* Scrollable if many entries */
  overflow-y: auto;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.1); /* Subtle notebook background */
  border-radius: 10px;
  padding: 10px;
  background: transparent; /* Lined paper effect */
  background-size: 100% 1.6em;
}

li {
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 5px 20px 20px 5px; /* Torn page shape */
  cursor: pointer;
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

li:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px) rotate(2deg); /* Lift and tilt like flipping */
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
}

li::before {
  content: '📖'; /* Diary icon */
  margin-right: 10px;
  font-size: 1.2em;
}

#diaryTitle {
  font-family: 'Dancing Script', cursive;
  font-size: 2em;
  margin-bottom: 20px;
  color: #fa93c7; /* Pink for romance */
}

#diaryContent {
  background: rgba(255, 255, 255, 0.1); /* Parchment-like */
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  line-height: 1.6;
  white-space: pre-wrap; /* Preserve line breaks from JSON */
  animation: reveal 1s ease-out; /* Animation on open */
  max-height: 300px; /* Adjust this value based on your design; e.g., 300px or 50vh */
  overflow-y: auto; /* Enables vertical scrolling if content exceeds max-height */
  position: relative; /* Allows absolute positioning for Polaroid */
}

.polaroid {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px; /* Small size */
  height: auto;
  border: 8px solid #fff; /* Polaroid frame */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  transform: rotate(15deg); /* Tilted for letter-like feel */
  cursor: pointer;
  transition: width 0.3s ease, transform 0.3s ease;
  z-index: 10;
}

.polaroid.enlarged {
  width: 300px; /* Larger size */
  transform: rotate(0deg); /* Straighten when enlarged */
  bottom: 20px;
  right: 20px;
}

.polaroid img {
  width: 100%;
  height: auto;
  display: block;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Envelope shape for view page */
#viewPage::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid rgba(0, 0, 0, 0.3); /* Flap like an envelope */
  z-index: -1;
}

#viewPage::after {
  content: '❤'; /* Heart seal */
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5em;
}

#loginError {
  color: #ff8080;
  margin-top: 10px;
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#diaryDate {
  font-size: 1em;
  font-style: italic;
  color: #ffd700; /* Gold for a romantic touch; adjust as needed */
  white-space: nowrap; /* Prevent wrapping */
}

#currentDate {
  font-size: 1em;
  font-style: italic;
  color: #ffd700; /* Gold for elegance */
  margin-bottom: 15px;
  text-align: center;
}

#passwordInput {
  font-family: "Courier New", monospace; /* Example: Monospace font for a 'code-like' look; change to your preferred font */
}

#viewPage {
  position: relative; /* Positioning context */
}

/* Small Polaroid (outside corner) */
.polaroid {
  position: absolute;
  bottom: -20px; /* Slightly outside bottom */
  right: -20px; /* Slightly outside right */
  width: 100px;
  height: auto;
  border: 8px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: rotate(15deg);
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 20;
}

.polaroid img {
  width: 100%;
  height: auto;
  display: block;
}

/* Modal Popup */
.modal {
  display: none; /* Hidden by default */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Dark overlay */
  z-index: 100; /* On top of everything */
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

#modalImage {
  width: auto;
  max-width: 100%;
  max-height: 80vh;
  border: 8px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: rotate(0deg); /* Straight in popup */
}
