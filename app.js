
function addSkillField() {
    const container = document.getElementById("skills-container");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "custom-input mb-2 skill-input";
    input.placeholder = "e.g. Lead Generation";
    container.appendChild(input);
}
function addCertField() {
    const container = document.getElementById("cert-container");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "custom-input mb-2 cert-input";
    input.placeholder = "Certification Name";
    container.appendChild(input);
}

function addExperienceField() {
    const container = document.getElementById("experience-container");
    const div = document.createElement("div");
    div.className = "card p-3 mb-3 bg-light border-0 shadow-sm exp-block";
    div.innerHTML = `
        <input type="text" class="custom-input mb-2 exp-role" placeholder="Job Role">
        <input type="text" class="custom-input mb-2 exp-company" placeholder="Company">
        <input type="text" class="custom-input mb-2 exp-date" placeholder="Date & Location">
        <textarea class="custom-input exp-desc" rows="3" placeholder="Key responsibilities"></textarea>
    `;
    container.appendChild(div);
}
function addLanguageField() {
    const container = document.getElementById("languages-container");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "custom-input mb-2 lang-input";
    input.placeholder = "e.g. English (Fluent)";
    container.appendChild(input);
}
function getFormData() {
const certInputs = document.querySelectorAll(".cert-input");
let certsArr = [];
certInputs.forEach(input => { if(input.value) certsArr.push(input.value); });
    const skillInputs = document.querySelectorAll(".skill-input");
    let skillsArr = [];
    skillInputs.forEach(input => { if(input.value) skillsArr.push(input.value); });

    
    const expBlocks = document.querySelectorAll(".exp-block");
    let expArr = [];
    expBlocks.forEach(block => {
        expArr.push({
            role: block.querySelector(".exp-role").value || "Job Role",
            company: block.querySelector(".exp-company").value || "Company Name",
            date: block.querySelector(".exp-date").value || "Date | Location",
            desc: block.querySelector(".exp-desc").value || ""
        });
    });


    const langInputs = document.querySelectorAll(".lang-input");
    let langsArr = [];
    langInputs.forEach(input => { if(input.value) langsArr.push(input.value); });

    return {
        name: document.getElementById("input-name").value || "Full Name",
        title: document.getElementById("input-title").value || "Job Title",
        linkedin: document.getElementById("input-linkedin").value || "linkedin.com/in/username",
        email: document.getElementById("input-email").value || "email@example.com",
        phone: document.getElementById("input-phone").value || "+216 00 000 000",
        location: document.getElementById("input-location").value || "City, Country",
        summary: document.getElementById("input-summary").value || "Professional summary...",
        skills: skillsArr,
        experience: expArr,
        languages: langsArr,
        certificates: certsArr 
    };
}
function renderYassine() {
    const data = getFormData();


    const skillsHTML = data.skills.length > 0 
        ? data.skills.map(s => `<li>${s}</li>`).join('') 
        : '<li>Skill not specified</li>';


    const langsHTML = data.languages.length > 0 
        ? data.languages.map(l => `<div class="lang-box"><strong>${l}</strong></div>`).join('') 
        : '<div class="lang-box">Not specified</div>';


    const expHTML = data.experience.length > 0 
        ? data.experience.map(e => `
            <div class="exp-item">
                <div class="exp-head"><strong>${e.role}</strong>, <span>${e.company}</span></div>
                <div class="exp-date">${e.date}</div>
                <ul class="exp-bullets">
                    ${e.desc.split('\n').map(bullet => bullet.trim() ? `<li>${bullet}</li>` : '').join('')}
                </ul>
            </div>
        `).join('') 
        : '<p>Add your work experience...</p>';

    const certsHTML = data.certificates && data.certificates.length > 0 
        ? data.certificates.map(c => `<li>${c}</li>`).join('') 
        : '<li>No certificates added yet</li>';
    document.getElementById("live-preview").innerHTML = `
    <div class="template-yassine">
        <div class="resume-container">
            <aside class="sidebar">
                <div class="header-section">
                    <h1 class="name">${data.name}</h1>
                    <p class="title">${data.title}</p>
                </div>

                <div class="contact-list">
                    <div class="contact-item"><i class="bi bi-linkedin"></i> ${data.linkedin}</div>
                    <div class="contact-item"><i class="bi bi-envelope"></i> ${data.email}</div>
                    <div class="contact-item"><i class="bi bi-telephone"></i> ${data.phone}</div>
                    <div class="contact-item"><i class="bi bi-geo-alt"></i> ${data.location}</div>
                </div>

                <section class="side-block">
                    <h3 class="side-label">Summary</h3>
                    <p class="text-white">${data.summary}</p>
                </section>

                <section class="side-block">
                    <h3 class="side-label">Skills</h3>
                    <ul class="side-list">
                        ${skillsHTML}
                    </ul>
                </section>

                <section class="side-block">
                    <h3 class="side-label">Languages</h3>
                    ${langsHTML}
                </section>
            </aside>

            <main class="main-content">
                <section class="main-section">
                    <h3 class="main-label">Professional Experience</h3>
                    ${expHTML}
                </section>

                <section class="main-section">
                    <h3 class="main-label">Education</h3>
                    <div class="edu-item">
                        <strong>Master's Degree in Marketing</strong>, <span>Tunis Business School</span>
                        <div class="exp-date">2015 — 2017 | Tunis, Tunisia</div>
                    </div>
                </section>

                <section class="main-section">
                    <h3 class="main-label">Certificates</h3>
                    <ul class="cert-list">
                        ${certsHTML}
                    </ul>
                </section>
            </main>
        </div>
    </div>`;
}
function renderSage() {
    const data = getFormData();
    document.getElementById("live-preview").innerHTML = `
    <div class="template-sage">
        <div class="resume-card">
            <header class="sage-header">
                <div class="identity">
                    <h1>${data.name}</h1>
                    <p class="subtitle">${data.title}</p>
                    <div class="contact-info">
                        <span><i class="bi bi-envelope"></i> ${data.email}</span>
                        <span><i class="bi bi-geo-alt"></i> ${data.location}</span>
                        <span><i class="bi bi-telephone"></i> ${data.phone}</span>
                    </div>
                </div>
            </header>
            <div class="sage-content">
                <section class="sage-section">
                    <h3 class="sage-label"><i class="bi bi-person-vcard"></i> Profile</h3>
                    <p>${data.summary}</p>
                </section>
                <section class="sage-section">
                    <h3 class="sage-label"><i class="bi bi-cpu"></i> Skills</h3>
                    <p>${data.skill}</p>
                </section>
            </div>
        </div>
    </div>`;
}
function renderSarah() {
    const data = getFormData();
    document.getElementById("live-preview").innerHTML = `
    <div class="template-sarah">
        <div class="resume-wrapper">
            <aside class="sidebar">
                <h1 class="name-logo">${data.name.split(' ').join('<br>')}</h1>
                <p class="role-title">${data.title}</p>
                <div class="contact-details">
                    <p><i class="bi bi-geo-alt-fill"></i> ${data.location}</p>
                    <p><i class="bi bi-telephone-fill"></i> ${data.phone}</p>
                    <p><i class="bi bi-envelope-fill"></i> ${data.email}</p>
                </div>
                <div class="side-section">
                    <h3 class="side-heading">Skills</h3>
                    <div class="skill-item"><span>${data.skill}</span><div class="progress"><div class="bar" style="width: 90%;"></div></div></div>
                </div>
            </aside>
            <main class="main-body">
                <p class="intro-text text-white">${data.summary}</p>
                <section class="main-section">
                    <h3 class="main-heading">Professional Experience</h3>
                    <div class="job-entry"><p class="text-white">Experience details go here...</p></div>
                </section>
            </main>
        </div>
    </div>`;
}
function generatePreview() {
    const selectedTemplate = localStorage.getItem("template");

    if (selectedTemplate === "sage") {
        renderSage();
    } else if (selectedTemplate === "sarah") {
        renderSarah();
    } else {
        renderYassine();
    }
}


