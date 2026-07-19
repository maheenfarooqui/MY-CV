// Supabase is loaded only on pages that need it. Keeping this guard prevents
// static pages from throwing errors when the CDN is unavailable.
const supabaseClient =
  window.supabase?.createClient(
    "https://coqgfrbjdnryuygsfxjv.supabase.co",
    "sb_publishable_UlcDlRdouoysblgVQ9BVCw_vl8b27EL",
  ) || null;

const templateCards = {
  all: ["card1", "card2", "card3"],
  professional: ["card1"],
  modern: ["card2"],
  creative: ["card3"],
};

function safeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function listFromInputs(selector) {
  return Array.from(document.querySelectorAll(selector))
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function splitBullets(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function addSkillField() {
  const container = document.getElementById("skills-container");
  if (!container) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "custom-input mb-2 skill-input";
  input.placeholder = "e.g. Lead Generation";
  container.appendChild(input);
  input.focus();
}

function addCertField() {
  const container = document.getElementById("cert-container");
  if (!container) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "custom-input mb-2 cert-input";
  input.placeholder = "Certification Name";
  container.appendChild(input);
  input.focus();
}

function addExperienceField() {
  const container = document.getElementById("experience-container");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "card p-3 mb-3 bg-light border-0 shadow-sm exp-block";
  div.innerHTML = `
    <input type="text" class="custom-input mb-2 exp-role" placeholder="Job Role">
    <input type="text" class="custom-input mb-2 exp-company" placeholder="Company">
    <input type="text" class="custom-input mb-2 exp-date" placeholder="Date & Location">
    <textarea class="custom-input exp-desc" rows="3" placeholder="Key responsibilities (use new lines for bullets)"></textarea>
  `;
  container.appendChild(div);
  div.querySelector("input")?.focus();
}

function addLanguageField() {
  const container = document.getElementById("languages-container");
  if (!container) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "custom-input mb-2 lang-input";
  input.placeholder = "e.g. English (Fluent)";
  container.appendChild(input);
  input.focus();
}

function getFormData() {
  const expBlocks = document.querySelectorAll(".exp-block");
  const experience = Array.from(expBlocks)
    .map((block) => ({
      role: block.querySelector(".exp-role")?.value.trim(),
      company: block.querySelector(".exp-company")?.value.trim(),
      date: block.querySelector(".exp-date")?.value.trim(),
      bullets: splitBullets(block.querySelector(".exp-desc")?.value),
    }))
    .filter((item) => item.role || item.company || item.date || item.bullets.length);

  return {
    name: document.getElementById("input-name")?.value.trim() || "Full Name",
    title: document.getElementById("input-title")?.value.trim() || "Job Title",
    linkedin:
      document.getElementById("input-linkedin")?.value.trim() ||
      "linkedin.com/in/username",
    email:
      document.getElementById("input-email")?.value.trim() ||
      "email@example.com",
    phone:
      document.getElementById("input-phone")?.value.trim() || "+216 00 000 000",
    location:
      document.getElementById("input-location")?.value.trim() || "City, Country",
    summary:
      document.getElementById("input-summary")?.value.trim() ||
      "Write a short professional summary to introduce your experience, strengths, and career goals.",
    degree:
      document.getElementById("input-degree")?.value.trim() ||
      "Degree / Qualification",
    education:
      document.getElementById("input-education")?.value.trim() ||
      "University / Institute and Dates",
    skills: listFromInputs(".skill-input"),
    experience,
    languages: listFromInputs(".lang-input"),
    certificates: listFromInputs(".cert-input"),
  };
}

function renderBulletList(items, fallback) {
  const list = items.length ? items : [fallback];
  return list.map((item) => `<li>${safeText(item)}</li>`).join("");
}

function renderInlineList(items, fallback) {
  const list = items.length ? items : [fallback];
  return list.map(safeText).join(" &bull; ");
}

function renderExperienceBlocks(data, className) {
  if (!data.experience.length) {
    return `<div class="${className}"><p>Add your work experience...</p></div>`;
  }

  return data.experience
    .map((item) => {
      const bullets = item.bullets.length
        ? `<ul class="exp-bullets">${renderBulletList(item.bullets, "")}</ul>`
        : "";

      return `
        <div class="${className}">
          <div class="exp-head"><strong>${safeText(item.role || "Job Role")}</strong>, <span>${safeText(item.company || "Company")}</span></div>
          <div class="exp-date">${safeText(item.date || "Date | Location")}</div>
          ${bullets}
        </div>
      `;
    })
    .join("");
}
// render yaseen
function renderYassine() {
  const data = getFormData();
  const skillsHTML = renderBulletList(data.skills, "Skill not specified");
  const langsHTML = data.languages.length
    ? data.languages
        .map((language) => `<div class="lang-box"><strong>${safeText(language)}</strong></div>`)
        .join("")
    : '<div class="lang-box"><strong>Language not specified</strong></div>';
  const certsHTML = renderBulletList(data.certificates, "No certificates added yet");

  document.getElementById("live-preview").innerHTML = `
    <div class="template-yassine">
      <div class="resume-container">
        <aside class="sidebar">
          <div class="header-section">
            <h1 class="name">${safeText(data.name)}</h1>
            <p class="title">${safeText(data.title)}</p>
          </div>
          <div class="contact-list">
            <div class="contact-item"><i class="bi bi-linkedin"></i> ${safeText(data.linkedin)}</div>
            <div class="contact-item"><i class="bi bi-envelope"></i> ${safeText(data.email)}</div>
            <div class="contact-item"><i class="bi bi-telephone"></i> ${safeText(data.phone)}</div>
            <div class="contact-item"><i class="bi bi-geo-alt"></i> ${safeText(data.location)}</div>
          </div>
          <section class="side-block">
            <h3 class="side-label">Summary</h3>
            <p>${safeText(data.summary)}</p>
          </section>
          <section class="side-block">
            <h3 class="side-label">Skills</h3>
            <ul class="side-list">${skillsHTML}</ul>
          </section>
          <section class="side-block">
            <h3 class="side-label">Languages</h3>
            ${langsHTML}
          </section>
        </aside>
        <main class="main-content">
          <section class="main-section">
            <h3 class="main-label">Professional Experience</h3>
            ${renderExperienceBlocks(data, "exp-item")}
          </section>
          <section class="main-section">
            <h3 class="main-label">Education</h3>
            <div class="edu-item">
              <strong>${safeText(data.degree)}</strong>, <span>${safeText(data.education)}</span>
            </div>
          </section>
          <section class="main-section">
            <h3 class="main-label">Certificates</h3>
            <ul class="cert-list">${certsHTML}</ul>
          </section>
        </main>
      </div>
    </div>`;
}

// render sage
function renderSage() {
  const data = getFormData();
  const skillsText = renderInlineList(data.skills, "Skill not specified");
  const langsText = renderInlineList(data.languages, "Language not specified");
  const certsText = renderInlineList(data.certificates, "No certificates added yet");

  const expHTML = data.experience.length
    ? data.experience
        .map((item) => `
          <div class="exp-item">
            <div class="exp-row">
              <strong>${safeText(item.role || "Job Role")}</strong>
              <span>${safeText(item.date || "Date")}</span>
            </div>
            <div class="exp-row">
              <em>${safeText(item.company || "Company")}</em>
              <span>${safeText(data.location)}</span>
            </div>
            ${item.bullets.map((bullet) => `<p>${safeText(bullet)}</p>`).join("")}
          </div>
        `)
        .join("")
    : "<p>Add your work experience...</p>";

  document.getElementById("live-preview").innerHTML = `
    <div class="template-sage">
      <div class="resume-bg-overlay">
        <div class="resume-card">
          <header class="sage-header">
            <div class="header-main">
              <img src="assets/pic.jpg" class="sage-profile-img" alt="Profile">
              <div class="identity">
                <h1>${safeText(data.name)}</h1>
                <p class="subtitle">${safeText(data.title)}</p>
                <div class="contact-info">
                  <span><i class="bi bi-envelope"></i> ${safeText(data.email)}</span>
                  <span><i class="bi bi-geo-alt"></i> ${safeText(data.location)}</span>
                  <span><i class="bi bi-telephone"></i> ${safeText(data.phone)}</span>
                </div>
              </div>
            </div>
          </header>
          <div class="sage-content">
            <section class="sage-section">
              <h3 class="sage-label"><i class="bi bi-person-vcard"></i> Profile</h3>
              <p>${safeText(data.summary)}</p>
            </section>
            <section class="sage-section">
              <h3 class="sage-label"><i class="bi bi-briefcase"></i> Professional Experience</h3>
              ${expHTML}
            </section>
            <section class="sage-section">
              <h3 class="sage-label"><i class="bi bi-mortarboard"></i> Education</h3>
              <div class="edu-item">
                <div class="exp-row"><strong>${safeText(data.degree)}</strong><span></span></div>
                <div class="exp-row"><em>${safeText(data.education)}</em><span>${safeText(data.location)}</span></div>
              </div>
            </section>
            <div class="sage-grid">
              <section class="sage-section">
                <h3 class="sage-label"><i class="bi bi-globe"></i> Languages</h3>
                <p>${langsText}</p>
              </section>
              <section class="sage-section">
                <h3 class="sage-label"><i class="bi bi-cpu"></i> Skills</h3>
                <p>${skillsText}</p>
              </section>
            </div>
            <section class="sage-section">
              <h3 class="sage-label"><i class="bi bi-patch-check"></i> Certificates</h3>
              <p>${certsText}</p>
            </section>
          </div>
        </div>
      </div>
    </div>`;
}

// render sarah
function renderSarah() {
  const data = getFormData();
  const nameParts = safeText(data.name).split(" ").filter(Boolean).join("<br>");
  const skillBars = (data.skills.length ? data.skills : ["Skill not specified"])
    .map((skill, index) => `
      <div class="skill-item">
        <span>${safeText(skill)}</span>
        <div class="progress"><div class="bar" style="width: ${Math.max(55, 100 - index * 8)}%;"></div></div>
      </div>
    `)
    .join("");
  const langBars = (data.languages.length ? data.languages : ["Language not specified"])
    .map((language, index) => `
      <div class="skill-item">
        <span>${safeText(language)}</span>
        <div class="progress"><div class="bar" style="width: ${Math.max(60, 100 - index * 12)}%;"></div></div>
      </div>
    `)
    .join("");
  const expHTML = data.experience.length
    ? data.experience
        .map((item) => `
          <div class="job-entry">
            <p class="job-meta"><strong>${safeText(item.company || "Company")}, ${safeText(item.role || "Job Role")}</strong></p>
            <p class="date-loc">${safeText(item.date || "Date | Location")}</p>
            ${item.bullets.map((bullet) => `<p>${safeText(bullet)}</p>`).join("")}
          </div>
        `)
        .join("")
    : '<div class="job-entry"><p>Add your work experience...</p></div>';
  const interests = data.certificates.length
    ? data.certificates
    : ["Travelling", "Playing Guitar"];

  document.getElementById("live-preview").innerHTML = `
    <div class="template-sarah">
      <div class="resume-wrapper">
        <aside class="sidebar">
          <h1 class="name-logo">${nameParts}</h1>
          <p class="role-title">${safeText(data.title)}</p>
          <div class="profile-frame">
            <img src="assets/pic.jpg" alt="Profile" class="profile-img">
          </div>
          <div class="contact-details">
            <p><i class="bi bi-geo-alt-fill"></i> ${safeText(data.location)}</p>
            <p><i class="bi bi-telephone-fill"></i> ${safeText(data.phone)}</p>
            <p><i class="bi bi-envelope-fill"></i> ${safeText(data.email)}</p>
          </div>
          <div class="side-section">
            <h3 class="side-heading"><i class="bi bi-headset"></i> Skills</h3>
            ${skillBars}
          </div>
          <div class="side-section">
            <h3 class="side-heading"><i class="bi bi-globe"></i> Languages</h3>
            ${langBars}
          </div>
          <div class="side-section">
            <h3 class="side-heading"><i class="bi bi-hammer"></i> Favorite Quote</h3>
            <p class="quote">"Great work is crafted with passion, dedication, and attention to detail."</p>
          </div>
        </aside>
        <main class="main-body">
          <p class="intro-text">${safeText(data.summary)}</p>
          <section class="main-section">
            <h3 class="main-heading"><i class="bi bi-briefcase-fill"></i> Professional Experience</h3>
            ${expHTML}
          </section>
          <section class="main-section">
            <h3 class="main-heading"><i class="bi bi-mortarboard-fill"></i> Education</h3>
            <div class="job-entry">
              <p class="job-meta"><strong>${safeText(data.degree)}</strong></p>
              <p class="date-loc">${safeText(data.education)}</p>
            </div>
          </section>
          <section class="main-section">
            <h3 class="main-heading"><i class="bi bi-cursor-fill"></i> Interests</h3>
            <div class="interest-tags">
              ${interests.map((item) => `<span>${safeText(item)}</span>`).join("")}
            </div>
          </section>
        </main>
      </div>
    </div>`;
}

function generatePreview() {
  const selectedTemplate = localStorage.getItem("template") || "yassine";

  if (selectedTemplate === "sage") {
    renderSage();
  } else if (selectedTemplate === "sarah") {
    renderSarah();
  } else {
    renderYassine();
  }
}

function renderPro() {
  localStorage.setItem("template", "yassine");
  window.location.href = "myresume.html";
}

function renderMd() {
  localStorage.setItem("template", "sage");
  window.location.href = "myresume.html";
}

function renderCr() {
  localStorage.setItem("template", "sarah");
  window.location.href = "myresume.html";
}

function setActiveFilter(activeButton) {
  document.querySelectorAll(".btn-filter").forEach((button) => {
    button.classList.remove("active");
  });
  activeButton?.classList.add("active");
}

function filterTemplates(category = "all", activeButton = null) {
  const visibleCards = templateCards[category] || templateCards.all;

  templateCards.all.forEach((id) => {
    const card = document.getElementById(id);
    if (card) card.classList.toggle("d-none", !visibleCards.includes(id));
  });

  setActiveFilter(activeButton);
}

function showAll() {
  filterTemplates("all", document.querySelector('[data-filter="all"]'));
}

function showPro() {
  filterTemplates("professional", document.querySelector('[data-filter="professional"]'));
}

function showMd() {
  filterTemplates("modern", document.querySelector('[data-filter="modern"]'));
}

function showCr() {
  filterTemplates("creative", document.querySelector('[data-filter="creative"]'));
}

function bindTemplateFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      filterTemplates(button.dataset.filter, button);
    });
  });
}

