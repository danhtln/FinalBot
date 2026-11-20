/**
 * ============================================================================
 * CENTRALIZED CONFIGURATION FILE — public/config.js
 * ============================================================================
 * Loaded in the browser so both the React application and standalone HTML
 * modules (thanhvien.html, thenhom.html, etc.) share the exact same config.
 * ============================================================================
 */

window.__TEAM_CONFIG = {
  teamName: "FinalBot // GROUP 06",
  teamCode: "G06",
  projectTitle: "FinalBot",
  projectSubtitle: "Nền tảng trợ lý AI và Portfolio nhóm",
  university: "University of Science, VNU-HCM (HCMUS)",
  faculty: "Faculty of Information Technology (FIT)",
  classInfo: "7 Core Members",
  semester: "Academic Year 2025 – 2026",
  teamLogoUrl: "/images/team/team-logo.svg",
  teamPhotoUrl: "/images/team/team-photo.jpg",

  layer0Config: {
    useCustomHtmlFile: false,
    customHtmlPath: "/layer0/index.html",
    bgVideoUrl: "/videos/background.mp4",
    ctaButtonText: "GET STARTED",
    kickerText: "HCMUS • FACULTY OF INFORMATION TECHNOLOGY • GROUP 06",
  },

  socialLinks: {
    facebook: "https://facebook.com",
    zalo: "https://zalo.me",
    discord: "https://discord.gg",
    github: "https://github.com",
    email: "contact@fit.hcmus.edu.vn",
  },

  geminiApiKey: "YOUR_GEMINI_API_KEY_HERE",
  geminiModel: "gemini-2.0-flash",

  members: [
    {
      id: "member-01",
      index: "01",
      name: "Tran Thanh Danh",
      studentId: "23120001",
      role: "Team Leader & System Architect",
      specialty: "Distributed Systems & Existential Ontology",
      email: "23120001@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-01.jpg",
      portrait: "marcus",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_01/pub?embedded=true",
    },
    {
      id: "member-02",
      index: "02",
      name: "Le Khang",
      studentId: "23120002",
      role: "Creative Director & Motion Lead",
      specialty: "WebGL Shaders, Editorial Typography & Choreographed Motion",
      email: "23120002@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-02.jpg",
      portrait: "sophie",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_02/pub?embedded=true",
    },
    {
      id: "member-03",
      index: "03",
      name: "Cao Minh Khoi",
      studentId: "23120003",
      role: "AI & Knowledge Engineer",
      specialty: "Gemini API Integration, Dialectical Prompting & Search",
      email: "23120003@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-03.jpg",
      portrait: "julian",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_03/pub?embedded=true",
    },
    {
      id: "member-04",
      index: "04",
      name: "Chau Hong Lam",
      studentId: "23120004",
      role: "UI/UX & Philosophical Researcher",
      specialty: "Phenomenology, Literature Curation & Information Architecture",
      email: "23120004@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-04.jpg",
      portrait: "elena",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_04/pub?embedded=true",
    },
    {
      id: "member-05",
      index: "05",
      name: "Nguyen Thanh Tien",
      studentId: "23120005",
      role: "Full-Stack & Interactive Systems Lead",
      specialty: "Three.js, Canvas Physics & Sandbox Isolation",
      email: "23120005@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-05.jpg",
      portrait: "marcus",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_05/pub?embedded=true",
    },
    {
      id: "member-06",
      index: "06",
      name: "Vo Huu Tien",
      studentId: "23120006",
      role: "Data Visualization & Project Planner",
      specialty: "Gantt Roadmaps, Task Allocation Matrices & Sprint Analytics",
      email: "23120006@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-06.jpg",
      portrait: "sophie",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_06/pub?embedded=true",
    },
    {
      id: "member-07",
      index: "07",
      name: "Le Bach Long Vi",
      studentId: "23120007",
      role: "QA, DevOps & Product Demo Lead",
      specialty: "Cloud Deployment, Security Hardening & Media Production",
      email: "23120007@student.hcmus.edu.vn",
      avatarUrl: "/images/members/member-07.jpg",
      portrait: "julian",
      googleDocsUrl: "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_07/pub?embedded=true",
    },
  ],

  productDemos: [
    {
      id: "product-01",
      slotNumber: "01",
      title: "Product 01 — The Ontological Compass",
      videoEmbedUrl: "/videos/products/product-01.mp4",
    },
    {
      id: "product-02",
      slotNumber: "02",
      title: "Product 02 — Socratic Mirror AI",
      videoEmbedUrl: "/videos/products/product-02.mp4",
    },
    {
      id: "product-03",
      slotNumber: "03",
      title: "Product 03 — Ephemera: Cohort Time Capsule",
      videoEmbedUrl: "/videos/products/product-03.mp4",
    },
  ],
};
