import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const skills = [
  { title: "Machine Learning & Deep Learning", detail: "PyTorch, scikit-learn, Transformers, and model training pipelines." },
  { title: "LLMs & RAG", detail: "LangChain and LangGraph pipelines with embeddings and vector databases." },
  { title: "Generative AI & Agents", detail: "AI agents, prompt engineering, Ollama, and the OpenAI API." },
  { title: "Computer Vision", detail: "Image understanding, detection, and visual automation with deep learning." },
  { title: "MLOps & Deployment", detail: "Docker, Kubernetes, Argo CD, CI/CD, and model monitoring." },
  { title: "Data Engineering & Pipelines", detail: "Data preprocessing, feature orchestration, and scalable pipelines." },
  { title: "Backend & Databases", detail: "Python, Java, Spring Boot, Node.js, REST APIs, SQL & NoSQL." },
  { title: "Frontend & Mobile", detail: "Angular, Symfony, Flutter, JavaFX, and modern JavaScript." },
];

const projects = [
  {
    title: "WeProvide — Service Booking Platform",
    detail: "A service marketplace connecting providers with clients who can browse and book services.",
    github: "https://github.com/",
    imageLabel: "Service Marketplace",
    galleryTags: ["Provider Listings", "Booking Flow", "Client Portal", "Desktop App", "Service Catalog"],
    extended:
      "Developed a service marketplace connecting providers (e.g., electricians and plumbers) with clients who can browse and book services. Delivered as both web and desktop applications. Tech: Symfony, Twig, HTML, CSS, Java, JavaFX, MySQL.",
  },
  {
    title: "ChatDB — AI-Powered Database Assistant",
    detail: "An AI application to upload and manage SQL, CSV, and database files through a conversational interface.",
    github: "https://github.com/",
    imageLabel: "AI + Data",
    galleryTags: ["Chat Interface", "File Upload", "SQL Querying", "CSV Manager", "LLM Response"],
    extended:
      "Created an AI application that lets users upload and manage SQL, CSV, and database files through a conversational interface, using an LLM for natural-language data interaction. Tech: Flutter, Node.js, Python, OpenAI API, SQL, CSV.",
  },
  {
    title: "Retail Shop RAG Assistant",
    detail: "A retrieval-augmented generation assistant grounded in shop-related information using a local LLM.",
    github: "https://github.com/zieed/SHOP-RAG.git",
    imageLabel: "RAG Assistant",
    galleryTags: ["Knowledge Base", "Local LLM", "Retrieval Flow", "Grounded Answers", "Ollama Runtime"],
    extended:
      "Built a retrieval-augmented generation (RAG) assistant for a shop, using a locally running LLM to answer questions grounded in shop-related information. Tech: Python, RAG, Ollama, LLMs.",
  },
  {
    title: "Zeta — 30M-Parameter Nano Language Model",
    detail: "A compact 30-million-parameter language model trained on a Hugging Face dataset with PyTorch and CUDA.",
    github: "https://github.com/",
    imageLabel: "Nano LLM",
    galleryTags: ["Tokenizer", "Training Run", "CUDA Accel", "Loss Curves", "Inference"],
    extended:
      "Experimented with training a compact 30-million-parameter language model on a dataset sourced from Hugging Face, using PyTorch and NVIDIA CUDA, with a tokenizer-based text preprocessing pipeline. Tech: Python, PyTorch, CUDA, Hugging Face, tokenization.",
  },
  {
    title: "ScreenCraft — Visual UI Builder",
    detail: "A web-based visual UI builder for designing interfaces through drag-and-drop interactions.",
    github: "https://github.com/zieed/ScreenCraft.git",
    imageLabel: "UI Builder",
    galleryTags: ["Drag & Drop", "Live Canvas", "Real-time Sync", "Component Grid", "Export UI"],
    extended:
      "Final-year (PFE) internship project at ADDINN: a web-based visual UI builder for designing interfaces through drag-and-drop interactions. Built with a Node.js backend and real-time UI updates. Tech: Angular, GridStack, Node.js, Express.js, MongoDB, REST API, Socket.IO.",
  },
  {
    title: "Internship Service Manager",
    detail: "A web application to manage internship services, from applications to supervisor tracking.",
    github: "https://github.com/zieed/PFE.git",
    imageLabel: "Service Manager",
    galleryTags: ["Application Form", "Intern Dashboard", "Supervisor View", "Status Tracking", "Admin Panel"],
    extended:
      "Higher Technician internship project at ISET Sidi Bouzid: an internship-service management web application covering candidate applications, supervisor assignments, and status tracking. Tech: HTML, CSS, JavaScript, Thymeleaf, Spring Boot.",
  },
];

