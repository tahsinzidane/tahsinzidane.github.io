console.log("hello world");

// Buttons
let homeBtn = document.getElementById("homeBtn");
let aboutBtn = document.getElementById("aboutBtn");

// Divs
let about = document.getElementsByClassName("about")[0];
let portfolio = document.getElementsByClassName("portfolio")[0];

function showAboutMe() {
  about.style.display = "block";
  portfolio.style.display = "none";
}

function showPortfolio() {
  portfolio.style.display = "block";
  about.style.display = "none";
}

aboutBtn.addEventListener('click', function () {
  // console.log("About Clicked");
  showAboutMe();
});

homeBtn.addEventListener('click', function () {
  // console.log("Portfolio Clicked");
  showPortfolio();
});



/*
=============================
dark mode light mode toggle
=============================
*/

const body = document.body;
const sunIcon = document.querySelector(".ri-sun-line");
const moonIcon = document.querySelector(".ri-moon-line");

// initial state check (localStorage)
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  sunIcon.style.display = "inline-block";
  moonIcon.style.display = "none";
} else {
  body.classList.add("light");
  sunIcon.style.display = "none";
  moonIcon.style.display = "inline-block";
}

// toggle function
function toggleTheme() {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
    localStorage.setItem("theme", "light");
  }
}

// event listener
sunIcon.addEventListener("click", toggleTheme);
moonIcon.addEventListener("click", toggleTheme);





/*
=================================================
projects
=================================================
*/

const projectsJSON = [
  {
    name: "woeFetch",
    url: "https://github.com/tahsinzidane/weofetch",
    about: "WeoFetch is a lightweight terminal tool that shows your system info in style, with random ASCII art messages on top. It’s like Neofetch, but with a bit of flair and randomness to make your terminal less boring. Perfect for quick system snapshots and showing off your setup."
  },
  {
    name: "memory card game",
    url: "https://github.com/tahsinzidane/MemoryCardGame",
    about: "MemoryCardGame is a simple but fun browser game where you flip cards to find matching pairs. It’s a classic memory challenge with clean visuals and smooth interactions, perfect for short play sessions or testing your recall skills. Easy to pick up, hard to forget… unless you get too many mismatches"

  },
  {
    name: "show-file-tree",
    url: "https://github.com/tahsinzidane/show-file-tree",
    about: `is a simple CLI tool to display directory structures in a clean tree format. It helps developers quickly visualize nested files and folders. <a href="https://www.npmjs.com/package/@tahsinzidane/sft">Install  it </a> globally via npm for instant use`
  },
  {
    name: "emoji selector ",
    url: "https://github.com/tahsinzidane/emoji-verse?tab=readme-ov-file#emoji-verse",
    about: "A simple emoji selector app built for Linux distributions. \nCrafted with Electron, it offers an easy way to search and copy emojis right from your desktop."
  },

];

const projectsContainer = document.getElementById("projects");

projectsJSON.forEach(project => {
  const projectHolder = document.createElement("p");
  projectHolder.innerHTML = `<a href="${project.url}" target="_blank">${project.name}</a> : ${project.about}`;
  projectsContainer.appendChild(projectHolder);
});


// ======== Falling Stars Setup ========
const canvas = document.getElementById("starfall");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 1 + 0.1,
      size: Math.random() * 1.5,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    star.x += Math.random() * 1 - 0.5;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}

let animationRunning = false;
function startStarfall() {
  if (!animationRunning) {
    animationRunning = true;
    canvas.style.display = "block";
    initStars();
    drawStars();
  }
}

function stopStarfall() {
  animationRunning = false;
  canvas.style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ======== Modify toggleTheme() ========
function toggleTheme() {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
    localStorage.setItem("theme", "dark");
    startStarfall();
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
    localStorage.setItem("theme", "light");
    stopStarfall();
  }
}

// ======== On Load ========
if (localStorage.getItem("theme") === "dark") {
  startStarfall();
}


// ======= click to open lightbox =======
const meIcon = document.getElementById("meIcon");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

meIcon.addEventListener("click", () => {
  lightbox.style.display = "flex";
  lightboxImg.src = meIcon.src;
  // Force reflow
  lightbox.offsetWidth;
  lightbox.classList.add("show");
});

const hideLightbox = () => {
  lightbox.classList.remove("show");
  setTimeout(() => {
    if (!lightbox.classList.contains("show")) {
      lightbox.style.display = "none";
    }
  }, 300); // Wait for transition
};

closeLightbox.addEventListener("click", hideLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    hideLightbox();
  }
});

