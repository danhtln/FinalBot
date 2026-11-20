/**
 * ============================================================================
 * CENTRALIZED CONFIGURATION FILE — config.js
 * ============================================================================
 * HCMUS (University of Science, VNU-HCM) — Faculty of Information Technology
 * Final Project Theme: "The True Meaning of Life"
 *
 * Edit any field below (teamName, teamLogoUrl, socialLinks, geminiApiKey,
 * members, productDemos, teamVibeStats, etc.) and the entire website will
 * automatically apply your updates across all 8 Views, Modals, and Widgets.
 * ============================================================================
 */

const TEAM_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. GENERAL TEAM & PROJECT IDENTITY
  // --------------------------------------------------------------------------
  teamName: "FinalBot // GROUP 06",
  teamCode: "06",
  projectTitle: "The True Meaning of Life",
  projectSubtitle:
    " ",
  university: "University of Science, VNU-HCM (HCMUS)",
  faculty: "Faculty of Information Technology (FITUS)",
  classInfo: "7 Core Members",
  semester: "",
  teamLogoUrl: "", // <-- PASTE YOUR TEAM LOGO URL HERE (e.g., "/images/team-logo.png"). Leave empty to show philosophical emblem placeholder.
  teamPhotoUrl: "", // <-- PASTE YOUR TEAM GROUP PHOTO URL HERE (e.g., "/images/team-photo.jpg")

  // --------------------------------------------------------------------------
  // 2. LAYER 0 (CINEMATIC LANDING PAGE) CONFIGURATION
  // --------------------------------------------------------------------------
  layer0Config: {
    // Set useCustomHtmlFile to true after pasting your custom Layer 0 HTML into /public/layer0/index.html
    useCustomHtmlFile: false,
    customHtmlPath: "/layer0/index.html",
    ctaButtonText: "INITIALIZE",
    ctaButtonSubtext: "",
    kickerText: "UNIVERSITY OF SCIENCE (HCMUS) • FACULTY OF IT",
    heroQuote:
      "",
  },

  // --------------------------------------------------------------------------
  // 3. SOCIAL LINKS & LEFT SIDEBAR BONUS INFO
  // --------------------------------------------------------------------------
  socialLinks: {
    // <-- INSERT YOUR SOCIAL LINKS BELOW
    facebook: "https://facebook.com/hcmus.fit.team", // <-- Insert Facebook Group/Page link here
    zalo: "https://zalo.me/g/hcmusfitgroup",         // <-- Insert Zalo Group link here
    discord: "https://discord.gg/hcmus-meaning",     // <-- Insert Discord Server invite link here
    github: "https://github.com/hcmus-fit-meaning-of-life",
    email: "contact.group07@fit.hcmus.edu.vn",
  },
  sidebarBonusInfo: {
    campus: "227 Nguyen Van Cu, Dist. 5, HCMC",
    cohortSize: "< 40 Students",
    teamSize: "7 Members",
    philosophyAxis: "",
    currentSprint: "",
  },

  // --------------------------------------------------------------------------
  // 4. GEMINI AI CHATBOT CONFIGURATION (Bottom-Right FAB)
  // --------------------------------------------------------------------------
  // <-- INSERT YOUR GOOGLE GEMINI API KEY BELOW
  geminiApiKey: "YOUR_GEMINI_API_KEY_HERE",
  geminiModel: "gemini-2.5-flash",
  geminiSystemInstruction:
    "",

  // --------------------------------------------------------------------------
  // 5. 7 TEAM MEMBERS (Used in View 3: Members + thanhvien.html + Google Docs Modal)
  // --------------------------------------------------------------------------
  members: [
    {
      id: "member-01",
      index: "01",
      name: "Nguyen Thanh Tien",
      studentId: "26127459",
      role: "Creative content creator",
      specialty: "",
      email: "nttien2632@clc.fitus.edu.vn",
      avatarUrl: "", // Uses built-in filmstrip portrait if empty
      philosophicalMotto:
        "nhìn ổng đen đen",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_01/pub?embedded=true", // <-- Paste Member 1 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 18,
      totalTasks: 18,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-02",
      index: "02",
      name: "Chau Hong Lam",
      studentId: "26127249",
      role: "Team's secretary, key pillar in synthesizing information",
      specialty: "",
      email: "chlam2629@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_02/pub?embedded=true", // <-- Paste Member 2 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 15,
      totalTasks: 15,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-03",
      index: "03",
      name: "Tran Thanh Danh",
      studentId: "26127067",
      role: "Project leader & AI & Knowledgable engineer & Main full-stack web dev",
      specialty: "",
      email: "ttdanh2633@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "Bạn có Claude Code không?? Omg??!! cho tôi mượn với.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_03/pub?embedded=true", // <-- Paste Member 3 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 20,
      totalTasks: 20,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-04",
      index: "04",
      name: "Vo Huu Tien",
      studentId: "26127457",
      role: "Team member",
      specialty: "",
      email: "vhtien2634@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_04/pub?embedded=true", // <-- Paste Member 4 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 16,
      totalTasks: 16,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-05",
      index: "05",
      name: "Le Bach Long Vi",
      studentId: "26127523",
      role: "Deputy project leader",
      specialty: "",
      email: "lblvi2605@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_05/pub?embedded=true", // <-- Paste Member 5 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 23,
      totalTasks: 23,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-06",
      index: "06",
      name: "Cao Minh Khoi",
      studentId: "26127232 ",
      role: "Team member",
      specialty: "",
      email: "cmkhoi2613@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_06/pub?embedded=true", // <-- Paste Member 6 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 17,
      totalTasks: 17,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
    {
      id: "member-07",
      index: "07",
      name: "Le Khang",
      studentId: "26127199 ",
      role: "Team member",
      specialty: "",
      email: "lkhang2634@clc.fitus.edu.vn",
      avatarUrl: "",
      philosophicalMotto:
        "",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_07/pub?embedded=true", // <-- Paste Member 7 personal Google Docs URL here
      progressPercent: 100,
      completedTasks: 15,
      totalTasks: 15,
      keyContributions: [
        "",
        "",
        "",
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // 6. PRODUCT DEMOS (Used in View 7: Products — 3 Product Slots)
  // --------------------------------------------------------------------------
  productDemos: [
    {
      id: "product-01",
      slotNumber: "01",
      title: "Product 01 — The Ontological Compass",
      subtitle: "Interactive Existential Mapping & Personal Value Graph",
      status: "Ready for Demo / Video Embed",
      category: "Interactive Web Application",
      description:
        "An interactive philosophical instrument that maps daily human decisions across four classical & modern axes of meaning: Purpose (Telos), Connection (Ubuntu), Contemplation (Theoria), and Creation (Poiesis).",
      videoEmbedUrl: "", // <-- PASTE YOUTUBE / VIMEO / MP4 EMBED URL HERE (e.g. "https://www.youtube.com/embed/...")
      liveDemoUrl: "",   // <-- PASTE LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/ontological-compass",
      techTags: ["Next.js", "Three.js", "D3 Force Graph", "Tailwind CSS"],
      highlights: [
        "Real-time 3D constellation of personal life milestones",
        "Exportable philosophical reflection journal",
        "Built for HCMUS FIT Capstone Showcase",
      ],
    },
    {
      id: "product-02",
      slotNumber: "02",
      title: "Product 02 — Socratic Mirror AI",
      subtitle: "Dialectical Companion Powered by Gemini & Classical Texts",
      status: "Ready for Demo / Video Embed",
      category: "AI Philosophical Dialogue System",
      description:
        "Instead of giving instant shallow answers, Socratic Mirror engages students in gentle, structured Socratic questioning grounded in Stoicism, Buddhism, Existentialism, and Vietnamese humanist traditions.",
      videoEmbedUrl: "", // <-- PASTE YOUTUBE / VIMEO / MP4 EMBED URL HERE
      liveDemoUrl: "",   // <-- PASTE LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/socratic-mirror",
      techTags: ["Gemini 2.0 API", "RAG Pipeline", "Vector Embeddings", "TypeScript"],
      highlights: [
        "Multi-perspective philosophical lens switcher",
        "Citation-backed dialogues from primary texts",
        "Zero-latency streaming contemplation mode",
      ],
    },
    {
      id: "product-03",
      slotNumber: "03",
      title: "Product 03 — Ephemera: Shared Human Moments",
      subtitle: "Collective Memory Capsule for the <40-Student Cohort",
      status: "Ready for Demo / Video Embed",
      category: "Collaborative Time Capsule & Documentary",
      description:
        "A living digital archive and documentary film created by our 7-member team at HCMUS, capturing candid interviews with students and professors on one timeless question: 'What makes a life meaningful to you?'",
      videoEmbedUrl: "", // <-- PASTE YOUTUBE / VIMEO / MP4 EMBED URL HERE
      liveDemoUrl: "",   // <-- PASTE LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/ephemera-archive",
      techTags: ["WebGL Audio-Visual", "Documentary Film", "Spatial Canvas", "Web Audio API"],
      highlights: [
        "38 recorded voices from the HCMUS FIT cohort",
        "Spatial audio playback with synchronized transcripts",
        "Preserved as a permanent class time capsule",
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // 7. TEAM VIBE STATS & MEMORY ALBUM (Used in View 8: Dev Log & Behind the Scenes)
  // --------------------------------------------------------------------------
  teamVibeStats: {
    milkTeasConsumed: 142,
    linesOfCodeWritten: 110267,
    lateNightDiscussions: 37,
    philosophicalBooksRead: 10,
    coffeeCups: 18,
    bugsResolved: 164,
    hoursInLibrary: 310,
    commitsPushed: 5,
  },

  memoryPhotos: [
    {
      id: "mem-01",
      title: "First Existential Brainstorming at HCMUS Library",
      date: "Week 01 • Feb 2026",
      location: "Nguyen Van Cu Campus, Floor 4",
      caption:
        "Seven laptops, seven notebooks, and four hours debating whether meaning is discovered or constructed.",
      imageUrl: "", // <-- PASTE TEAM PHOTO 1 URL HERE
      aspect: "wide",
    },
    {
      id: "mem-02",
      title: "Midnight WebGL Shader Debugging Session",
      date: "Week 03 • Mar 2026",
      location: "FIT Lab E302 & Discord Voice",
      caption:
        "When the curl-noise particle field finally converged into the Spark Credential Badge at 2:14 AM.",
      imageUrl: "", // <-- PASTE TEAM PHOTO 2 URL HERE
      aspect: "tall",
    },
    {
      id: "mem-03",
      title: "Oolong Milk Tea & Socratic Interviews",
      date: "Week 05 • Mar 2026",
      location: "HCMUS Courtyard Benches",
      caption:
        "Recording fellow students from our <40-person class sharing their personal definitions of a good life.",
      imageUrl: "", // <-- PASTE TEAM PHOTO 3 URL HERE
      aspect: "square",
    },
    {
      id: "mem-04",
      title: "Final Architecture Review & Dress Rehearsal",
      date: "Week 08 • Apr 2026",
      location: "Lecture Hall I-23, HCMUS",
      caption:
        "Integrating all 8 views, the 3D field manuals, and the live Gemini philosophical assistant.",
      imageUrl: "", // <-- PASTE TEAM PHOTO 4 URL HERE
      aspect: "wide",
    },
  ],
};

// Expose globally in browser environments so embedded HTML modules can also read it
if (typeof window !== "undefined") {
  window.__TEAM_CONFIG = TEAM_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = TEAM_CONFIG;
}
