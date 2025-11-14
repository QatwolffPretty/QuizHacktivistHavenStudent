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

/// secondquiz.js (UPDATED)
// Hacktivist Haven — Network Basics & MITM Quiz (15 MCQ + 10 Short)
// Bilingual (EN / BM - Formal), WebAudio, Volume, + Hacker Underground tier & Matrix confetti

(() => {
  // ======== Config ========
  let currentLang = "EN"; // EN or BM
  const MCQ_COUNT = 15;

  // ======== Question bank (EN / BM Formal translations) ========
  const questions = [
    // 15 MCQs (each has q.{en,bm}, o.{en,bm} array, a.{en,bm} string)
    {
      type: "mcq",
      q: { en: "What is the purpose of an IP address?", bm: "Apakah tujuan alamat IP?" },
      o: {
        en: ["Identify a device", "Encrypt data", "Store packets", "Monitor bandwidth"],
        bm: ["Mengenal pasti peranti", "Menyulitkan data", "Menyimpan paket", "Memantau jalur lebar"]
      },
      a: { en: "Identify a device", bm: "Mengenal pasti peranti" }
    },
    {
      type: "mcq",
      q: { en: "Which protocol is used for secure web traffic?", bm: "Protokol manakah digunakan untuk trafik web selamat?" },
      o: {
        en: ["HTTP", "FTP", "HTTPS", "DNS"],
        bm: ["HTTP", "FTP", "HTTPS", "DNS"]
      },
      a: { en: "HTTPS", bm: "HTTPS" }
    },
    {
      type: "mcq",
      q: { en: "Which OSI layer handles routing?", bm: "Lapisan OSI manakah yang mengendalikan penghalaan (routing)?" },
      o: {
        en: ["Transport", "Network", "Application", "Session"],
        bm: ["Pengangkutan (Transport)", "Rangkaian (Network)", "Aplikasi (Application)", "Sesi (Session)"]
      },
      a: { en: "Network", bm: "Rangkaian (Network)" }
    },
    {
      type: "mcq",
      q: { en: "Which tool is commonly used for port scanning?", bm: "Alat manakah yang biasa digunakan untuk pengimbasan port?" },
      o: {
        en: ["Nmap", "Wireshark", "SSH", "SMTP"],
        bm: ["Nmap", "Wireshark", "SSH", "SMTP"]
      },
      a: { en: "Nmap", bm: "Nmap" }
    },
    {
      type: "mcq",
      q: { en: "A MITM attack aims to:", bm: "Serangan MITM bertujuan untuk:" },
      o: {
        en: ["Speed up network", "Intercept/alter communication", "Fix routing", "Encrypt data"],
        bm: ["Mempercepat rangkaian", "Menyamar & mengubah komunikasi", "Membaiki penghalaan", "Menyulitkan data"]
      },
      a: { en: "Intercept/alter communication", bm: "Menyamar & mengubah komunikasi" }
    },
    {
      type: "mcq",
      q: { en: "Which Wi-Fi attack creates a fake hotspot?", bm: "Serangan Wi-Fi manakah mencipta hotspot palsu?" },
      o: {
        en: ["Evil Twin", "ARP Table", "SSH Tunnel", "DHCP Relay"],
        bm: ["Evil Twin (Hotspot Palsu)", "Jadual ARP", "Terowong SSH", "Penghantaran DHCP"]
      },
      a: { en: "Evil Twin", bm: "Evil Twin (Hotspot Palsu)" }
    },
    {
      type: "mcq",
      q: { en: "What does ARP do?", bm: "Apakah fungsi ARP?" },
      o: {
        en: ["Maps IP to MAC", "Maps MAC to IP", "Encrypt DNS", "Scan ports"],
        bm: ["Memetakan IP kepada MAC", "Memetakan MAC kepada IP", "Menyulitkan DNS", "Mengimbas port"]
      },
      a: { en: "Maps IP to MAC", bm: "Memetakan IP kepada MAC" }
    },
    {
      type: "mcq",
      q: { en: "Which protocol does ping use?", bm: "Protokol manakah yang digunakan oleh ping?" },
      o: {
        en: ["TCP", "HTTP", "ICMP", "SSH"],
        bm: ["TCP", "HTTP", "ICMP", "SSH"]
      },
      a: { en: "ICMP", bm: "ICMP" }
    },
    {
      type: "mcq",
      q: { en: "Which port does HTTPS default to?", bm: "Port lalai untuk HTTPS ialah?" },
      o: {
        en: ["22", "80", "443", "53"],
        bm: ["22", "80", "443", "53"]
      },
      a: { en: "443", bm: "443" }
    },
    {
      type: "mcq",
      q: { en: "Which tool is used to capture packets for analysis?", bm: "Alat manakah digunakan untuk menangkap paket bagi tujuan analisis?" },
      o: {
        en: ["Wireshark", "MySQL", "Nginx", "Postman"],
        bm: ["Wireshark", "MySQL", "Nginx", "Postman"]
      },
      a: { en: "Wireshark", bm: "Wireshark" }
    },
    {
      type: "mcq",
      q: { en: "What helps prevent TLS stripping?", bm: "Apakah yang membantu mencegah TLS stripping?" },
      o: {
        en: ["HSTS", "FTP", "ARP", "SMTP"],
        bm: ["HSTS", "FTP", "ARP", "SMTP"]
      },
      a: { en: "HSTS", bm: "HSTS" }
    },
    {
      type: "mcq",
      q: { en: "DNS resolves domain names to:", bm: "DNS menukar nama domain kepada:" },
      o: {
        en: ["MAC addresses", "IP addresses", "Ports", "Protocols"],
        bm: ["Alamat MAC", "Alamat IP", "Port", "Protokol"]
      },
      a: { en: "IP addresses", bm: "Alamat IP" }
    },
    {
      type: "mcq",
      q: { en: "Which command shows the routing table on Linux?", bm: "Perintah manakah menunjukkan jadual routing pada Linux?" },
      o: {
        en: ["ip route", "echo", "chmod", "ss -tuln"],
        bm: ["ip route", "echo", "chmod", "ss -tuln"]
      },
      a: { en: "ip route", bm: "ip route" }
    },
    {
      type: "mcq",
      q: { en: "Which MITM method targets ARP tables?", bm: "Kaedah MITM manakah yang menyasarkan jadual ARP?" },
      o: {
        en: ["ARP Spoofing", "Port Mirroring", "DNSSEC", "SSH Fingerprint"],
        bm: ["ARP Spoofing", "Port Mirroring", "DNSSEC", "SSH Fingerprint"]
      },
      a: { en: "ARP Spoofing", bm: "ARP Spoofing" }
    },
    {
      type: "mcq",
      q: { en: "How does a VPN help on untrusted Wi-Fi?", bm: "Bagaimana VPN membantu di rangkaian Wi-Fi tidak dipercayai?" },
      o: {
        en: ["Encrypts traffic to a trusted endpoint", "Deletes cookies", "Changes MAC address", "Reduces latency"],
        bm: ["Menyulitkan trafik ke titik akhir yang dipercayai", "Memadamkan kuki", "Menukar alamat MAC", "Mengurangkan kelewatan"]
      },
      a: { en: "Encrypts traffic to a trusted endpoint", bm: "Menyulitkan trafik ke titik akhir yang dipercayai" }
    },

    // 10 Short answers (EN / BM)
    { type: "short", q: { en: "Explain how ARP Spoofing works.", bm: "Terangkan bagaimana ARP Spoofing berfungsi." } },
    { type: "short", q: { en: "What is a default gateway?", bm: "Apakah itu default gateway?" } },
    { type: "short", q: { en: "Name one sign of a rogue Wi-Fi AP.", bm: "Namakan satu tanda hotspot Wi-Fi palsu." } },
    { type: "short", q: { en: "Why is HTTPS safer than HTTP?", bm: "Mengapa HTTPS lebih selamat daripada HTTP?" } },
    { type: "short", q: { en: "What is the purpose of DNS?", bm: "Apakah tujuan DNS?" } },
    { type: "short", q: { en: "Explain why VPN protects against MITM.", bm: "Terangkan mengapa VPN melindungi daripada MITM." } },
    { type: "short", q: { en: "What is packet sniffing?", bm: "Apakah itu packet sniffing?" } },
    { type: "short", q: { en: "Describe TCP handshake in 2 lines.", bm: "Huraikan TCP handshake dalam 2 baris." } },
    { type: "short", q: { en: "How can you detect DNS spoofing?", bm: "Bagaimana mengesan DNS spoofing?" } },
    { type: "short", q: { en: "Name one mitigation for MITM.", bm: "Namakan satu mitigasi untuk MITM." } }
  ];

  // ======== DOM helpers ========
  const el = id => document.getElementById(id);
  const qTextEl = el("questionText");
  const answersEl = el("answersContainer");
  const progressTextEl = el("progressText");
  const progressBarEl = el("progressBar");
  const nameCard = el("nameCard");
  const quizCard = el("quizCard");
  const resultModal = el("resultModal");
  const startBtn = el("startQuizBtn");
  const nextBtn = el("nextBtn");
  const langToggle = document.getElementById("langToggle");
  const answersReview = el("answersReview");
  const retryBtn = el("retryQuiz");
  const returnBtn = el("returnDashboard");
  const resultTextEl = el("resultText");
  const userNameText = el("userNameText");
  const rankText = el("rankText");

  const confettiCanvas = el("confettiCanvas");

  // create volume control if missing
  let volumeControl = el("volumeControl");
  if (!volumeControl) {
    volumeControl = document.createElement("input");
    volumeControl.type = "range";
    volumeControl.id = "volumeControl";
    volumeControl.min = 0;
    volumeControl.max = 1;
    volumeControl.step = 0.01;
    volumeControl.value = 0.6;
    volumeControl.title = "Volume";
    volumeControl.style.position = "absolute";
    volumeControl.style.top = "12px";
    volumeControl.style.left = "16px";
    volumeControl.style.zIndex = 20;
    document.body.appendChild(volumeControl);
  }

  // ======== State ========
  let username = "";
  let current = 0;
  let score = 0;
  let savedAnswers = []; // { qTextEN, qTextBM, yourAnswerEN, yourAnswerBM, correct (true/false/null), type }
  let audioCtx = null;
  let masterGain = null;

  // ======== Audio (WebAudio) ========
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = parseFloat(volumeControl.value);
    masterGain.connect(audioCtx.destination);

    volumeControl.addEventListener("input", () => {
      const v = parseFloat(volumeControl.value);
      if (masterGain) masterGain.gain.setTargetAtTime(v, audioCtx.currentTime, 0.01);
    });
  }

  function playClick() {
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(1000, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.06, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(g);
    g.connect(masterGain);
    o.start(t);
    o.stop(t + 0.13);
  }

  function playGlitch() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const band = audioCtx.createBiquadFilter();
    band.type = "bandpass";
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    band.frequency.setValueAtTime(1000, now);
    noise.connect(band);
    band.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);
    noise.stop(now + 0.25);
  }

  function playSuccess() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.5, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 1.2);
    osc.stop(now + 1.4);
  }

  // ======== Utility ========
  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function shuffleArr(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ======== UI update functions ========
  function setStaticUIText() {
    const start = el("startQuizBtn");
    const next = el("nextBtn");
    if (currentLang === "BM") {
      start.textContent = "Mula";
      next.textContent = "Seterusnya";
    } else {
      start.textContent = "Start";
      next.textContent = "Next";
    }
  }

  function showQuestion() {
    initAudio();

    const q = questions[current];
    progressTextEl.textContent = `${current + 1} / ${questions.length}`;
    progressBarEl.style.width = `${(current / questions.length) * 100}%`;

    const qText = q.q[currentLang.toLowerCase()] || q.q.en;
    qTextEl.innerHTML = escapeHtml(qText);

    answersEl.innerHTML = "";

    if (q.type === "mcq") {
      const opts = q.o[currentLang.toLowerCase()] || q.o.en;
      const shuffled = shuffleArr(opts);
      shuffled.forEach(opt => {
        const div = document.createElement("div");
        div.className = "answer";
        div.tabIndex = 0;
        div.innerHTML = escapeHtml(opt);
        div.onclick = () => {
          document.querySelectorAll(".answer").forEach(elm => elm.classList.remove("selected"));
          div.classList.add("selected");
          playClick();
        };
        answersEl.appendChild(div);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.id = "shortAnswer";
      ta.placeholder = currentLang === "BM" ? "Taip jawapan ringkas anda..." : "Type your short answer...";
      answersEl.appendChild(ta);
      ta.focus();
    }
  }

  // ======== Event handlers ========
  if (langToggle) {
    langToggle.onclick = () => {
      currentLang = currentLang === "EN" ? "BM" : "EN";
      langToggle.textContent = currentLang === "EN" ? "BM" : "EN";
      setStaticUIText();
      showQuestion();
    };
  }

  if (startBtn) {
    startBtn.onclick = () => {
      const nameInput = el("usernameInput");
      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (!nameVal) {
        alert(currentLang === "BM" ? "Sila masukkan nama." : "Please enter your name.");
        return;
      }
      username = nameVal;
      nameCard.classList.add("hidden");
      quizCard.classList.remove("hidden");
      setStaticUIText();
      showQuestion();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      const q = questions[current];

      if (q.type === "mcq") {
        const selected = document.querySelector(".answer.selected");
        if (!selected) {
          alert(currentLang === "BM" ? "Sila pilih jawapan." : "Please select an answer.");
          return;
        }
        const selectedText = selected.textContent.trim();
        const correctText = q.a[currentLang.toLowerCase()] || q.a.en;
        const correct = selectedText === correctText;
        savedAnswers.push({
          qEN: q.q.en,
          qBM: q.q.bm,
          yourAnswerEN: q.o.en.includes(selectedText) ? selectedText : null,
          yourAnswerBM: q.o.bm.includes(selectedText) ? selectedText : null,
          correct: correct,
          type: "mcq"
        });
        if (correct) {
          score++;
          playClick();
        } else {
          playGlitch();
        }
      } else {
        const ta = el("shortAnswer");
        const value = ta ? ta.value.trim() : "";
        savedAnswers.push({
          qEN: q.q.en,
          qBM: q.q.bm,
          yourAnswerEN: currentLang === "EN" ? value : "",
          yourAnswerBM: currentLang === "BM" ? value : "",
          correct: null,
          type: "short"
        });
        playClick();
      }

      current++;
      if (current >= questions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    };
  }

  if (retryBtn) retryBtn.onclick = () => location.reload();
  if (returnBtn) returnBtn.onclick = () => {
    alert(currentLang === "BM" ? "Papan pemuka belum diimplementasikan." : "Dashboard not implemented yet.");
  };

  // ======== Tier system (Hacker Underground) ========
  function getHackerTier(pct) {
    // B: Hacker Underground Tier
    // Script Kiddie: 0–39
    // Code Runner: 40–59
    // Packet Surgeon: 60–79
    // Shadow Analyst: 80–89
    // Ghost Operator: 90–100
    if (pct >= 90) return { id: 5, nameEN: "Ghost Operator", nameBM: "Ghost Operator", color: "#9b00ff" };
    if (pct >= 80) return { id: 4, nameEN: "Shadow Analyst", nameBM: "Shadow Analyst", color: "#00ff99" };
    if (pct >= 60) return { id: 3, nameEN: "Packet Surgeon", nameBM: "Packet Surgeon", color: "#ff8c00" };
    if (pct >= 40) return { id: 2, nameEN: "Code Runner", nameBM: "Code Runner", color: "#ff4c4c" };
    return { id: 1, nameEN: "Script Kiddie", nameBM: "Script Kiddie", color: "#999" };
  }

  // ======== Matrix confetti (green rain) ========
  let matrixAnimId = null;
  function startMatrixConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext("2d");
    if (!ctx) return;

    // fit canvas
    function resize() {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(confettiCanvas.width / 14);
    const ypos = new Array(cols).fill(0);

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = "12pt monospace";

      for (let i = 0; i < ypos.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = i * 14;
        ctx.fillText(text, x, ypos[i] * 14);

        if (ypos[i] * 14 > confettiCanvas.height && Math.random() > 0.975) {
          ypos[i] = 0;
        }
        ypos[i]++;
      }
      matrixAnimId = requestAnimationFrame(draw);
    };
    // run for limited time (~6 seconds) then stop
    draw();
    setTimeout(() => {
      if (matrixAnimId) cancelAnimationFrame(matrixAnimId);
      // clear canvas gently
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 6000);
  }

  // ======== End quiz / review ========
  function endQuiz() {
    quizCard.classList.add("hidden");
    resultModal.classList.remove("hidden");

    const mcqTotal = questions.filter(q => q.type === "mcq").length;
    const pct = mcqTotal === 0 ? 0 : Math.round((score / mcqTotal) * 100);

    resultTextEl.textContent = currentLang === "BM"
      ? `${username}, anda mendapat ${score} / ${mcqTotal} (MCQ)`
      : `${username}, you scored ${score} / ${mcqTotal} (MCQ)`;

    const tier = getHackerTier(pct);
    const tierName = currentLang === "BM" ? tier.nameBM : tier.nameEN;
    rankText.innerHTML = `${currentLang === "BM" ? "Peringkat" : "Rank"}: <span style="color:${tier.color};font-weight:700">${tierName}</span> (${pct}%)`;

    // build review HTML
    let reviewHTML = `<h3>${currentLang === "BM" ? "Semakan" : "Review"}</h3>`;
    savedAnswers.forEach((it, idx) => {
      const qText = currentLang === "BM" ? it.qBM : it.qEN;
      reviewHTML += `<div style="margin-bottom:12px;"><strong>Q${idx + 1}:</strong> ${escapeHtml(qText)}<br/>`;
      if (it.type === "mcq") {
        const your = currentLang === "BM" ? (it.yourAnswerBM || "(tiada)") : (it.yourAnswerEN || "(none)");
        reviewHTML += `<div>${currentLang === "BM" ? "Jawapan anda" : "Your answer"}: ${escapeHtml(your)}</div>`;
        reviewHTML += `<div>${it.correct ? `<span class="correct">${currentLang === "BM" ? "Betul" : "Correct"}</span>` : `<span class="wrong">${currentLang === "BM" ? "Salah" : "Wrong"}</span>`}</div>`;
        const correctText = currentLang === "BM" ? (questions[idx].a.bm) : (questions[idx].a.en);
        reviewHTML += `<div class="muted">${currentLang === "BM" ? "Jawapan betul" : "Correct answer"}: ${escapeHtml(correctText)}</div>`;
      } else {
        const your = currentLang === "BM" ? (it.yourAnswerBM || "(tiada jawapan)") : (it.yourAnswerEN || "(no answer)");
        reviewHTML += `<div class="muted">${currentLang === "BM" ? "Jawapan anda" : "Your answer"}:</div>`;
        reviewHTML += `<div style="background:rgba(255,255,255,0.03);padding:8px;border-radius:6px;margin-top:6px;">${escapeHtml(your)}</div>`;
      }
      reviewHTML += `</div>`;
    });

    answersReview.innerHTML = reviewHTML;

    // celebratory sound + confetti only when pct >= 80 (Option 1)
    if (pct >= 80) {
      playSuccess();
      startMatrixConfetti();
    } else {
      // simple finish sound for lower scores
      playClick();
    }

    // persist leaderboard to localStorage
    try {
      const key = "hh_quiz_leaderboard";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ name: username, score, total: mcqTotal, pct, date: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {
      // ignore storage errors
    }
  }

  // ======== Initialize ========
  function init() {
    setStaticUIText();
    if (!qTextEl || !answersEl || !progressTextEl || !progressBarEl) {
      console.error("Required quiz DOM elements missing.");
      return;
    }
    nameCard.classList.remove("hidden");
    quizCard.classList.add("hidden");
    resultModal.classList.add("hidden");
  }

  init();

})();