function renderPro(){
    localStorage.setItem("template", "yassine");
    window.location.href = "myresume.html";
}

function renderMd(){
    localStorage.setItem("template", "sage");
    window.location.href = "myresume.html";
}

function renderCr(){
    localStorage.setItem("template", "sarah");
    window.location.href = "myresume.html";
}
// function livePreview() {
//   var inputName = document.getElementById("input-name").value;
//   var jobTilte = document.getElementById("input-title").value;
//   var inputLinked = document.getElementById("input-linkedin").value;
//   var inpuEmail = document.getElementById("input-email").value;
//   var inputPhone = document.getElementById("input-phone").value;
//   var inputLocation = document.getElementById("input-location").value;
//   var inputSummary = document.getElementById("input-summary").value;

//   document.getElementById("live-preview").innerHTML = `
// <div class="template-yassine">
//     <div class="resume-container">
//         <aside class="sidebar">
//             <div class="header-section">
//                 <h1 class="name">${inputName}</h1>
//                 <p class="title">${jobTilte}</p>
//             </div>

//             <div class="contact-list">
//                 <div class="contact-item"><i class="bi bi-linkedin"></i>${inputLinked}</div>
//                 <div class="contact-item"><i class="bi bi-envelope"></i>${inpuEmail}</div>
//                 <div class="contact-item"><i class="bi bi-telephone"></i>${inputPhone}</div>
//                 <div class="contact-item"><i class="bi bi-geo-alt"></i>${inputLocation}</div>
//             </div>

//             <section class="side-block">
//                 <h3 class="side-label">Summary</h3>
//                 <p class="text-white">${inputSummary}</p>
//             </section>

