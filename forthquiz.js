// secondquiz.js
// Hacktivist Haven — Network Basics + MITM Quiz (50 MCQ + 50 Short Answers)
// Overwrites previous logic: supports 'mcq' and 'short' question types.
// MCQs are auto-graded; short answers are saved for instructor review.
// Language Toggle
// ========================================================
// Hacktivist Haven Quiz - Network Basics + MITM (EN/BM)
// 15 MCQ + 10 Short Answer
// Language toggle: English (default) / Bahasa Melayu
// ========================================================

let currentLang = "EN";

// ---------------------
// QUESTION BANK (EN/BM)
// ---------------------
const questions = [
  // ========== 15 MCQs ==========
  {
    type: "mcq",
    q: {
      en: "What is the purpose of an IP address?",
      bm: "Apakah tujuan alamat IP?"
    },
    o: ["Identify a device", "Encrypt data", "Store packets", "Monitor bandwidth"],
    a: "Identify a device"
  },
  {
    type: "mcq",
    q: {
      en: "Which protocol is used for secure web traffic?",
      bm: "Protokol manakah digunakan untuk trafik web selamat?"
    },
    o: ["HTTP", "FTP", "HTTPS", "DNS"],
    a: "HTTPS"
  },
  {
    type: "mcq",
    q: {
      en: "Which layer of OSI handles routing?",
      bm: "Lapisan OSI manakah yang mengendalikan routing?"
    },
    o: ["Transport", "Network", "Application", "Session"],
    a: "Network"
  },
  {
    type: "mcq",
    q: {
      en: "Which tool is commonly used for port scanning?",
      bm: "Alat manakah yang biasa digunakan untuk pengimbasan port?"
    },
    o: ["Nmap", "Wireshark", "SSH", "SMTP"],
    a: "Nmap"
  },
  {
    type: "mcq",
    q: {
      en: "MITM attack goal is to:",
      bm: "Tujuan serangan MITM adalah untuk:"
    },
    o: ["Speed up network", "Intercept/alter communication", "Fix routing", "Encrypt data"],
    a: "Intercept/alter communication"
  },
  {
    type: "mcq",
    q: {
      en: "Which Wi-Fi attack creates a fake hotspot?",
      bm: "Serangan Wi-Fi manakah yang mewujudkan hotspot palsu?"
    },
    o: ["Evil Twin", "ARP Table", "SSH Tunnel", "DHCP Relay"],
    a: "Evil Twin"
  },
  {
    type: "mcq",
    q: {
      en: "What does ARP do?",
      bm: "Apakah fungsi ARP?"
    },
    o: ["Maps IP to MAC", "Maps MAC to IP", "Encrypt DNS", "Scan ports"],
    a: "Maps IP to MAC"
  },
  {
    type: "mcq",
    q: {
      en: "Which protocol is used by ping?",
      bm: "Protokol manakah digunakan oleh ping?"
    },
    o: ["TCP", "HTTP", "ICMP", "SSH"],
    a: "ICMP"
  },
  {
    type: "mcq",
    q: {
      en: "Which port does HTTPS use?",
      bm: "Port manakah digunakan oleh HTTPS?"
    },
    o: ["22", "80", "443", "53"],
    a: "443"
  },
  {
    type: "mcq",
    q: {
      en: "Which tool captures packets?",
      bm: "Alat manakah yang menangkap paket?"
    },
    o: ["Wireshark", "MySQL", "Nginx", "Postman"],
    a: "Wireshark"
  },
  {
    type: "mcq",
    q: {
      en: "What prevents TLS stripping?",
      bm: "Apakah yang mencegah TLS stripping?"
    },
    o: ["HSTS", "FTP", "ARP", "SMTP"],
    a: "HSTS"
  },
  {
    type: "mcq",
    q: {
      en: "DNS converts domain names to:",
      bm: "DNS menukar nama domain kepada:"
    },
    o: ["MAC", "IP", "Port", "Cipher"],
    a: "IP"
  },
  {
    type: "mcq",
    q: {
      en: "Which command shows Linux routing table?",
      bm: "Perintah manakah menunjukkan jadual routing Linux?"
    },
    o: ["ip route", "echo", "chmod", "ss -tuln"],
    a: "ip route"
  },
  {
    type: "mcq",
    q: {
      en: "Which MITM method targets ARP?",
      bm: "Kaedah MITM manakah menyasarkan ARP?"
    },
    o: ["ARP Spoofing", "Port Mirroring", "DNSSEC", "SSH Fingerprint"],
    a: "ARP Spoofing"
  },
  {
    type: "mcq",
    q: {
      en: "VPN protects users by:",
      bm: "VPN melindungi pengguna dengan:"
    },
    o: ["Encrypting traffic", "Deleting logs", "Increasing speed", "Changing MAC"],
    a: "Encrypting traffic"
  },

  // ========== 10 SUBJECTIVE ==========
  {
    type: "short",
    q: {
      en: "Explain how ARP Spoofing works.",
      bm: "Terangkan bagaimana ARP Spoofing berfungsi."
    }
  },
  {
    type: "short",
    q: {
      en: "What is a default gateway?",
      bm: "Apakah itu default gateway?"
    }
  },
  {
    type: "short",
    q: {
      en: "Name one sign of a rogue Wi-Fi AP.",
      bm: "Namakan satu tanda hotspot Wi-Fi palsu."
    }
  },
  {
    type: "short",
    q: {
      en: "Why is HTTPS safer than HTTP?",
      bm: "Mengapa HTTPS lebih selamat daripada HTTP?"
    }
  },
  {
    type: "short",
    q: {
      en: "What is the purpose of DNS?",
      bm: "Apakah tujuan DNS?"
    }
  },
  {
    type: "short",
    q: {
      en: "Explain why VPN protects against MITM.",
      bm: "Terangkan mengapa VPN melindungi daripada MITM."
    }
  },
  {
    type: "short",
    q: {
      en: "What is packet sniffing?",
      bm: "Apakah itu packet sniffing?"
    }
  },
  {
    type: "short",
    q: {
      en: "Describe TCP handshake in 2 lines.",
      bm: "Huraikan TCP handshake dalam 2 baris."
    }
  },
  {
    type: "short",
    q: {
      en: "How can you detect DNS spoofing?",
      bm: "Bagaimana mengesan DNS spoofing?"
    }
  },
  {
    type: "short",
    q: {
      en: "Name one mitigation for MITM.",
      bm: "Namakan satu mitigasi untuk MITM."
    }
  }
];

