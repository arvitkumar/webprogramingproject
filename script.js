// ------------------- CUSTOM CURSOR (only desktop) -------------------
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

function isMobile() {
  return window.innerWidth <= 860;
}

if (!isMobile()) {
  document.addEventListener("mousemove", (e) => {
    if (cursorDot)
      cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    if (cursorOutline)
      cursorOutline.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
  });
  document.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.style.opacity = "0";
    if (cursorOutline) cursorOutline.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    if (cursorDot) cursorDot.style.opacity = "1";
    if (cursorOutline) cursorOutline.style.opacity = "1";
  });
} else {
  if (cursorDot) cursorDot.style.display = "none";
  if (cursorOutline) cursorOutline.style.display = "none";
}

// ------------------- SCROLL REVEAL -------------------
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 120;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ------------------- MOBILE HAMBURGER MENU -------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
  // Close menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ------------------- STATS COUNTER (home page) -------------------
const statNumbers = document.querySelectorAll(".stat-number");
let counted = false;
function startCounters() {
  if (counted) return;
  statNumbers.forEach((el) => {
    const target = parseInt(el.getAttribute("data-target"));
    if (isNaN(target)) return;
    let current = 0;
    const increment = target / 60;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target;
      }
    };
    updateCounter();
  });
  counted = true;
}
const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(statsSection);
}

// ------------------- NEWSLETTER DEMO (home page) -------------------
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(`Thanks ${email}! We'll share web wisdom soon.`);
    newsletterForm.reset();
  });
}

// ------------------- EMAILJS CONTACT FORM -------------------
const YOUR_PUBLIC_KEY = "DERMLfwCwDL6Frbsi";
const service_55yh58r = "service_55yh58r";
const template_d35vr7p = "template_d35vr7p";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  emailjs.init("DERMLfwCwDL6Frbsi");// Fixed: YOUR not YoUR

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const sendBtn = document.getElementById("sendBtn");
    const statusDiv = document.getElementById("formStatus");

    if (sendBtn) sendBtn.disabled = true;
    if (sendBtn)
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';

    const params = {
      // Fixed: added {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      project_type:
        document.getElementById("userProject")?.value || "Not specified",
      message: document.getElementById("userMessage").value,
      time: new Date().toLocaleString(),
    }; // Fixed: added } and ;

    emailjs
      .send("service_55yh58r", "template_d35vr7p", params)
      .then(() => {
        if (statusDiv)
          statusDiv.innerHTML =
            '<span style="color:#C084FC;">✓ Message sent! We\'ll reach out shortly.</span>';
        contactForm.reset();
      })
      .catch((error) => {
        console.error(error);
        if (statusDiv)
          statusDiv.innerHTML =
            '<span style="color:#ff8888;">❌ Failed to send. Please try again.</span>';
      })
      .finally(() => {
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = '<i class="fas fa-send"></i> Send message';
        }
        setTimeout(() => {
          if (statusDiv) statusDiv.innerHTML = "";
        }, 5000);
      });
  });
}