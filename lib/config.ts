/**
 * ============================================================================
 * CENTRALIZED APPLICATION CONFIGURATION — lib/config.ts
 * ============================================================================
 * HCMUS (University of Science, VNU-HCM) — Faculty of Information Technology
 * 7-Person Team Portfolio — Final Project Theme: "The True Meaning of Life"
 *
 * All unprovided or customizable data (teamName, teamLogoUrl, socialLinks,
 * geminiApiKey, members, productDemos, teamVibeStats, etc.) is extracted here
 * so you can update everything from one place.
 * ============================================================================
 */

export interface TeamMember {
  id: string
  index: string
  name: string
  studentId: string
  role: string
  specialty: string
  email: string
  avatarUrl: string
  portraitKey: "sophie" | "marcus" | "julian" | "elena"
  philosophicalMotto: string
  googleDocsUrl: string
  progressPercent: number
  completedTasks: number
  totalTasks: number
  currentFocus: string
  keyContributions: string[]
  weeklyLogs: { week: string; summary: string; status: "Completed" | "In Progress" | "Review" }[]
}

export interface ProductDemo {
  id: string
  slotNumber: string
  title: string
  subtitle: string
  status: string
  category: string
  philosophicalPillar: string
  description: string
  videoEmbedUrl: string
  liveDemoUrl: string
  repoUrl: string
  techTags: string[]
  highlights: string[]
}

export interface SprintStage {
  id: string
  phase: string
  title: string
  weeks: string
  startWeek: number
  durationWeeks: number
  status: "Completed" | "In Progress" | "Upcoming"
  progress: number
  lead: string
  deliverables: string[]
}

export interface TaskMatrixRow {
  module: string
  category: string
  weight: string
  status: "Done" | "Active" | "Scheduled"
  assignments: Record<string, "Lead" | "Core" | "Support" | "Review" | "-">
}