// ===============================
// DOM REFERENCES
// ===============================
const el = id => document.getElementById(id);
const nameCard = el("nameCard");
const quizCard = el("quizCard");
const resultModal = el("resultModal");
const usernameInput = el("usernameInput");
const questionText = el("questionText");
const answersContainer = el("answersContainer");
const progressText = el("progressText");
const progressBar = el("progressBar");

let username = "";
let current = 0;
let score = 0;
let savedAnswers = [];

// ===============================
// LANGUAGE TOGGLE
// ===============================
el("langToggle").onclick = () => {
  currentLang = currentLang === "EN" ? "BM" : "EN";
  el("langToggle").textContent = currentLang === "EN" ? "BM" : "EN";
  updateUI();
};

// update static UI text
function updateUI() {
  if (currentLang === "BM") {
    document.getElementById("startQuizBtn").textContent = "Mula";
    document.getElementById("nextBtn").textContent = "Seterusnya";
  } else {
    document.getElementById("startQuizBtn").textContent = "Start";
    document.getElementById("nextBtn").textContent = "Next";
  }
  showQuestion();
}

// ===============================
// QUIZ LOGIC
// ===============================
el("startQuizBtn").onclick = () => {
  username = usernameInput.value.trim();
  if (!username) return alert("Enter a valid name.");
  nameCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  updateUI();
};

function showQuestion() {
  const q = questions[current];

  progressText.textContent = `Question ${current + 1} / ${questions.length}`;
  progressBar.style.width = `${(current / questions.length) * 100}%`;

  questionText.textContent = q.q[currentLang.toLowerCase()] || q.q.en;

  answersContainer.innerHTML = "";

  if (q.type === "mcq") {
    q.o.forEach(opt => {
      const div = document.createElement("div");
      div.className = "answer";
      div.textContent = opt;
      div.onclick = () => {
        document.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
        div.classList.add("selected");
        div.dataset.correct = opt === q.a;
      };
      answersContainer.appendChild(div);
    });
  } else {
    const ta = document.createElement("textarea");
    ta.placeholder = currentLang === "EN" ? "Type your answer..." : "Taip jawapan anda...";
    ta.id = "shortAnswer";
    answersContainer.appendChild(ta);
  }
}

el("nextBtn").onclick = () => {
  const q = questions[current];

  if (q.type === "mcq") {
    const selected = document.querySelector(".answer.selected");
    if (!selected) return alert("Select an answer.");
    if (selected.dataset.correct === "true") score++;

    savedAnswers.push({
      q: q.q,
      yourAnswer: selected.textContent,
      correct: selected.dataset.correct === "true"
    });

  } else {
    const ta = document.getElementById("shortAnswer");
    savedAnswers.push({
      q: q.q,
      yourAnswer: ta.value.trim()
    });
  }

  current++;

  if (current >= questions.length) return endQuiz();

  showQuestion();
};

// ===============================
// END QUIZ
// ===============================
function endQuiz() {
  quizCard.classList.add("hidden");
  resultModal.classList.remove("hidden");

  el("resultText").textContent = 
    `${username}, you scored ${score} / 15 MCQs`;

  let html = "<h3>Review</h3>";

  savedAnswers.forEach((item, i) => {
    const qText = item.q[currentLang === "EN" ? "en" : "bm"];
    html += `<p><strong>Q${i + 1}:</strong> ${qText}<br>`;
    html += `Your answer: ${item.yourAnswer}<br>`;
    if (item.correct !== undefined) {
      html += item.correct ? "<span class='correct'>Correct</span>" : "<span class='wrong'>Wrong</span>";
    }
    html += "</p>";
  });

  el("answersReview").innerHTML = html;
}

el("retryQuiz").onclick = () => location.reload();
el("returnDashboard").onclick = () => alert("Dashboard not implemented yet.");
