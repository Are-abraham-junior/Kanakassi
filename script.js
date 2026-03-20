// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// ============================================
// SMOOTH NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe team and project cards
document.querySelectorAll(".team-card, .project-card").forEach((card) => {
  observer.observe(card);
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const nom = this.querySelector('input[placeholder="Votre nom"]').value;
    const prenom = this.querySelector(
      'input[placeholder="Votre prénom"]',
    ).value;
    const email = this.querySelector('input[placeholder="Votre email"]').value;
    const message = this.querySelector("textarea").value;

    // Basic validation
    if (!nom || !prenom || !email || !message) {
      showNotification("Veuillez remplir tous les champs", "error");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      showNotification("Veuillez entrer une adresse email valide", "error");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Success response
      showNotification(
        "Message envoyé avec succès! Nous vous contacterons bientôt.",
        "success",
      );
      contactForm.reset();

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles dynamically
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "rgba(0, 255, 204, 0.2)" : "rgba(255, 100, 100, 0.2)"};
        border: 2px solid ${type === "success" ? "#00ffcc" : "#ff6464"};
        color: ${type === "success" ? "#00ffcc" : "#ff6464"};
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        backdrop-filter: blur(10px);
    `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease-out";
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ============================================
// ACTIVE NAV LINK
// ============================================
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === currentSection) {
      link.style.color = "#00ffcc";
    } else {
      link.style.color = "";
    }
  });
});

// ============================================
// PARALLAX EFFECT (Subtle)
// ============================================
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// ============================================
// ADD ANIMATIONS TO KEYFRAMES
// ============================================
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ENHANCED HEADER EFFECTS
// ============================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.style.boxShadow = "0 0 30px rgba(0, 255, 204, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "1";
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease-in";
    imageObserver.observe(img);
  });
}

// ============================================
// DYNAMIC GLOW EFFECT ON MOUSE MOVE
// ============================================
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".team-card, .project-card");

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const distX = e.clientX - cardCenterX;
    const distY = e.clientY - cardCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Apply glow effect if mouse is close to card
    if (distance < 300) {
      const intensity = (1 - distance / 300) * 0.3;
      card.style.boxShadow = `0 0 ${20 + intensity * 20}px rgba(0, 255, 204, ${0.2 + intensity})`;
    }
  });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener("load", () => {
  document.body.style.animation = "fadeInUp 0.8s ease-out";
});

console.log("✨ KANAKASSI Portfolio SPA Loaded Successfully");