function bindTemplateSelection() {
  document.querySelectorAll("[data-template-select]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem("template", button.dataset.templateSelect);
      window.location.href = "myresume.html";
    });
  });
}

function bindAuthTabs() {
  const authButtons = document.querySelectorAll("[data-auth-view]");
  if (!authButtons.length) return;

  authButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedView = button.dataset.authView;

      document.querySelectorAll(".auth-panel").forEach((panel) => {
        panel.classList.toggle("d-none", panel.dataset.panel !== selectedView);
      });

      authButtons.forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  document.querySelectorAll(".auth-panel form").forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });
}

function bindLivePreview() {
  const formPanel = document.querySelector(".input-panel");
  if (!formPanel || !document.getElementById("live-preview")) return;

  formPanel.addEventListener("input", generatePreview);
  formPanel.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      window.setTimeout(generatePreview, 0);
    }
  });
}

function bindBuilderActions() {
  const actionMap = {
    skill: addSkillField,
    experience: addExperienceField,
    certificate: addCertField,
    language: addLanguageField,
    preview: generatePreview,
  };

  document.querySelectorAll("[data-builder-action]").forEach((button) => {
    button.addEventListener("click", () => {
      actionMap[button.dataset.builderAction]?.();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  bindTemplateFilters();
  bindTemplateSelection();
  bindAuthTabs();
  bindBuilderActions();
  bindLivePreview();

  if (document.getElementById("live-preview")) {
    generatePreview();
  }
});