//             <section class="side-block">
//                 <h3 class="side-label">Skills</h3>
//                 <ul class="side-list">
//                     <li>${inputSkills}</li>
//                     <li>Lead Generation</li>
//                     <li>Negotiation</li>
//                     <li>CRM Management</li>
//                     <li>Sales Forecasting</li>
//                     <li>Client Retention</li>
//                     <li>Pipeline Development</li>
//                 </ul>
//             </section>

//             <section class="side-block">
//                 <h3 class="side-label">Languages</h3>
//                 <div class="lang-box"><strong>Arabic</strong><br>Native</div>
//                 <div class="lang-box"><strong>French</strong><br>Fluent</div>
//                 <div class="lang-box"><strong>English</strong><br>Proficient</div>
//             </section>
//         </aside>

//         <main class="main-content">
//             <section class="main-section">
//                 <h3 class="main-label">Professional Experience</h3>
                
//                 <div class="exp-item">
//                     <div class="exp-head">
//                         <strong>Sales Manager</strong>, <span>Tunisie Connect</span>
//                     </div>
//                     <div class="exp-date">January 2022 — Present | Tunis, Tunisia</div>
//                     <ul class="exp-bullets">
//                         <li>Manage a portfolio of key business accounts across the Tunis region.</li>
//                         <li>Lead quarterly sales planning and improved team conversion rates by 18%.</li>
//                         <li>Deliver tailored proposals and contract renewals for SME and enterprise clients.</li>
//                     </ul>
//                 </div>
//                 <div class="exp-item">
//                     <div class="exp-head">
//                         <strong>Sales Manager</strong>, <span>Tunisie Connect</span>
//                     </div>
//                     <div class="exp-date">January 2022 — Present | Tunis, Tunisia</div>
//                     <ul class="exp-bullets">
//                         <li>Manage a portfolio of key business accounts across the Tunis region.</li>
//                         <li>Lead quarterly sales planning and improved team conversion rates by 18%.</li>
//                         <li>Deliver tailored proposals and contract renewals for SME and enterprise clients.</li>
//                     </ul>
//                 </div>

//                 <div class="exp-item">
//                     <div class="exp-head">
//                         <strong>Senior Sales Executive</strong>, <span>Maghreb Business Solutions</span>
//                     </div>
//                     <div class="exp-date">March 2019 — December 2021 | Tunis, Tunisia</div>
//                     <ul class="exp-bullets">
//                         <li>Owned full sales cycle from prospecting to negotiation and closing.</li>
//                         <li>Increased monthly new client acquisition through structured outbound campaigns.</li>
//                     </ul>
//                 </div>
//                 <div class="exp-item">
//                     <div class="exp-head">
//                         <strong>Senior Sales Executive</strong>, <span>Maghreb Business Solutions</span>
//                     </div>
//                     <div class="exp-date">March 2019 — December 2021 | Tunis, Tunisia</div>
//                     <ul class="exp-bullets">
//                         <li>Owned full sales cycle from prospecting to negotiation and closing.</li>
//                         <li>Increased monthly new client acquisition through structured outbound campaigns.</li>
//                     </ul>
//                 </div>
//             </section>

//             <section class="main-section">
//                 <h3 class="main-label">Education</h3>
//                 <div class="edu-item">
//                     <strong>Master's Degree in Marketing and Commercial Management</strong>, <span>Tunis Business School</span>
//                     <div class="exp-date">2015 — 2017 | Tunis, Tunisia</div>
//                 </div>
//             </section>

//             <section class="main-section">
//                 <h3 class="main-label">Certificates</h3>
//                 <ul class="cert-list">
//                     <li>Certified Professional Sales Person (CPSP)</li>
//                     <li>HubSpot Sales Software Certification</li>
//                     <li>Google Digital Sales Certification</li>
//                 </ul>
//             </section>
//         </main>
//     </div>
// </div>
// `;
// }

// skiils field

// function addSkillField() {
//   var inputSkill = document.getElementById("input-skill").value;
//   inputSkills = inputSkill;
//   for (var i = 0; i < inputSkills.length; i++) {
//     console.log(inputSkills[i]);
//     <li>${inputSkills}</li>;
//   }

//   console.log(inputSkill);
// }
function showAll() {
  document.getElementById("card1").style.display = "block";
  document.getElementById("card2").style.display = "block";
  document.getElementById("card3").style.display = "block";
}
function showPro() {
  document.getElementById("card1").style.display = "block";
  document.getElementById("card2").style.display = "none";
  document.getElementById("card3").style.display = "none";
}
function showMd() {
  document.getElementById("card1").style.display = "none";
  document.getElementById("card2").style.display = "block";
  document.getElementById("card3").style.display = "none";
}
function showCr() {
  document.getElementById("card1").style.display = "none";
  document.getElementById("card2").style.display = "none";
  document.getElementById("card3").style.display = "block";
}