function createProjectImageDataUrl(projectTitle, tag, hue) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 78%, 24%)" />
        <stop offset="60%" stop-color="hsl(${(hue + 28) % 360}, 72%, 16%)" />
        <stop offset="100%" stop-color="#040914" />
      </linearGradient>
    </defs>
    <rect width="1280" height="800" fill="url(#bg)" />
    <circle cx="980" cy="140" r="220" fill="rgba(46,230,255,0.18)" />
    <rect x="70" y="90" width="1140" height="620" rx="34" fill="rgba(7,15,34,0.45)" stroke="rgba(92,220,255,0.45)" stroke-width="4"/>
    <text x="120" y="210" fill="#d9fbff" font-size="64" font-family="Inter, Arial, sans-serif" font-weight="700">${projectTitle}</text>
    <text x="120" y="305" fill="#9dd6ff" font-size="46" font-family="Inter, Arial, sans-serif">${tag}</text>
    <text x="120" y="390" fill="#7ea6d4" font-size="30" font-family="Inter, Arial, sans-serif">Interactive AI Project Showcase</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getProjectGalleryImages(project, projectIndex) {
  const tags = project.galleryTags || ["Overview", "Architecture", "Dashboard"];
  const baseHue = 185 + projectIndex * 22;
  return tags.map((tag, index) => createProjectImageDataUrl(project.title, tag, (baseHue + index * 8) % 360));
}

function populateGrid(targetId, data) {
  const grid = document.getElementById(targetId);
  if (!grid) return;

  data.forEach((item, index) => {
    const article = document.createElement("article");
    if (targetId === "projects-grid") {
      const side = index % 2 === 0 ? "left" : "right";
      article.className = `tile project-card side-${side}`;
      article.dataset.side = side;
      article.innerHTML = `<div class="project-image-box"><span class="project-image-label">${item.imageLabel || "AI Project"}</span></div>
      <div class="project-copy">
      <h3>${item.title}</h3><p>${item.detail}</p>
      <div class="tile-actions"><button class="project-btn" type="button" data-project-index="${index}">View details</button></div>
      </div>`;
    } else {
      article.className = "tile";
      article.innerHTML = `<h3>${item.title}</h3><p>${item.detail}</p>`;
    }
    grid.appendChild(article);
  });
}

function setupProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const modalTitle = document.getElementById("project-modal-title");
  const modalText = document.getElementById("project-modal-text");
  const carouselTrack = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const robotCanvas = document.getElementById("modal-robot-canvas");
  const githubLink = document.getElementById("project-github");

  if (!modal || !closeBtn || !modalTitle || !modalText || !carouselTrack || !prevBtn || !nextBtn || !robotCanvas || !githubLink) return;

  let activeIndex = 0;
  let activeSlides = [];
  let carouselDrift = 0;
  let isOpen = false;

  let modalRobot = null;
  let modalRobotMixer = null;
  const modalRobotRig = new THREE.Group();
  let modalRobotSceneReady = false;

  const modalRobotScene = new THREE.Scene();
  const modalRobotCamera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
  modalRobotCamera.position.set(0, 0.4, 2.72);
  modalRobotCamera.lookAt(0, 0.15, 0);
  const modalRobotRenderer = createRenderer(robotCanvas, true);
  modalRobotRenderer.outputColorSpace = THREE.SRGBColorSpace;
  modalRobotScene.add(modalRobotRig);
  addLights(modalRobotScene);

  const accent = new THREE.PointLight(0x2ee6ff, 1.1, 10);
  accent.position.set(-1.4, 1.9, 1.4);
  modalRobotScene.add(accent);

  async function ensureModalRobotScene() {
    if (modalRobotSceneReady) return;
    modalRobotSceneReady = true;

    try {
      const loader = new GLTFLoader();
      const loaded = await loadRobot("./Resources/smiling_robot_waving.glb", loader);
      modalRobot = loaded.robot;
      modalRobotMixer = loaded.mixer;
      autoFrameRobot(modalRobot, 3);
      modalRobot.position.set(0, 0.22, 0.12);
      modalRobotRig.add(modalRobot);
    } catch (error) {
      console.error("Modal robot failed to load:", error);
    }
  }

  function resizeModalRobot() {
    const width = robotCanvas.clientWidth;
    const height = robotCanvas.clientHeight;
    modalRobotCamera.aspect = Math.max(width / Math.max(height, 1), 0.2);
    modalRobotCamera.updateProjectionMatrix();
    modalRobotRenderer.setSize(width, height, false);
  }

  resizeModalRobot();
  window.addEventListener("resize", resizeModalRobot);

  const modalRobotClock = new THREE.Clock();
  function animateModalRobot() {
    const delta = Math.min(modalRobotClock.getDelta(), 0.05);
    const t = modalRobotClock.getElapsedTime();

    if (modalRobot) {
      modalRobotRig.position.y = Math.sin(t * 1.7) * 0.04;
      modalRobotRig.rotation.y = Math.sin(t * 0.9) * 0.07;
      modalRobot.scale.setScalar(1 + Math.sin(t * 1.15) * 0.015);
      if (modalRobotMixer) {
        modalRobotMixer.update(delta);
      }
    }

    if (isOpen) {
      carouselDrift += delta * 10;
      updateCarousel();
    }

    modalRobotRenderer.render(modalRobotScene, modalRobotCamera);
    requestAnimationFrame(animateModalRobot);
  }
  animateModalRobot();

  function buildCarousel(images) {
    carouselTrack.innerHTML = "";
    activeSlides = images.map((src, index) => {
      const slide = document.createElement("article");
      slide.className = "carousel-slide";
      slide.innerHTML = `<img src="${src}" alt="Project image ${index + 1}" />`;
      carouselTrack.appendChild(slide);
      return slide;
    });
    activeIndex = 0;
    carouselDrift = 0;
    updateCarousel();
  }

  function shortestOffset(index, center, total) {
    let delta = index - center;
    if (delta > total / 2) delta -= total;
    if (delta < -total / 2) delta += total;
    return delta;
  }

  function updateCarousel() {
    if (!activeSlides.length) return;
    const total = activeSlides.length;
    const radius = 230;

    activeSlides.forEach((slide, index) => {
      const offset = shortestOffset(index, activeIndex, total);
      const angle = offset * 50 + Math.sin(carouselDrift * 0.6) * 6;
      const depthScale = Math.max(0.66, 1 - Math.abs(offset) * 0.13);
      const opacity = Math.abs(offset) > 2 ? 0.12 : 1;
      slide.style.opacity = `${opacity}`;
      slide.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px) scale(${depthScale})`;
      slide.classList.toggle("active", offset === 0);
    });
  }

  function rotateCarousel(step) {
    if (!activeSlides.length) return;
    const total = activeSlides.length;
    activeIndex = (activeIndex + step + total) % total;
    updateCarousel();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    isOpen = false;
  }

  document.querySelectorAll(".project-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.projectIndex);
      const project = projects[index];
      if (!project) return;

      modalTitle.textContent = project.title;
      modalText.textContent = project.extended || project.detail;
      githubLink.href = project.github || "https://github.com/";
      buildCarousel(getProjectGalleryImages(project, index));
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      isOpen = true;
      ensureModalRobotScene();
      resizeModalRobot();
    });
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => rotateCarousel(-1));
  nextBtn.addEventListener("click", () => rotateCarousel(1));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    } else if (isOpen && event.key === "ArrowLeft") {
      rotateCarousel(-1);
    } else if (isOpen && event.key === "ArrowRight") {
      rotateCarousel(1);
    }
  });
}

function setupSkillsScrollAnimation() {
  const skillsTiles = Array.from(document.querySelectorAll("#skills-grid .tile"));
  if (!skillsTiles.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        skillsTiles.forEach((tile, index) => {
          setTimeout(() => {
            tile.classList.add("skills-in");
          }, index * 90);
        });
        observer.disconnect();
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(skillsTiles[0]);
}

function setupRevealAnimations() {
  const revealTargets = document.querySelectorAll(".card-3d, .tile");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

let scrollProgress = 0;
let projectFocusIndex = -1;

function setupScrollState() {
  const pill = document.querySelector(".top-page-title");

  function update() {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    scrollProgress = Math.min(window.scrollY / maxScroll, 1);
    // Fade the sticky title pill once the visitor scrolls into the content so it
    // never overlaps section headings or project cards.
    if (pill) {
      pill.classList.toggle("is-faded", window.scrollY > window.innerHeight * 0.7);
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function createRenderer(canvas, alpha = true) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

function addLights(scene) {
  const ambient = new THREE.AmbientLight(0x6cbfff, 0.65);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0x7ce6ff, 1.35);
  key.position.set(4, 8, 6);
  scene.add(key);

  const rim = new THREE.PointLight(0x1e96ff, 1.15, 20);
  rim.position.set(-5, 2, -3);
  scene.add(rim);
}

function createResumeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 620;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#070d1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(46,230,255,0.45)";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.fillStyle = "#ddf9ff";
  ctx.font = "bold 58px Inter";
  ctx.fillText("AI & ML Engineer Resume", 72, 110);

  ctx.fillStyle = "#8ec7ff";
  ctx.font = "36px Inter";
  ctx.fillText("Zied Horbit", 72, 170);

  ctx.font = "30px Inter";
  const lines = [
    "- Computer Science Engineer (ESPRIT).",
    "- Builds LLM, RAG, and computer vision systems.",
    "- Production MLOps with Docker and Kubernetes.",
    "- Web, mobile, and data-driven AI applications.",
  ];

  lines.forEach((line, i) => {
    ctx.fillText(line, 72, 265 + i * 72);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createPhotoFrame() {
  const group = new THREE.Group();

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.65, 3.35, 0.18),
    new THREE.MeshStandardMaterial({
      color: 0x0d1b3e,
      metalness: 0.72,
      roughness: 0.25,
      emissive: 0x123d79,
      emissiveIntensity: 0.45,
    })
  );

  const photoTexture = new THREE.TextureLoader().load("./Resources/Zied%20Horbit.PNG");
  photoTexture.colorSpace = THREE.SRGBColorSpace;

  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(2.32, 3.02),
    new THREE.MeshBasicMaterial({ map: photoTexture })
  );
  photo.position.z = 0.101;

  const neonEdge = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.03, 16, 140),
    new THREE.MeshBasicMaterial({ color: 0x2ee6ff })
  );
  neonEdge.rotation.x = Math.PI / 2;
  neonEdge.position.z = 0.18;
  neonEdge.scale.set(1, 1.1, 1);

  group.add(frame, photo, neonEdge);
  group.position.set(-2.2, 0.25, 0);

  return group;
}

async function loadRobot(path, loader) {
  const gltf = await loader.loadAsync(path);
  const robot = gltf.scene;
  robot.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  let mixer = null;
  if (Array.isArray(gltf.animations) && gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(robot);
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  return { robot, mixer };
}

function autoFrameRobot(robot, targetHeight = 2.15) {
  const box = new THREE.Box3().setFromObject(robot);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const currentHeight = Math.max(size.y, 0.001);
  const factor = targetHeight / currentHeight;

  robot.scale.multiplyScalar(factor);
  robot.position.sub(center.multiplyScalar(factor));
}

function getOppositeRobotTargetFromProjects() {
  const cards = Array.from(document.querySelectorAll("#projects-grid .project-card"));
  const section = document.getElementById("projects-section");
  const floatingLayer = document.querySelector(".projects-robot-floating");
  const floatingWidth = floatingLayer ? floatingLayer.clientWidth : Math.min(window.innerWidth * 0.68, 560);
  const floatingHeight = floatingLayer ? floatingLayer.clientHeight : 430;
  const layerTopPx = floatingLayer ? parseFloat(getComputedStyle(floatingLayer).top) || window.innerHeight * 0.09 : window.innerHeight * 0.09;
  const viewportCenterX = window.innerWidth * 0.5;
  const baseLayerCenterY = layerTopPx + floatingHeight * 0.56;
  const cardTargetY = window.innerHeight * 0.5;

  if (!section) {
    return {
      x: 0,
      yaw: 0.15,
      pitch: 0,
      roll: 0,
      influence: 0,
      scale: 0.98,
      jump: 0.2,
      layerX: 0,
      layerY: 0,
      zoom: 0.2,
    };
  }

  const sectionRect = section.getBoundingClientRect();
  const sectionStart = window.innerHeight * 0.82;
  const sectionEnd = -sectionRect.height * 0.55;
  const sectionProgress = THREE.MathUtils.clamp((sectionStart - sectionRect.top) / (sectionStart - sectionEnd), 0, 1);

  if (!cards.length) {
    return {
      x: 0,
      yaw: 0.15,
      pitch: 0,
      roll: 0,
      influence: 0,
      scale: 0.98,
      jump: 0.2 * (1 - sectionProgress),
      layerX: 0,
      layerY: 0,
      zoom: sectionProgress * 0.3,
    };
  }

  const firstRect = cards[0].getBoundingClientRect();
  const introZone = window.innerHeight * 0.57;
  if (firstRect.top > introZone) {
    return {
      // Intro pose: under title before card presentation starts.
      x: 0,
      yaw: 0.12,
      pitch: -0.03,
      roll: 0,
      influence: 0.35,
      scale: 0.98,
      jump: 0.2,
      layerX: 0,
      layerY: 0,
      zoom: 0.28,
    };
  }

  // Rest finale: only after the FINAL project card has scrolled up past the
  // presentation area do we let the robot glide to the horizontal + vertical
  // center of the viewport and rest with a calm idle. Triggering on the last
  // card (rather than the rest-zone element) guarantees the robot is first seen
  // cleanly to the LEFT of the last card before it settles into the open space
  // below — completing the sequence. Frame-rate independent damping keeps the
  // whole transition buttery smooth.
  const lastCard = cards[cards.length - 1];
  const lastRect = lastCard.getBoundingClientRect();
  if (lastRect.bottom < window.innerHeight * 0.34) {
    const restT = performance.now() * 0.001;
    const centeredLayerY = window.innerHeight * 0.5 - baseLayerCenterY;
    return {
      x: 0,
      yaw: Math.sin(restT * 0.6) * 0.12,
      pitch: 0,
      roll: Math.sin(restT * 0.45) * 0.03,
      influence: 0.5,
      scale: 0.9,
      jump: 0.16 + Math.sin(restT * 1.1) * 0.03,
      layerX: Math.sin(restT * 0.5) * (floatingWidth * 0.03),
      layerY: centeredLayerY,
      zoom: 0.2,
    };
  }

  const viewportCenterY = cardTargetY;
  const visibleCards = [];

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    visibleCards.push({ card, rect, index });
  });

  if (!visibleCards.length) {
    return {
      x: 0,
      yaw: 0.15,
      pitch: 0,
      roll: 0,
      influence: 0,
      scale: 0.98,
      jump: 0.2 * (1 - sectionProgress),
      layerX: 0,
      layerY: 0,
      zoom: sectionProgress * 0.3,
    };
  }

  let nearestCard = null;
  let nearestRect = null;
  let nearestDistance = Infinity;
  visibleCards.forEach(({ card, rect }) => {
    const cardCenterY = rect.top + rect.height * 0.5;
    const distance = Math.abs(cardCenterY - viewportCenterY);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestCard = card;
      nearestRect = rect;
    }
  });

  const previousFocus = visibleCards.find(({ index }) => index === projectFocusIndex);
  if (previousFocus) {
    const prevCenter = previousFocus.rect.top + previousFocus.rect.height * 0.5;
    const prevDistance = Math.abs(prevCenter - viewportCenterY);
    if (prevDistance <= nearestDistance + 42) {
      nearestCard = previousFocus.card;
      nearestRect = previousFocus.rect;
      nearestDistance = prevDistance;
    }
  }

  if (!nearestCard) {
    return {
      x: 0,
      yaw: 0.15,
      pitch: 0,
      roll: 0,
      influence: 0,
      scale: 0.98,
      jump: 0.2 * (1 - sectionProgress),
      layerX: 0,
      layerY: 0,
      zoom: sectionProgress * 0.3,
    };
  }

  const nearestCardCenterY = nearestRect.top + nearestRect.height * 0.5;
  projectFocusIndex = cards.indexOf(nearestCard);
  const normalizedDistance = Math.min(Math.abs(nearestCardCenterY - viewportCenterY) / (window.innerHeight * 0.5), 1);
  const influence = 1 - normalizedDistance;
  const easedInfluence = THREE.MathUtils.smoothstep(influence, 0, 1);

  const cardGap = 24;
  const targetCenterY = THREE.MathUtils.clamp(
    nearestCardCenterY - nearestRect.height * 0.03,
    window.innerHeight * 0.18,
    window.innerHeight * 0.8
  );
  const layerY = targetCenterY - baseLayerCenterY - 58;
  const minCenterX = floatingWidth * 0.52;
  const maxCenterX = window.innerWidth - floatingWidth * 0.52;

  const cardSide = nearestCard.dataset.side;

  // --- Responsive presentation --------------------------------------------
  // On narrow viewports the project cards become full-width and centered, so a
  // left/right swing would shove the robot off-screen or over the card text.
  // There we keep the robot centered and let it gently float above the active
  // card. On wide viewports we keep the signature side-by-side presentation
  // (robot opposite each card, e.g. to the right of the ScreenCraft card).
  if (window.innerWidth <= 980) {
    const t = performance.now() * 0.001;
    const compactCenterY = THREE.MathUtils.clamp(
      nearestCardCenterY - nearestRect.height * 0.55,
      window.innerHeight * 0.2,
      window.innerHeight * 0.52
    );
    return {
      x: 0,
      yaw: Math.sin(t * 0.9) * 0.2,
      pitch: 0,
      roll: 0,
      influence: easedInfluence,
      scale: THREE.MathUtils.lerp(0.74, 0.58, sectionProgress),
      jump: 0.1 * (1 - sectionProgress),
      layerX: Math.sin(t * 0.7) * (floatingWidth * 0.05),
      layerY: compactCenterY - baseLayerCenterY,
      zoom: 0.18,
    };
  }

  if (cardSide === "left") {
    const desiredCenterX = THREE.MathUtils.clamp(nearestRect.right + floatingWidth * 0.5 + cardGap, minCenterX, maxCenterX);
    const layerX = desiredCenterX - viewportCenterX;
    return {
      // Card is left -> robot presents from right side.
      x: 0,
      yaw: -0.56,
      pitch: 0.05 * easedInfluence,
      roll: -0.08 * easedInfluence,
      influence: easedInfluence,
      scale: THREE.MathUtils.lerp(0.96, 0.66, sectionProgress),
      jump: 0.2 * (1 - sectionProgress),
      layerX,
      layerY,
      zoom: THREE.MathUtils.clamp(0.3 + sectionProgress * 0.42 + easedInfluence * 0.35, 0, 1),
    };
  }

  const desiredCenterX = THREE.MathUtils.clamp(nearestRect.left - floatingWidth * 0.5 - cardGap, minCenterX, maxCenterX);
  const layerX = desiredCenterX - viewportCenterX;
  return {
    // Card is right -> robot presents from left side.
    x: 0,
    yaw: 0.96,
    pitch: 0.05 * easedInfluence,
    roll: 0.08 * easedInfluence,
    influence: easedInfluence,
    scale: THREE.MathUtils.lerp(0.96, 0.66, sectionProgress),
    jump: 0.2 * (1 - sectionProgress),
    layerX,
    layerY,
    zoom: THREE.MathUtils.clamp(0.3 + sectionProgress * 0.42 + easedInfluence * 0.35, 0, 1),
  };
}

function setupBackgroundScene() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 1.2, 7.3);

  const renderer = createRenderer(canvas, true);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1200;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0x2ee6ff,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
    })
  );
  scene.add(stars);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(7, 0.035, 16, 240),
    new THREE.MeshBasicMaterial({ color: 0x1e96ff, transparent: true, opacity: 0.42 })
  );
  ring.rotation.x = 1.15;
  ring.position.y = -2.2;
  scene.add(ring);

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  resize();

  function animate() {
    stars.rotation.y += 0.00065;
    stars.rotation.x += 0.00018;
    ring.rotation.z += 0.0018 + scrollProgress * 0.0012;
    stars.position.y = Math.sin(performance.now() * 0.00015 + scrollProgress * Math.PI) * 0.2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", resize);
}

async function setupHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070d, 9, 22);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0.3, 1.2, 8.6);

  const renderer = createRenderer(canvas, true);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  addLights(scene);

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(4.6, 5.3, 0.35, 72),
    new THREE.MeshStandardMaterial({
      color: 0x071126,
      roughness: 0.2,
      metalness: 0.76,
      emissive: 0x0a3a67,
      emissiveIntensity: 0.25,
    })
  );
  platform.position.y = -1.85;
  scene.add(platform);

  const frameGroup = createPhotoFrame();
  scene.add(frameGroup);

  const resumeTexture = createResumeTexture();
  const resumePanel = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.2),
    new THREE.MeshBasicMaterial({ map: resumeTexture, transparent: true })
  );
  resumePanel.position.set(1.95, 1.05, -0.25);
  scene.add(resumePanel);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.04, 12, 180),
    new THREE.MeshBasicMaterial({ color: 0x2ee6ff, transparent: true, opacity: 0.55 })
  );
  halo.position.set(1.95, 1.05, -0.4);
  scene.add(halo);

  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.target.set(0, 0.6, 0);
  controls.minPolarAngle = 0.8;
  controls.maxPolarAngle = 1.4;
  controls.minAzimuthAngle = -0.7;
  controls.maxAzimuthAngle = 0.7;

  const loader = new GLTFLoader();
  let robot = null;
  let robotMixer = null;

  try {
    const loaded = await loadRobot("./Resources/smiling_robot_waving.glb", loader);
    robot = loaded.robot;
    robotMixer = loaded.mixer;
    robot.scale.set(1.25, 1.25, 1.25);
    robot.position.set(1.2, -1.7, 1.4);
    robot.rotation.y = -0.55;
    scene.add(robot);
  } catch (error) {
    // Keep the rest of the scene alive even if asset loading fails.
    console.error("Robot model failed to load:", error);
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  resize();

  const clock = new THREE.Clock();

  function animate() {
    const delta = clock.getDelta();
    const t = clock.getElapsedTime();
    frameGroup.rotation.y = Math.sin(t * 0.6) * 0.08;
    resumePanel.position.y = 1.05 + Math.sin(t * 1.1) * 0.07;
    halo.rotation.z = t * 0.5;
    camera.position.x = 0.3 + scrollProgress * 0.65;
    camera.position.z = 8.6 - scrollProgress * 0.55;

    if (robot) {
      robot.position.y = -1.7 + Math.sin(t * 1.2) * 0.08;
      robot.rotation.y = -0.55 + Math.sin(t * 0.7) * 0.15 + scrollProgress * 0.22;
      if (robotMixer) {
        robotMixer.update(delta);
      }
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", resize);
}

async function setupProjectsRobotScene() {
  const canvas = document.getElementById("projects-robot-canvas");
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.48, 3.6);
  camera.lookAt(0, 0.2, 0);

  const renderer = createRenderer(canvas, true);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  addLights(scene);

  let robot = null;
  let robotMixer = null;
  const robotLayer = document.querySelector(".projects-robot-floating");
  const robotMotionRig = new THREE.Group();
  const robotPoseRig = new THREE.Group();
  scene.add(robotMotionRig);
  robotMotionRig.add(robotPoseRig);

  let robotTargetX = 0;
  let robotTargetYaw = 0.15;
  let robotTargetPitch = 0;
  let robotTargetRoll = 0;
  let robotTargetScale = 0.98;
  let robotTargetJump = 0.2;
  let layerTargetX = 0;
  let layerTargetY = 0;
  let zoomTarget = 0.2;
  let focusInfluence = 0;

  let robotCurrentX = 0;
  let robotCurrentYaw = 0.15;
  let robotCurrentPitch = 0;
  let robotCurrentRoll = 0;
  let robotCurrentScale = 0.98;
  let robotCurrentJump = 0.2;
  let layerCurrentX = 0;
  let layerCurrentY = 0;
  let zoomCurrent = 0.2;
  let cameraCurrentZ = 3.6;
  let cameraCurrentY = 0.48;
  let lastActiveSide = "center";

  try {
    const loader = new GLTFLoader();
    const loaded = await loadRobot("./Resources/smiling_robot_waving.glb", loader);
    robot = loaded.robot;
    robotMixer = loaded.mixer;
    autoFrameRobot(robot, 2.15);
    robot.position.z = 0.08;
    robotPoseRig.position.set(0, -0.56, 0);
    robotPoseRig.add(robot);
  } catch (error) {
    console.error("Projects robot model failed to load:", error);
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  resize();

  const clock = new THREE.Clock();
  function animate() {
    const delta = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();

    const target = getOppositeRobotTargetFromProjects();
    robotTargetX = target.x;
    robotTargetYaw = target.yaw;
    robotTargetPitch = target.pitch;
    robotTargetRoll = target.roll;
    robotTargetScale = target.scale;
    robotTargetJump = target.jump;
    layerTargetX = target.layerX;
    layerTargetY = target.layerY;
    zoomTarget = target.zoom;
    focusInfluence = target.influence;

    if (robot) {
      // Frame-rate independent damping for consistently smooth movement.
      const sideNow = robotTargetYaw < 0 ? "right" : "left";
      const sideChanged = sideNow !== lastActiveSide;
      lastActiveSide = sideNow;

      const motionSmooth = sideChanged ? 17 : 11 + focusInfluence * 7;
      const layerSmooth = sideChanged ? 14 : 10;
      robotCurrentX = THREE.MathUtils.damp(robotCurrentX, robotTargetX, motionSmooth, delta);
      robotCurrentYaw = THREE.MathUtils.damp(robotCurrentYaw, robotTargetYaw, motionSmooth, delta);
      robotCurrentPitch = THREE.MathUtils.damp(robotCurrentPitch, robotTargetPitch, motionSmooth, delta);
      robotCurrentRoll = THREE.MathUtils.damp(robotCurrentRoll, robotTargetRoll, motionSmooth, delta);
      robotCurrentScale = THREE.MathUtils.damp(robotCurrentScale, robotTargetScale, motionSmooth, delta);
      robotCurrentJump = THREE.MathUtils.damp(robotCurrentJump, robotTargetJump, motionSmooth, delta);
      layerCurrentX = THREE.MathUtils.damp(layerCurrentX, layerTargetX, layerSmooth, delta);
      layerCurrentY = THREE.MathUtils.damp(layerCurrentY, layerTargetY, layerSmooth, delta);
      zoomCurrent = THREE.MathUtils.damp(zoomCurrent, zoomTarget, 8.5, delta);

      robotMotionRig.position.x = robotCurrentX;
      robotMotionRig.position.y = robotCurrentJump + Math.sin(t * 1.8) * 0.045;
      robotMotionRig.rotation.y = robotCurrentYaw + Math.sin(t * 0.95) * 0.1 + scrollProgress * 0.14;
      robot.scale.setScalar(robotCurrentScale * (1 + zoomCurrent * 0.08));

      // Subtle "torso/arm emphasis" through layered pose rig motion.
      robotPoseRig.rotation.x = robotCurrentPitch + Math.sin(t * 2.1) * 0.015;
      robotPoseRig.rotation.z = robotCurrentRoll + Math.sin(t * 2.8) * 0.02;

      if (robotMixer) {
        robotMixer.update(delta);
      }
    }

    cameraCurrentZ = THREE.MathUtils.damp(cameraCurrentZ, THREE.MathUtils.lerp(3.72, 3.12, zoomCurrent), 7.5, delta);
    cameraCurrentY = THREE.MathUtils.damp(cameraCurrentY, THREE.MathUtils.lerp(0.56, 0.38, zoomCurrent), 6.5, delta);
    camera.position.z = cameraCurrentZ;
    camera.position.y = cameraCurrentY;
    camera.lookAt(0, 0.2, 0);

    if (robotLayer) {
      robotLayer.style.transform = `translate3d(${layerCurrentX.toFixed(2)}px, ${layerCurrentY.toFixed(2)}px, 0)`;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", resize);
}

function init() {
  populateGrid("skills-grid", skills);
  populateGrid("projects-grid", projects);
  setupSkillsScrollAnimation();
  setupProjectModal();
  setupRevealAnimations();
  setupScrollState();
  setupBackgroundScene();
  setupProjectsRobotScene();
}

init();