export const SITE_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. GENERAL TEAM & PROJECT IDENTITY
  // --------------------------------------------------------------------------
  teamName: "FinalBot // GROUP 06",
  teamShortName: "FinalBot",
  teamCode: "G06",
  projectTitle: "FinalBot",
  projectVietnameseTitle: "Final Bot",
  projectSubtitle:
    "",
  university: "University of Science, VNU-HCM (HCMUS)",
  faculty: "Faculty of Information Technology (FITUS)",
  classInfo: "7 Core Members",
  semester: "First Year",
  location: "227 Nguyen Van Cu St., Ward 4, District 5, Ho Chi Minh City",
  teamLogoUrl: "/images/team/team-logo.svg", // <-- File đặt tại public/images/team/team-logo.svg hoặc .png
  teamPhotoUrl: "/images/team/team-photo.jpg", // <-- File đặt tại public/images/team/team-photo.jpg

  // --------------------------------------------------------------------------
  // 2. LAYER 0: CINEMATIC LANDING PAGE CONFIG
  // --------------------------------------------------------------------------
  layer0: {
    // Set to true if you paste a full custom HTML document into /public/layer0/index.html
    useCustomHtmlFile: false,
    customHtmlPath: "/layer0/index.html",
    kicker: "HCMUS • FACULTY OF INFORMATION TECHNOLOGY • GROUP 06",
    headlineTop: "THE TRUE",
    headlineMiddle: "Meaning of Life",
    headlineBottom: "",
    epigraph:
      "",
    ctaLabel: "GET STARTED",
    ctaSubLabel: "",
    philosophicalPillars: [
      {
        numeral: "",
        latin: "",
        title: "",
        summary:
          "",
      },
      {
        numeral: "",
        latin: "",
        title: "",
        summary:
          "",
      },
      {
        numeral: "",
        latin: "",
        title: "",
        summary:
          "",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. SOCIAL LINKS & LEFT SIDEBAR BONUS INFO
  // --------------------------------------------------------------------------
  socialLinks: {
    // <-- INSERT YOUR SOCIAL LINKS HERE
    facebook: "https://facebook.com/hcmus.fit.team", // <-- Insert Facebook link
    zalo: "https://zalo.me/g/hcmusfitgroup",         // <-- Insert Zalo link
    discord: "https://discord.gg/hcmus-meaning",     // <-- Insert Discord link
    github: "https://github.com/hcmus-fit-meaning-of-life",
    email: "mailto:group07.meaning@fit.hcmus.edu.vn",
  },

  sidebarBonusInfo: {
    cohortTag: "< 45 Students",
    facultyTag: "HCMUS • FIT",
    teamSizeTag: "07 Members",
    themeTag: "",
    coordinates: "",
  },

  // --------------------------------------------------------------------------
  // 4. GEMINI API CONFIGURATION (Bottom-Right AI Chatbot FAB)
  // --------------------------------------------------------------------------
  // <-- INSERT YOUR GEMINI API KEY BELOW
  geminiApiKey: "YOUR_GEMINI_API_KEY_HERE",
  geminiEndpoint:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  geminiSystemPrompt:
    "",

  // --------------------------------------------------------------------------
  // 5. HOME VIEW (VIEW 1) OVERVIEW SLIDES
  // --------------------------------------------------------------------------
  homeOverviewSlides: [
    {
      id: "slide-01",
      tag: "01 // COHORT & IDENTITY",
      title: "Seven Minds in a <45-Student HCMUS IT Cohort",
      subtitle: "Faculty of Information Technology — University of Science, VNU-HCM",
      description:
        "Đồ án cuối kì của nhóm 06 là một cơ hội để nhóm mình tìm hiểu sâu về ý nghĩa cuộc sống, về lý do chúng ta đang cố gắng học tập, phấn đấu vì gì, cho ai, vì ai.",
      metrics: [
        { label: "Class Size", value: "< 45 Students" },
        { label: "Core Team", value: "07 Engineers" },
        { label: "Institution", value: "HCMUS — FIT" },
      ],
    },
    {
      id: "slide-02",
      tag: "02 // PROJECT ORIENTATION",
      title: "Hiện thực hóa ý tưởng",
      subtitle: "Theme: The True Meaning of Life (Ý Nghĩa Đích Thực Của Cuộc Sống)",
      description:
        "",
      metrics: [
        { label: "Core Pillars", value: "Telos • Ubuntu • Poiesis" },
        { label: "Interactive Engines", value: "WebGL2 + Three.js" },
        { label: "AI Dialectics", value: "Gemini 2.5 Flash" },
      ],
    },
    {
      id: "slide-03",
      tag: "03 // ARCHITECTURAL MANIFESTO",
      title: "Eight Unified Views, Zero Page Reloads, Tactile Motion",
      subtitle: "From Layer 0 Contemplation to Layer 1 Operational Synthesis",
      description:
        "Every view in this portfolio—from our team charter and 7-member filmstrip with live Google Docs progress frames to our 3D field manuals and dev logs—is engineered as a seamless single-viewport instrument.",
      metrics: [
        { label: "Dashboard Views", value: "08 Modules" },
        { label: "Source Artifacts", value: "06 Custom Shaders" },
        { label: "Target Frame Rate", value: "60 FPS Motion" },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // 6. MINUTES & RULES (VIEW 2)
  // --------------------------------------------------------------------------
  teamRules: [
    {
      code: "RULE 01",
      title: "Trách Nhiệm Cá Nhân & Đóng Góp Hàng Tuần",
      category: "Giá Trị Cốt Lõi",
      description:
        "Mỗi thành viên phải đóng góp tối thiểu 1 ý tưởng hoặc 1 công việc/tuần, hoàn thành công việc được giao đúng hạn và nghiêm túc. Phản hồi phân công công việc trong 24h (không phản hồi mặc định là nhận việc).",
      penaltyOrReward:
        "Reward: Khao 1 món từ quỹ phạt + tuyên dương/ưu tiên vị trí nổi bật trong Credit • Breach: Phạt 10.000đ + làm lại; gây ảnh hưởng nghiêm trọng bị trừ điểm đánh giá cuối kỳ.",
    },
    {
      code: "RULE 02",
      title: "Kỷ Luật Họp Nhóm & Đúng Giờ",
      category: "Nếp Sinh Hoạt & Kỷ Luật",
      description:
        "Họp tối thiểu 1 lần/tuần (Sáng T6 hoặc Chủ Nhật). Tham gia đầy đủ, đúng giờ, giữ thái độ nghiêm túc và tuyệt đối không lướt mạng xã hội hay làm việc riêng trong lúc họp.",
      penaltyOrReward:
        "Breach: Trễ 10 phút phạt 10.000đ, trễ 30 phút phạt 20.000đ. Trễ >1 tiếng tính vắng không phép. Trễ/Vắng không phép >3 lần bị trừ 1 điểm đánh giá cuối kỳ.",
    },
    {
      code: "RULE 03",
      title: "Giao Tiếp & Phản Hồi Trong 24 Giờ",
      category: "Kênh Giao Tiếp",
      description:
        "Tương tác thường xuyên qua Zalo nhóm. Bắt buộc phản hồi/thả icon xác nhận mọi thông báo họp hoặc phân công trong vòng 24h. Sau 24h sẽ bị nhắc riêng và gọi trực tiếp sau 6h.",
      penaltyOrReward:
        "Breach: Bỏ qua bình chọn phạt 10.000đ và mặc định theo số đông • Tái phạm không phản hồi tin nhắn phân công phạt 10.000đ.",
    },
    {
      code: "RULE 04",
      title: "Sử Dụng AI Có Trách Nhiệm & Tư Duy Cá Nhân",
      category: "Liêm Chính Học Thuật",
      description:
        "Cấm lạm dụng AI toàn phần (giao 100% nhiệm vụ cho AI rồi nộp không qua thẩm định). Sản phẩm được tạo ra từ 100% AI không qua chỉnh sửa thường kéo theo đầu ra nhiều lỗi, buộc người khác phải sửa thay cho người làm. Mọi kết quả bàn giao phải thể hiện tư duy cá nhân và tự chịu trách nhiệm.",
      penaltyOrReward:
        "Core Policy: Vi phạm bị tính là không hoàn thành nhiệm vụ và áp dụng khung phạt trễ/không thực hiện công việc nhóm.",
    },
  ],

  meetingMinutes: [
    {
      id: "min-01",
      date: "14 Feb 2026 • 14:00 ICT",
      location: "HCMUS Central Library — Level 4 Study Room",
      sprint: "Sprint 01 // Genesis",
      attendees: "7 / 7 Members Present",
      chairperson: "Tran Thanh Danh",
      secretary: "Chau Hong Lam",
      summary:
        "Established Group 07 charter, selected 'The True Meaning of Life' as our overarching capstone theme, and defined the 7-role specialization matrix.",
      decisions: [
        "Adopted a dual-layer architecture: Layer 0 Cinematic Landing + Layer 1 8-Tab Dashboard.",
        "Assigned personal Google Docs progress trackers for all 7 team members.",
        "Selected light-mode editorial aesthetic inspired by philosophical monographs.",
      ],
    },
    {
      id: "min-02",
      date: "28 Feb 2026 • 19:30 ICT",
      location: "Discord Stage & FIT Lab E302",
      sprint: "Sprint 02 // Foundation",
      attendees: "7 / 7 Members Present",
      chairperson: "Tran Thanh Danh",
      secretary: "Chau Hong Lam",
      summary:
        "Reviewed custom WebGL/Three.js modules (thenhom.html, thanhvien.html, sketchbook.html, tailieu.html, congcu.html, getstartedbutton.html) and standardized the config.js schema.",
      decisions: [
        "Expanded character filmstrip (thanhvien.html) from 5 to 7 members while preserving exact DOM/CSS structure.",
        "Configured sketchbook.html text placeholders to 'Updating' for View 4 Project Plan.",
        "Designed full-screen Google Docs modal viewer for transparent progress auditing.",
      ],
    },
    {
      id: "min-03",
      date: "15 Mar 2026 • 15:00 ICT",
      location: "HCMUS Campus Courtyard",
      sprint: "Sprint 03 // Integration",
      attendees: "7 / 7 Members Present",
      chairperson: "Le Khang",
      secretary: "Vo Huu Tien",
      summary:
        "Integrated Gemini AI Chatbot widget in the bottom-right FAB, connected global keyword search across all 8 tabs, and finalized the 3 product demo slots.",
      decisions: [
        "Pre-coded direct Gemini API fetch structure with configurable GEMINI_API_KEY constant.",
        "Added interactive Gantt chart & RACI task allocation matrix in View 4.",
        "Scheduled final cohort showcase for our <40-student HCMUS FIT class.",
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // 7. 7 TEAM MEMBERS (VIEW 3)
  // --------------------------------------------------------------------------
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
      portraitKey: "marcus",
      philosophicalMotto:
        "Meaning emerges where structure meets intentionality—both in software and in human life.",
      // <-- PASTE PERSONAL GOOGLE DOCS EMBED / SHARE LINK BELOW
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_01/pub?embedded=true",
      progressPercent: 95,
      completedTasks: 18,
      totalTasks: 19,
      currentFocus: "Cross-layer state orchestration & final capstone defense deck",
      keyContributions: [
        "Architected Layer 0 -> Layer 1 transition engine and centralized config.js schema",
        "Led weekly sprint planning & synthesized Viktor Frankl's Logotherapy framework",
        "Coordinated integration of all 6 custom HTML/WebGL source artifacts",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Defined system blueprint, team charter & 8-view routing.", status: "Completed" },
        { week: "Week 03–04", summary: "Built Layer 0 orchestration & config.js live data binding.", status: "Completed" },
        { week: "Week 05–06", summary: "End-to-end integration audit across all 7 member modules.", status: "Completed" },
      ],
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
      portraitKey: "sophie",
      philosophicalMotto:
        "Light and motion are how the unseen depth of consciousness makes itself felt.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_02/pub?embedded=true",
      progressPercent: 93,
      completedTasks: 15,
      totalTasks: 16,
      currentFocus: "Fine-tuning WebGL liquid-chrome CTA shader & page transition curves",
      keyContributions: [
        "Crafted the light-mode philosophical editorial design system & typography",
        "Integrated getstartedbutton.html WebGL2 shader and thenhom.html Spark Badge",
        "Designed micro-interactions and scroll-triggered reveal animations",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Established warm alabaster/ink palette & serif typography.", status: "Completed" },
        { week: "Week 03–04", summary: "Adapted WebGL CTA pill and Spark Badge credential modal.", status: "Completed" },
        { week: "Week 05–06", summary: "Polished view-switching transitions and responsive layouts.", status: "Completed" },
      ],
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
      portraitKey: "julian",
      philosophicalMotto:
        "An artificial mind mirrors our questions so we may finally hear our own answers.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_03/pub?embedded=true",
      progressPercent: 91,
      completedTasks: 14,
      totalTasks: 15,
      currentFocus: "Socratic dialogue tuning & Gemini 2.0 context grounding",
      keyContributions: [
        "Built the Bottom-Right Gemini AI Chatbot Widget with direct REST API integration",
        "Engineered instant global search across all 8 views, members, and documents",
        "Developed Product 02 (Socratic Mirror AI) dialectical prompt pipeline",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Designed philosophical knowledge base & prompt taxonomy.", status: "Completed" },
        { week: "Week 03–04", summary: "Implemented Gemini fetch client & fallback reasoning engine.", status: "Completed" },
        { week: "Week 05–06", summary: "Connected header omni-search to deep view navigation.", status: "Completed" },
      ],
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
      portraitKey: "elena",
      philosophicalMotto:
        "Every interface is a quiet argument about what human beings ought to value.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_04/pub?embedded=true",
      progressPercent: 96,
      completedTasks: 16,
      totalTasks: 17,
      currentFocus: "Curating primary existential texts & cohort interview transcripts",
      keyContributions: [
        "Curated the Document Repository & 3D Field Manuals in View 5 (tailieu.html)",
        "Authored Team Minutes & Governance Rules templates in View 2",
        "Conducted user experience testing with fellow HCMUS FIT students",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Synthesized literature from Frankl, Camus, Aristotle & Thich Nhat Hanh.", status: "Completed" },
        { week: "Week 03–04", summary: "Structured View 2 Minutes/Rules & View 5 Document Cards.", status: "Completed" },
        { week: "Week 05–06", summary: "Editorial copywriting and accessibility verification.", status: "Completed" },
      ],
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
      portraitKey: "marcus",
      philosophicalMotto:
        "Complexity is only justified when it serves clarity of thought and human wonder.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_05/pub?embedded=true",
      progressPercent: 90,
      completedTasks: 13,
      totalTasks: 15,
      currentFocus: "Memory management & postMessage bridge between standalone scenes",
      keyContributions: [
        "Expanded thanhvien.html 3D filmstrip to 7 members with postMessage modal bridge",
        "Configured sketchbook.html 3D page-curl & magnifying loupe for View 4",
        "Integrated congcu.html 3D tool manuals in View 6",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Audited all 6 custom HTML/WebGL source files for compatibility.", status: "Completed" },
        { week: "Week 03–04", summary: "Built postMessage event bus between iframes and React shell.", status: "Completed" },
        { week: "Week 05–06", summary: "Optimized GPU canvas lifecycle when switching tabs.", status: "Completed" },
      ],
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
      portraitKey: "sophie",
      philosophicalMotto:
        "To measure our days with care is to honor the finite time we share.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_06/pub?embedded=true",
      progressPercent: 94,
      completedTasks: 17,
      totalTasks: 18,
      currentFocus: "Finalizing Sprint 04 velocity metrics & behind-the-scenes archive",
      keyContributions: [
        "Built the interactive Gantt Roadmap & Task Allocation Matrix in View 4",
        "Compiled Weekly Dev Logs, Milk Tea counter & Memory Photo Corner in View 8",
        "Standardized Google Docs progress templates for all 7 members",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Created master WBS (Work Breakdown Structure) & Gantt timeline.", status: "Completed" },
        { week: "Week 03–04", summary: "Built Task Allocation Matrix mapping all 7 members across modules.", status: "Completed" },
        { week: "Week 05–06", summary: "Curated View 8 Dev Log timeline and team vibe statistics.", status: "Completed" },
      ],
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
      portraitKey: "julian",
      philosophicalMotto:
        "Resilience is tested at the edges—in software, in scholarship, and in life.",
      googleDocsUrl:
        "https://docs.google.com/document/d/e/2PACX-1vR_placeholder_member_07/pub?embedded=true",
      progressPercent: 92,
      completedTasks: 14,
      totalTasks: 15,
      currentFocus: "Production deployment verification & Product 01–03 video embeds",
      keyContributions: [
        "Engineered View 7 Products showcase with 3 video/demo interactive slots",
        "Configured Next.js security headers, CI pipeline & responsive breakpoints",
        "Conducted cross-browser verification and WebGL fallback testing",
      ],
      weeklyLogs: [
        { week: "Week 01–02", summary: "Set up repository structure, deployment pipeline & linting.", status: "Completed" },
        { week: "Week 03–04", summary: "Developed View 7 Product Demo studio cards & embed player.", status: "Completed" },
        { week: "Week 05–06", summary: "Completed QA regression testing across desktop and mobile.", status: "Completed" },
      ],
    },
  ] as TeamMember[],

  // --------------------------------------------------------------------------
  // 8. PROJECT PLAN: GANTT ROADMAP & TASK MATRIX (VIEW 4)
  // --------------------------------------------------------------------------
  roadmapStages: [
    {
      id: "stage-01",
      phase: "Phase 01",
      title: "Philosophical Inquiry & Team Charter",
      weeks: "Weeks 01 – 02",
      startWeek: 1,
      durationWeeks: 2,
      status: "Completed",
      progress: 100,
      lead: "Tran Thanh Danh & Chau Hong Lam",
      deliverables: [
        "Team formation (7 members) & role charter",
        "Literature synthesis on 'The True Meaning of Life'",
        "Information architecture for Layer 0 & Layer 1",
      ],
    },
    {
      id: "stage-02",
      phase: "Phase 02",
      title: "Visual Identity & Custom Shader Prototyping",
      weeks: "Weeks 03 – 04",
      startWeek: 3,
      durationWeeks: 2,
      status: "Completed",
      progress: 100,
      lead: "Le Khang & Nguyen Thanh Tien",
      deliverables: [
        "WebGL CTA pill (getstartedbutton.html) & Spark Badge (thenhom.html)",
        "7-Member 3D filmstrip (thanhvien.html) & Sketchbook (sketchbook.html)",
        "3D Field Manuals (tailieu.html & congcu.html)",
      ],
    },
    {
      id: "stage-03",
      phase: "Phase 03",
      title: "Core Dashboard, Gemini AI & Data Binding",
      weeks: "Weeks 05 – 06",
      startWeek: 5,
      durationWeeks: 2,
      status: "Completed",
      progress: 100,
      lead: "Cao Minh Khoi & Vo Huu Tien",
      deliverables: [
        "Centralized config.js & data.json extraction",
        "Direct Gemini 2.0 API Chatbot FAB & Global Search",
        "Google Docs progress modal with full-screen mode",
      ],
    },
    {
      id: "stage-04",
      phase: "Phase 04",
      title: "Product Demos, QA & Final HCMUS Defense",
      weeks: "Weeks 07 – 08",
      startWeek: 7,
      durationWeeks: 2,
      status: "In Progress",
      progress: 92,
      lead: "Le Bach Long Vi & All 7 Members",
      deliverables: [
        "3 Product Demo video & interactive sandbox slots",
        "Performance optimization & security headers",
        "Final presentation to HCMUS FIT faculty & <40-student cohort",
      ],
    },
  ] as SprintStage[],

  taskAllocationMatrix: [
    {
      module: "Layer 0: Cinematic Landing & WebGL CTA",
      category: "Core Experience",
      weight: "15%",
      status: "Done",
      assignments: {
        "M. Khoa": "Lead",
        "P. Anh": "Core",
        "H. Nam": "-",
        "N. Han": "Support",
        "M. Tuan": "Core",
        "T. Vy": "-",
        "Q. Bao": "Review",
      },
    },
    {
      module: "Fixed Shell: Top Header, Team Badge (thenhom.html) & Sidebar",
      category: "Navigation & Identity",
      weight: "12%",
      status: "Done",
      assignments: {
        "M. Khoa": "Core",
        "P. Anh": "Lead",
        "H. Nam": "Support",
        "N. Han": "Review",
        "M. Tuan": "Core",
        "T. Vy": "-",
        "Q. Bao": "Support",
      },
    },
    {
      module: "Views 1 & 2: Home Overview, Team Minutes & Governance Rules",
      category: "Documentation",
      weight: "12%",
      status: "Done",
      assignments: {
        "M. Khoa": "Core",
        "P. Anh": "Support",
        "H. Nam": "-",
        "N. Han": "Lead",
        "M. Tuan": "-",
        "T. Vy": "Core",
        "Q. Bao": "Review",
      },
    },
    {
      module: "View 3: 7-Member Filmstrip (thanhvien.html) & Google Docs Modal",
      category: "Team & Progress",
      weight: "16%",
      status: "Done",
      assignments: {
        "M. Khoa": "Review",
        "P. Anh": "Core",
        "H. Nam": "-",
        "N. Han": "Support",
        "M. Tuan": "Lead",
        "T. Vy": "Core",
        "Q. Bao": "Support",
      },
    },
    {
      module: "View 4: Sketchbook (sketchbook.html), Gantt & Task Matrix",
      category: "Project Management",
      weight: "13%",
      status: "Done",
      assignments: {
        "M. Khoa": "Core",
        "P. Anh": "-",
        "H. Nam": "-",
        "N. Han": "Support",
        "M. Tuan": "Core",
        "T. Vy": "Lead",
        "Q. Bao": "Review",
      },
    },
    {
      module: "Views 5 & 6: Documents (tailieu.html) & Architecture (congcu.html)",
      category: "3D Knowledge Library",
      weight: "14%",
      status: "Done",
      assignments: {
        "M. Khoa": "Support",
        "P. Anh": "Core",
        "H. Nam": "Core",
        "N. Han": "Lead",
        "M. Tuan": "Lead",
        "T. Vy": "Support",
        "Q. Bao": "Review",
      },
    },
    {
      module: "Views 7 & 8: 3 Product Slots, Dev Log & Gemini AI Chatbot FAB",
      category: "Products & AI",
      weight: "18%",
      status: "Active",
      assignments: {
        "M. Khoa": "Review",
        "P. Anh": "Support",
        "H. Nam": "Lead",
        "N. Han": "Support",
        "M. Tuan": "Support",
        "T. Vy": "Core",
        "Q. Bao": "Lead",
      },
    },
  ] as TaskMatrixRow[],

  // --------------------------------------------------------------------------
  // 9. DOCUMENT REPOSITORY CARDS (VIEW 5 SUPPLEMENT)
  // --------------------------------------------------------------------------
  documentCards: [
    {
      id: "doc-01",
      code: "VOL. I // ONTOLOGY",
      title: "Man's Search for Meaning & Computational Telos",
      type: "Research Report",
      author: "Chau Hong Lam & Tran Thanh Danh",
      pages: "42 Pages • PDF / Google Docs",
      updated: "Mar 2026",
      abstract:
        "A comparative study of Viktor Frankl's Logotherapy, Aristotelian Eudaimonia, and how modern digital architectures either fragment or nurture human purpose.",
      link: "https://docs.google.com/document/d/e/2PACX-1vR_doc_01/pub",
    },
    {
      id: "doc-02",
      code: "VOL. II // SPECIFICATION",
      title: "System Requirement Specification (SRS) — Aetheria Platform",
      type: "Specification Doc",
      author: "Tran Thanh Danh & Nguyen Thanh Tien",
      pages: "36 Pages • IEEE 830 Standard",
      updated: "Mar 2026",
      abstract:
        "Complete technical specification covering Layer 0/Layer 1 state transitions, WebGL2 shader pipelines, iframe sandbox bridges, and Gemini API orchestration.",
      link: "https://docs.google.com/document/d/e/2PACX-1vR_doc_02/pub",
    },
    {
      id: "doc-03",
      code: "VOL. III // DIALECTICS",
      title: "Socratic Prompt Engineering & Epistemic Humility in LLMs",
      type: "Technical Monograph",
      author: "Cao Minh Khoi",
      pages: "28 Pages • Research Paper",
      updated: "Mar 2026",
      abstract:
        "How to design conversational AI agents that ask transformative philosophical questions rather than dispensing generic platitudes.",
      link: "https://docs.google.com/document/d/e/2PACX-1vR_doc_03/pub",
    },
    {
      id: "doc-04",
      code: "VOL. IV // ANTHOLOGY",
      title: "Voices of HCMUS FIT: 38 Reflections on a Meaningful Life",
      type: "Reference Book & Field Notes",
      author: "Vo Huu Tien & All 7 Members",
      pages: "64 Pages • Illustrated Field Book",
      updated: "Apr 2026",
      abstract:
        "Collected interviews, handwritten notes, and reflections from our <40-student cohort at the Faculty of Information Technology.",
      link: "https://docs.google.com/document/d/e/2PACX-1vR_doc_04/pub",
    },
  ],

  // --------------------------------------------------------------------------
  // 10. ARCHITECTURE & TECH STACK GRID (VIEW 6 SUPPLEMENT)
  // --------------------------------------------------------------------------
  techStackCategories: [
    {
      category: "Frontend & Motion",
      tag: "PRESENTATION LAYER",
      items: [
        { name: "Next.js 16 (App Router)", role: "Single-Viewport Orchestration & Zero-Reload Tabs" },
        { name: "React 19 + TypeScript", role: "Type-Safe Component Architecture & State Sync" },
        { name: "Tailwind CSS v4", role: "Minimalist Editorial Design Tokens & Responsive Grid" },
        { name: "WebGL2 & Three.js r165", role: "Tactile 3D Books, Liquid-Chrome CTA & Curl-Noise Rain" },
      ],
    },
    {
      category: "AI & Knowledge Engine",
      tag: "INTELLIGENCE LAYER",
      items: [
        { name: "Google Gemini 2.0 Flash API", role: "Direct REST Integration in Bottom-Right Philosophical FAB" },
        { name: "Socratic System Prompting", role: "Context-Grounded Responses on Team & Existential Themes" },
        { name: "Client Omni-Search Index", role: "Instant Keyword Filtering Across All 8 Dashboard Views" },
      ],
    },
    {
      category: "Data & Collaboration",
      tag: "PERSISTENCE & DOCS",
      items: [
        { name: "Centralized config.js / data.json", role: "Decoupled Configuration for Team, Links, API Key & Stats" },
        { name: "Google Docs Embedded Frames", role: "Live Per-Member Work Progress Auditing with Full-Screen Mode" },
        { name: "Window postMessage Bus", role: "Bi-directional Events Between Standalone HTML Scenes & Shell" },
      ],
    },
    {
      category: "DevOps & Quality Assurance",
      tag: "INFRASTRUCTURE",
      items: [
        { name: "Vercel Edge Network", role: "Global Production Deployment & Instant Preview URLs" },
        { name: "HTTP Security Headers", role: "HSTS, X-Content-Type-Options, Referrer-Policy Hardening" },
        { name: "GitHub Actions & ESLint", role: "Automated Build Verification & Code Review Governance" },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // 11. PRODUCT DEMOS (VIEW 7 — 3 PRODUCT SLOTS)
  // --------------------------------------------------------------------------
  productDemos: [
    {
      id: "product-01",
      slotNumber: "01",
      title: "Product 01 — The Ontological Compass",
      subtitle: "Interactive Existential Mapping & Personal Value Constellation",
      status: "Slot 01 Ready • Video / Live Demo Frame",
      category: "Interactive Web Application",
      philosophicalPillar: "Pillar I — Telos (Purpose & Self-Direction)",
      description:
        "An interactive philosophical instrument where users map their daily commitments against their deepest life values, rendering a real-time 3D constellation of personal meaning.",
      videoEmbedUrl: "/videos/products/product-01.mp4", // <-- File đặt tại public/videos/products/product-01.mp4 (hoặc link YouTube)
      liveDemoUrl: "",   // <-- PASTE PRODUCT 1 LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/ontological-compass",
      techTags: ["Three.js", "Next.js", "Force-Directed Graph", "WebGL Shaders"],
      highlights: [
        "Interactive 4-axis existential compass (Telos, Ubuntu, Theoria, Poiesis)",
        "Visualizes alignment between how you spend hours and what you value",
        "Exportable high-resolution personal philosophical manifesto",
      ],
    },
    {
      id: "product-02",
      slotNumber: "02",
      title: "Product 02 — Socratic Mirror AI",
      subtitle: "Dialectical Contemplation Engine Powered by Gemini",
      status: "Slot 02 Ready • Video / Live Demo Frame",
      category: "AI Philosophical Companion",
      philosophicalPillar: "Pillar II — Theoria (Contemplation & Self-Inquiry)",
      description:
        "Unlike conventional chatbots that rush to give surface-level advice, Socratic Mirror guides students through thoughtful questions rooted in Stoicism, Existentialism, and Eastern mindfulness.",
      videoEmbedUrl: "/videos/products/product-02.mp4", // <-- File đặt tại public/videos/products/product-02.mp4 (hoặc link YouTube)
      liveDemoUrl: "",   // <-- PASTE PRODUCT 2 LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/socratic-mirror",
      techTags: ["Gemini 2.0 API", "Dialectical Prompting", "Streaming UI", "TypeScript"],
      highlights: [
        "Switch between Viktor Frankl, Marcus Aurelius, Albert Camus & Zen lenses",
        "Synthesizes personal journal reflections into core existential insights",
        "Directly connected to our team's philosophical research archive",
      ],
    },
    {
      id: "product-03",
      slotNumber: "03",
      title: "Product 03 — Ephemera: Cohort Time Capsule",
      subtitle: "38 Voices from Our <40-Student HCMUS FIT Class",
      status: "Slot 03 Ready • Video / Live Demo Frame",
      category: "Digital Documentary & Audio-Visual Archive",
      philosophicalPillar: "Pillar III — Ubuntu (Human Connection & Legacy)",
      description:
        "A collaborative documentary and interactive memory wall recording students and faculty at HCMUS answering one question: 'When you look back in twenty years, what will have made these university days meaningful?'",
      videoEmbedUrl: "/videos/products/product-03.mp4", // <-- File đặt tại public/videos/products/product-03.mp4 (hoặc link YouTube)
      liveDemoUrl: "",   // <-- PASTE PRODUCT 3 LIVE DEMO URL HERE
      repoUrl: "https://github.com/hcmus-fit-meaning-of-life/ephemera-capsule",
      techTags: ["Documentary Video", "Spatial Audio", "Canvas Timeline", "HCMUS Archive"],
      highlights: [
        "Intimate interviews across the Nguyen Van Cu campus",
        "Synchronized bilingual subtitles (Vietnamese & English)",
        "Dedicated to our <40-student Faculty of Information Technology class",
      ],
    },
  ] as ProductDemo[],

  // --------------------------------------------------------------------------
  // 12. DEV LOG & BEHIND THE SCENES (VIEW 8)
  // --------------------------------------------------------------------------
  teamVibeStats: {
    milkTeasConsumed: 142,
    linesOfCodeWritten: 28450,
    lateNightDiscussions: 37,
    philosophicalBooksRead: 19,
    coffeeCups: 218,
    bugsResolved: 164,
    hoursInLibrary: 310,
    commitsPushed: 412,
  },

  weeklyDevLogs: [
    {
      week: "WEEK 01",
      dateRange: "10 Feb – 16 Feb 2026",
      sprint: "Sprint 01 // The Question",
      title: "Forming Group 07 & Debating 'The True Meaning of Life'",
      author: "Tran Thanh Danh",
      mood: "Inspired & caffeinated (18 milk teas)",
      summary:
        "Seven students from our <40-person HCMUS FIT class gathered on the 4th floor of the library. We decided our capstone portfolio shouldn't just be a static template—it should feel like opening a rare philosophical manuscript.",
      tags: ["Team Charter", "Concept", "HCMUS Library"],
    },
    {
      week: "WEEK 02",
      dateRange: "17 Feb – 23 Feb 2026",
      sprint: "Sprint 01 // Architecture",
      title: "Designing the Dual-Layer Viewport & Config Contract",
      author: "Le Khang & Nguyen Thanh Tien",
      mood: "Deep focus (22 milk teas)",
      summary:
        "Mapped out the transition from Layer 0 (Cinematic Landing) to Layer 1 (8-View Fixed Dashboard). Established config.js so every member's profile, Google Docs link, and demo video can be updated cleanly.",
      tags: ["Layer 0 -> Layer 1", "config.js", "UI System"],
    },
    {
      week: "WEEK 03",
      dateRange: "24 Feb – 02 Mar 2026",
      sprint: "Sprint 02 // Shaders & Books",
      title: "Bringing 6 Custom WebGL & 3D Scenes to Life",
      author: "Nguyen Thanh Tien & Le Khang",
      mood: "2:00 AM shader breakthroughs (29 milk teas)",
      summary:
        "Integrated the curl-noise Spark Badge (thenhom.html), expanded the 3D character filmstrip (thanhvien.html) to all 7 members, wired the 3D sketchbook (sketchbook.html), and embedded the Three.js field libraries (tailieu.html & congcu.html).",
      tags: ["WebGL2", "Three.js", "7-Member Filmstrip"],
    },
    {
      week: "WEEK 04",
      dateRange: "03 Mar – 09 Mar 2026",
      sprint: "Sprint 03 // Intelligence",
      title: "Gemini AI Philosophical Oracle & Google Docs Live Frames",
      author: "Cao Minh Khoi & Vo Huu Tien",
      mood: "Dialectical flow (34 milk teas)",
      summary:
        "Connected the bottom-right Floating Action Button to the Gemini 2.0 API and built the Member Details Modal with embedded Google Docs progress viewers and one-click full-screen inspection.",
      tags: ["Gemini API", "Google Docs Modal", "Omni-Search"],
    },
    {
      week: "WEEK 05",
      dateRange: "10 Mar – 16 Mar 2026",
      sprint: "Sprint 04 // Synthesis",
      title: "Final Polish, Cohort Interviews & Deployment Readiness",
      author: "Le Bach Long Vi & Chau Hong Lam",
      mood: "Grateful & proud (39 milk teas)",
      summary:
        "Completed cross-browser verification, finalized the 3 product demo slots, and recorded our final reflections on what building this together taught us about friendship and purpose at HCMUS.",
      tags: ["QA Verification", "Product Slots", "Final Release"],
    },
  ],

  memoryPhotos: [
    {
      id: "mem-01",
      title: "Library Floor 4 — Where the Question Began",
      date: "Week 01 • Feb 2026",
      location: "HCMUS Nguyen Van Cu Campus",
      milkTeaNote: "7 Roasted Oolong Milk Teas (50% sugar, less ice)",
      caption:
        "Our very first whiteboard session mapping how computer science and existential philosophy intersect.",
      imageUrl: "/images/devlog/memory-01.jpg", // <-- File đặt tại public/images/devlog/memory-01.jpg
      placeholderGradient: "from-[#ebe3d2] via-[#dfd3bc] to-[#c9b89b]",
    },
    {
      id: "mem-02",
      title: "2:14 AM — When the Curl-Noise Badge Ignited",
      date: "Week 03 • Mar 2026",
      location: "FIT Lab E302 & Discord Screen Share",
      milkTeaNote: "4 Matcha Lattes + 3 Black Sugar Pearl Milk Teas",
      caption:
        "Debugging particle emission normals in thenhom.html while rain fell outside the lab window.",
      imageUrl: "/images/devlog/memory-02.jpg", // <-- File đặt tại public/images/devlog/memory-02.jpg
      placeholderGradient: "from-[#e2d9c8] via-[#d2c4ab] to-[#b8a487]",
    },
    {
      id: "mem-03",
      title: "Courtyard Conversations with Our <40-Student Class",
      date: "Week 04 • Mar 2026",
      location: "HCMUS Main Courtyard",
      milkTeaNote: "12 Jasmine Milk Teas shared with interviewees",
      caption:
        "Listening to classmates share their honest hopes, fears, and definitions of a meaningful life.",
      imageUrl: "/images/devlog/memory-03.jpg", // <-- File đặt tại public/images/devlog/memory-03.jpg
      placeholderGradient: "from-[#efe8da] via-[#e0d4be] to-[#c7b699]",
    },
    {
      id: "mem-04",
      title: "Seven Members, One Shared Horizon",
      date: "Week 05 • Apr 2026",
      location: "Lecture Hall I-23, HCMUS",
      milkTeaNote: "Celebratory round — 142nd cup of the semester!",
      caption:
        "After merging the final pull request uniting all 8 dashboard views into a single living archive.",
      imageUrl: "/images/devlog/memory-04.jpg", // <-- File đặt tại public/images/devlog/memory-04.jpg
      placeholderGradient: "from-[#e6decb] via-[#d5c7ae] to-[#bca889]",
    },
  ],
}
