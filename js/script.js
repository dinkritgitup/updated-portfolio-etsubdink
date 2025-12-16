// Three.js Scene Setup
let scene, camera, renderer, cube;

function initThreeJS() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  document.getElementById("threejs-container").appendChild(renderer.domElement);

  // Torus Geometry for a different 3D effect
  const geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
  const material = new THREE.MeshPhongMaterial({
    color: 0x3498db,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
    wireframe: false,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add some floating cubes around the torus
  const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xe74c3c,
    transparent: true,
    opacity: 0.7,
  });

  for (let i = 0; i < 20; i++) {
    const smallCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    smallCube.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    );
    scene.add(smallCube);
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Animation Loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Smooth scrolling for navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: targetSection,
          ease: "power2.inOut",
        });
      }
    });
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initThreeJS();
  initSkills3D();
  initSmoothScroll();
  initNavbarScroll();

  // Add GSAP animations for sections
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Animate graphics and video items
  gsap.utils.toArray(".graphic-item, .video-item").forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const submitBtn = contactForm.querySelector(".submit-btn");
      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Simulate submission (replace with actual backend call)
      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }, 1000);
    });
  }

  // Initialize skill bars
  initSkillBars();
});

// Skills 3D Scene Setup
let skillsScene, skillsCamera, skillsRenderer, skillsGroup;

function initSkills3D() {
  // Scene
  skillsScene = new THREE.Scene();

  // Camera
  skillsCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  skillsCamera.position.z = 5;

  // Renderer
  skillsRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  skillsRenderer.setSize(800, 400);
  skillsRenderer.setClearColor(0x000000, 0);
  document
    .getElementById("skills-3d-container")
    .appendChild(skillsRenderer.domElement);

  // Group for skills
  skillsGroup = new THREE.Group();
  skillsScene.add(skillsGroup);

  // Skills list
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Three.js",
    "GSAP",
  ];

  // Create 3D text for each skill
  skills.forEach((skill, index) => {
    const loader = new THREE.FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const geometry = new THREE.TextGeometry(skill, {
          font: font,
          size: 0.3,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 5,
        });
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(index / skills.length, 0.7, 0.5),
          shininess: 100,
        });
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.set(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        );
        skillsGroup.add(textMesh);
      }
    );
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  skillsScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  skillsScene.add(directionalLight);

  // Animation Loop
  animateSkills();
}

function animateSkills() {
  requestAnimationFrame(animateSkills);

  // Rotate the group
  skillsGroup.rotation.y += 0.005;

  skillsRenderer.render(skillsScene, skillsCamera);
}

// Handle window resize for skills
function onSkillsResize() {
  const container = document.getElementById("skills-3d-container");
  if (container && skillsCamera && skillsRenderer) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    skillsCamera.aspect = width / height;
    skillsCamera.updateProjectionMatrix();
    skillsRenderer.setSize(width, height);
  }
}

// Handle window resize
window.addEventListener("resize", onWindowResize);
window.addEventListener("resize", onSkillsResize);

// Skill bar animation on scroll
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  // Define gradients for each skill
  const gradients = [
    "linear-gradient(180deg, #ff6b6b, #ff4500)", // HTML - Red to Orange
    "linear-gradient(180deg, #4ecdc4, #44a08d)", // CSS - Teal
    "linear-gradient(180deg, #ffd93d, #ffb347)", // JavaScript - Yellow to Orange
    "linear-gradient(180deg, #61dafb, #21a3c4)", // React - Blue
    "linear-gradient(180deg, #68c947, #4a9b3a)", // Node.js - Green
    "linear-gradient(180deg, #3776ab, #2c5aa0)", // Python - Blue
    "linear-gradient(180deg, #049ef4, #0277bd)", // Three.js - Blue
    "linear-gradient(180deg, #0ac775, #089c6b)", // GSAP - Green
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const index = Array.from(skillBars).indexOf(bar);
          setTimeout(() => {
            const height = bar.getAttribute("data-width");
            bar.style.height = height + "%";
            bar.style.background = gradients[index % gradients.length];

            // Animate the percentage text on the bar
            const percentageSpan = bar.querySelector(".animated-percentage");
            animatePercentage(percentageSpan, parseInt(height));
          }, index * 200); // Stagger animation with 200ms delay
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Function to animate percentage text
function animatePercentage(element, target) {
  let current = 0;
  const increment = target / 100; // Adjust speed here
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "%";
  }, 20); // Adjust interval for speed
}
