import { firebaseConfig, DEMO_MODE } from "./firebase-config.js";

const FIREBASE_VERSION = "12.11.0";
let auth = null;
let db = null;

if (!DEMO_MODE && !firebaseConfig.apiKey.startsWith("PASTE_")) {
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`);
  const { getAuth } = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`);
  const { getFirestore } = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const appRoot = document.querySelector("#app");
const state = {
  role: localStorage.getItem("mb_role") || "",
  onboarding: JSON.parse(localStorage.getItem("mb_onboarding") || "null"),
  user: JSON.parse(localStorage.getItem("mb_user") || "null")
};

function render(html) {
  appRoot.innerHTML = `<div class="phone-page fade-in">${html}</div>`;
  bindCommon();
}

function logo() {
  return `
    <div class="logo-wrap">
      <div class="logo-mark">◈</div>
      <div>
        <div class="logo-title">MentorBridge NG</div>
        <div class="logo-tag">Learning Today. Stronger Communities Tomorrow.</div>
      </div>
    </div>`;
}

function illustration() {
  return `
  <svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg" aria-label="Community learning illustration">
    <rect width="500" height="270" fill="#eefaf6"/>
    <circle cx="55" cy="45" r="22" fill="#d5eee6"/>
    <circle cx="445" cy="40" r="30" fill="#eaf1d9"/>
    <path d="M0 210 Q90 160 170 210 T340 205 T500 195 V270 H0Z" fill="#c8e7d8"/>
    <rect x="42" y="126" width="90" height="78" rx="5" fill="#f1c98d"/>
    <path d="M35 126 L87 88 L140 126Z" fill="#e58c68"/>
    <rect x="72" y="160" width="27" height="44" fill="#78b7a0"/>
    <circle cx="250" cy="86" r="26" fill="#a8d9ca"/>
    <path d="M205 190 Q210 130 250 130 Q290 130 295 190Z" fill="#075f56"/>
    <path d="M218 81 Q250 45 282 81 Q277 111 250 115 Q223 111 218 81Z" fill="#e5b994"/>
    <path d="M213 78 Q250 40 287 78 L275 93 Q250 76 225 95Z" fill="#126d61"/>
    <circle cx="165" cy="150" r="20" fill="#e3b58d"/>
    <path d="M130 215 Q132 168 165 168 Q198 168 200 215Z" fill="#ef9f6c"/>
    <circle cx="350" cy="150" r="20" fill="#c99472"/>
    <path d="M315 215 Q317 168 350 168 Q383 168 385 215Z" fill="#3d8ca3"/>
    <circle cx="115" cy="230" r="8" fill="#07966f"/>
    <circle cx="400" cy="222" r="7" fill="#f4b400"/>
    <path d="M180 220 Q250 185 320 220" stroke="#07966f" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function bindCommon() {
  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => navigate(btn.dataset.go));
  });
  document.querySelectorAll("[data-role]").forEach(card => {
    card.addEventListener("click", () => {
      state.role = card.dataset.role;
      localStorage.setItem("mb_role", state.role);
      navigate("signup");
    });
  });
}

function navigate(page) {
  const pages = {
    splash: renderSplash,
    roles: renderRoles,
    signup: renderSignup,
    gate: renderGate,
    academy: renderAcademyPlaceholder
  };
  (pages[page] || renderSplash)();
}

function renderSplash() {
  render(`
    <section class="screen center-screen">
      <div class="hero-logo">${logo()}</div>
      <div class="illustration">${illustration()}</div>
      <h1 class="hero-title">MentorBridge NG</h1>
      <p class="hero-subtitle">Learning Today. Stronger<br>Communities Tomorrow.</p>
      <div class="dots"><span class="dot active"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
      <p class="loading-text">Loading your journey...</p>
      <button class="btn btn-primary" data-go="roles" style="margin-top:24px">Get Started</button>
    </section>
  `);
}

function renderRoles() {
  render(`
    <section class="screen">
      <div style="margin-bottom:28px">${logo()}</div>
      <h1 class="section-title">Choose your role to get started</h1>
      <p class="section-subtitle">Different goals. Same mission — stronger communities.</p>

      <div class="role-card ${state.role==="corps"?"selected":""}" data-role="corps">
        <div class="role-icon">👤</div>
        <div>
          <div class="role-name">Corps Member</div>
          <div class="role-desc">✓ Find learning opportunities<br>✓ Build experience<br>✓ Earn badges</div>
        </div>
        <div class="role-check">${state.role==="corps"?"✓":"›"}</div>
      </div>

      <div class="role-card officer ${state.role==="officer"?"selected":""}" data-role="officer">
        <div class="role-icon">🎓</div>
        <div>
          <div class="role-name">Field Officer</div>
          <div class="role-desc">✓ Create opportunities<br>✓ Manage mentors<br>✓ Track impact</div>
        </div>
        <div class="role-check">${state.role==="officer"?"✓":"›"}</div>
      </div>

      <button class="btn btn-primary" data-go="signup" style="margin-top:18px">Continue</button>
      <p class="bottom-note">Already have an account? <span class="link" data-go="signup">Log In</span></p>
    </section>
  `);
}

function renderSignup() {
  const corps = state.role !== "officer";
  render(`
    <section class="screen">
      <button class="top-back" data-go="roles">← Back</button>
      <div style="margin-bottom:22px">${logo()}</div>
      <h1 class="section-title">${state.user ? "Welcome back" : "Create Account"}</h1>
      <p class="section-subtitle">${corps ? "Join MentorBridge NG and start your journey as a corps member." : "Create your Field Officer account to manage community learning opportunities."}</p>

      <form id="signupForm" class="form">
        ${!state.user ? `
        <div class="field">
          <label>Full Name</label>
          <div class="input-wrap"><span class="input-icon">♙</span><input class="input" name="fullName" required placeholder="Enter your full name"></div>
        </div>
        ` : ""}
        <div class="field">
          <label>Email Address</label>
          <div class="input-wrap"><span class="input-icon">✉</span><input class="input" type="email" name="email" required placeholder="Enter your email address"></div>
        </div>
        ${corps ? `
        <div class="field">
          <label>NYSC State Code</label>
          <div class="input-wrap"><span class="input-icon">⌖</span><input class="input" name="nyscCode" required placeholder="Enter your NYSC state code"></div>
          <div class="help">Example: KN/24A/1234</div>
        </div>` : ""}
        <div class="field">
          <label>Password</label>
          <div class="input-wrap"><span class="input-icon">▣</span><input class="input" id="password" type="password" name="password" required minlength="6" placeholder="Create a password"><button type="button" class="password-toggle" data-toggle="password">◉</button></div>
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <div class="input-wrap"><span class="input-icon">▣</span><input class="input" id="confirmPassword" type="password" name="confirmPassword" required minlength="6" placeholder="Confirm your password"></div>
        </div>
        <div id="formMessage"></div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">${state.user ? "Continue" : "Create Account"}</button>
        </div>
      </form>
      <p class="bottom-note">Already have an account? <span class="link" id="loginLink">Log In</span></p>
      ${DEMO_MODE ? `<div class="demo-box">Demo mode is ON. Your account is stored locally on this device until Firebase is configured.</div>` : ""}
    </section>
  `);

  document.querySelector("[data-toggle=password]")?.addEventListener("click", () => {
    const input = document.querySelector("#password");
    input.type = input.type === "password" ? "text" : "password";
  });

  document.querySelector("#loginLink")?.addEventListener("click", () => {
    const email = prompt("Enter your email");
    if (!email) return;
    const user = JSON.parse(localStorage.getItem("mb_user") || "null");
    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      state.user = user;
      renderGate();
    } else {
      alert("No demo account found for that email. Create an account first.");
    }
  });

  document.querySelector("#signupForm").addEventListener("submit", handleSignup);
}

async function handleSignup(e) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const message = document.querySelector("#formMessage");
  const password = form.get("password");
  const confirm = form.get("confirmPassword");

  if (password !== confirm) {
    message.innerHTML = `<div class="notice error">Passwords do not match.</div>`;
    return;
  }

  const email = String(form.get("email")).trim();
  const fullName = state.user?.fullName || String(form.get("fullName") || "").trim();
  const nyscCode = String(form.get("nyscCode") || "").trim().toUpperCase();

  if (state.role === "corps" && !/^[A-Z]{2}\/\d{2}[A-Z]\/\d{3,6}$/i.test(nyscCode)) {
    message.innerHTML = `<div class="notice error">Enter a valid NYSC State Code, for example KN/24A/1234.</div>`;
    return;
  }

  const button = e.currentTarget.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Creating account...";

  try {
    if (!DEMO_MODE && auth) {
      const { createUserWithEmailAndPassword, updateProfile } =
        await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });
    }

    state.user = {
      uid: state.user?.uid || crypto.randomUUID(),
      fullName,
      email,
      role: state.role,
      nyscCode: state.role === "corps" ? nyscCode : null,
      academyCompleted: false,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("mb_user", JSON.stringify(state.user));
    state.onboarding = { account: true, nysc: state.role === "corps", training: false };
    localStorage.setItem("mb_onboarding", JSON.stringify(state.onboarding));

    if (!DEMO_MODE && db) {
      const { doc, setDoc } = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);
      await setDoc(doc(db, "users", state.user.uid), state.user);
    }

    renderGate();
  } catch (error) {
    console.error(error);
    message.innerHTML = `<div class="notice error">${friendlyFirebaseError(error)}</div>`;
    button.disabled = false;
    button.textContent = "Create Account";
  }
}

function friendlyFirebaseError(error) {
  const code = error?.code || "";
  if (code.includes("email-already-in-use")) return "This email is already registered. Use Log In instead.";
  if (code.includes("invalid-email")) return "Please enter a valid email address.";
  if (code.includes("weak-password")) return "Password should contain at least 6 characters.";
  if (code.includes("network-request-failed")) return "Network error. Check your internet connection.";
  return error?.message || "Something went wrong. Please try again.";
}

function renderGate() {
  const user = state.user || {};
  const trainingDone = Boolean(user.academyCompleted);

  render(`
    <section class="screen">
      <button class="top-back" data-go="signup">← Back</button>
      <div style="margin-bottom:22px">${logo()}</div>
      <h1 class="section-title">Become a Certified Mentor</h1>
      <p class="section-subtitle">Complete the steps below to unlock marketplace access.</p>

      <div class="gate-list">
        <div class="gate-item">
          <div class="gate-icon">👤</div>
          <div class="gate-copy"><div class="gate-title">Account Created</div><div class="gate-status">✓ Completed</div></div>
          <div class="status-dot done">✓</div>
        </div>
        <div class="gate-item">
          <div class="gate-icon">🎖</div>
          <div class="gate-copy"><div class="gate-title">${state.role==="corps"?"NYSC Verified":"Officer Verified"}</div><div class="gate-status">✓ Completed</div></div>
          <div class="status-dot done">✓</div>
        </div>
        <div class="gate-item">
          <div class="gate-icon">🛡</div>
          <div class="gate-copy"><div class="gate-title">Complete Child Safeguarding Training</div><div class="gate-status">${trainingDone?"✓ Completed":"In Progress"}</div></div>
          <div class="status-dot ${trainingDone?"done":""}">${trainingDone?"✓":""}</div>
        </div>
      </div>

      <div class="lock-box">
        <div class="lock">${trainingDone ? "🔓" : "🔒"}</div>
        <div class="lock-title">${trainingDone ? "Marketplace Access Unlocked" : "Marketplace Access"}</div>
        <div class="lock-copy">${trainingDone ? "You can now browse and claim learning opportunities." : "Locked until training is completed."}</div>
      </div>

      <button class="btn btn-primary" id="trainingBtn">${trainingDone ? "Explore Marketplace" : "Start Training"}</button>
      <p class="bottom-note">Don't have an account? <span class="link" data-go="signup">Sign Up</span></p>
    </section>
  `);

  document.querySelector("#trainingBtn").addEventListener("click", () => {
    if (!trainingDone) {
      renderAcademyPlaceholder();
    } else {
      alert("Marketplace is the next module. We will build it next.");
    }
  });
}

function renderAcademyPlaceholder() {
  render(`
    <section class="screen">
      <button class="top-back" id="backGate">← Back</button>
      <div style="margin-bottom:22px">${logo()}</div>
      <div class="notice success">Required course</div>
      <h1 class="section-title">Child Safeguarding & Ethics 101</h1>
      <p class="section-subtitle">Learn how to protect children, recognize risks, and practice safe, ethical mentoring in your community.</p>

      <div class="role-card" style="display:block">
        <div style="font-size:28px;margin-bottom:10px">🛡️</div>
        <div class="role-name">What you'll learn</div>
        <p class="role-desc">✓ Understanding child protection<br>✓ Safe mentoring practices<br>✓ Ethical responsibilities<br>✓ Community engagement</p>
      </div>

      <div class="notice">Demo course screen: the full course catalog, embedded content, completion tracking and digital badge are the next build stage.</div>
      <button class="btn btn-primary" id="completeCourse">Mark as Completed</button>
    </section>
  `);

  document.querySelector("#backGate").addEventListener("click", renderGate);
  document.querySelector("#completeCourse").addEventListener("click", async () => {
    state.user.academyCompleted = true;
    localStorage.setItem("mb_user", JSON.stringify(state.user));
    renderGate();
  });
}

renderSplash();
