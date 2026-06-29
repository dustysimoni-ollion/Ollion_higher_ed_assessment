// index.js - Diagnostic Wizard Logic & Gating

const ASSESSMENT_CONFIG = {
  pillars: [
    {
      id: "integration",
      title: "Pillar 1: Data Integration & Silos",
      shortTitle: "Data Integration",
      description: "Evaluate how effectively your core campus systems communicate without manual human intervention.",
      options: [
        {
          level: 1,
          score: 1,
          label: "Level 1 (Manual)",
          text: "Student records, financial aid, and learning metrics live in completely isolated departmental databases. Pulling comprehensive institutional reports requires massive CSV extraction and manual spreadsheet juggling.",
          leakageDetails: "High administrative friction; slow data turnaround for enrollment and retention decisions."
        },
        {
          level: 2,
          score: 2,
          label: "Level 2 (Hybrid)",
          text: "Basic, nightly batch scripts move data between systems (e.g., LMS to SIS), but real-time data sync doesn't exist. System errors regularly require manual IT troubleshooting and data cleansing.",
          leakageDetails: "Moderate IT overhead; overnight lag delays critical student intervention triggers."
        },
        {
          level: 3,
          score: 3,
          label: "Level 3 (Optimized)",
          text: "Secure, modern data pipelines automatically stream campus information into a centralized, cloud-native data warehouse. Core administrative systems communicate seamlessly via secure APIs.",
          leakageDetails: "Minimizes errors, unlocks real-time operational dashboarding."
        }
      ]
    },
    {
      id: "compliance",
      title: "Pillar 2: Compliance & Reporting Efficiency",
      shortTitle: "Compliance & Reporting",
      description: "Measure the true operational and administrative toll that regular compliance cycles take on your institutional research teams.",
      options: [
        {
          level: 1,
          score: 1,
          label: "Level 1 (Manual)",
          text: "Standard compliance cycles—like annual IPEDS reporting—act as an absolute operational bottleneck. Staff routinely spend upwards of 300 to 400 hours per cycle manually validating data fields.",
          leakageDetails: "High administrative drain: 400+ hours spent manually validating data fields."
        },
        {
          level: 2,
          score: 2,
          label: "Level 2 (Hybrid)",
          text: "Data collection scripts are partially automated, but institutional research teams still spend significant time manually formatting data to comply with varying federal and state reporting rubrics.",
          leakageDetails: "Partial automation still leaves staff spending weeks validating and restructuring data."
        },
        {
          level: 3,
          score: 3,
          label: "Level 3 (Optimized)",
          text: "Compliance generation acts as an automated background process. Your unified cloud data warehouse allows for 'one-click' compliance verification, winning back weeks of administrative time.",
          leakageDetails: "Automated verification wins back weeks of valuable administrative effort."
        }
      ]
    },
    {
      id: "ai_readiness",
      title: "Pillar 3: AI Readiness & Governance",
      shortTitle: "AI & Governance",
      description: "Assess your campus's structural readiness to securely scale artificial intelligence tools without risking compliance or IP leakage.",
      options: [
        {
          level: 1,
          score: 1,
          label: "Level 1 (Manual)",
          text: "Students and faculty are actively experimenting with public generative AI tools on campus networks, creating massive data privacy, shadow-IT, and FERPA compliance risks.",
          leakageDetails: "High security exposure; imminent risk of FERPA violations and intellectual property leakage."
        },
        {
          level: 2,
          score: 2,
          label: "Level 2 (Hybrid)",
          text: "The institution has implemented loose campus policies restricting AI use or has deployed standalone, generic chatbots. However, there is no secure, institutional AI data boundary.",
          leakageDetails: "Shadow AI risk persists due to lack of standard, private enterprise boundaries."
        },
        {
          level: 3,
          score: 3,
          label: "Level 3 (Optimized)",
          text: "A secure, private Agentic AI Infrastructure is deployed. Autonomous software agents are hard-fenced to retrieve data strictly from secure, internal university data boundaries, safely automating complex advising and workflows.",
          leakageDetails: "Fenced data boundaries securely enable advanced agentic automation workflows."
        }
      ]
    },
    {
      id: "finops",
      title: "Pillar 4: Cloud Economics & FinOps Governance",
      shortTitle: "Cloud Economics & FinOps",
      description: "Examine how tightly your institution monitors and manages its multi-cloud operational footprint.",
      options: [
        {
          level: 1,
          score: 1,
          label: "Level 1 (Manual)",
          text: "The rapid pivot to hybrid and online learning led to rapid cloud adoption across various departments. Cloud bills are paid centrally with zero granular visibility into idle environments or orphaned resources.",
          leakageDetails: "Severe financial waste; zero visibility into orphaned workloads or developer environments."
        },
        {
          level: 2,
          score: 2,
          label: "Level 2 (Hybrid)",
          text: "IT reviews cloud infrastructure spending quarterly, but the university lacks corporate-style automation to instantly right-size servers, scale down environments during summer breaks, or track departmental cost allocation.",
          leakageDetails: "Inefficient scheduling; 15% - 30% of cloud resources run idle over weekends and breaks."
        },
        {
          level: 3,
          score: 3,
          label: "Level 3 (Optimized)",
          text: "A continuous Cloud Economics (FinOps) framework is actively utilized. Automated resource scheduling, rightsizing policies, and live cost anomalies dashboards ensure zero wasted infrastructure capital.",
          leakageDetails: "Dynamic right-sizing and scheduled shut-offs eliminate infrastructure waste."
        }
      ]
    }
  ],
  cloudSpend: {
    title: "Additional Context: Estimated Annual Cloud Spend",
    description: "Help us calibrate your cloud leakage and opportunities by providing a rough estimate of your annual cloud budget (AWS, Azure, GCP).",
    options: [
      { id: "under_250k", text: "Under $250,000", minWaste: 37500, maxWaste: 75000, displayRange: "$37,500 - $75,000" },
      { id: "250k_1m", text: "$250,000 - $1,000,000", minWaste: 75000, maxWaste: 300000, displayRange: "$75,000 - $300,000" },
      { id: "1m_5m", text: "$1,000,000 - $5,000,000", minWaste: 300000, maxWaste: 1500000, displayRange: "$300,000 - $1,500,000" },
      { id: "over_5m", text: "Over $5,000,000", minWaste: 1500000, maxWaste: 2500000, displayRange: "$1.5M - $2.5M+" }
    ]
  },
  maturityTiers: {
    siloed: {
      range: [4, 6],
      name: "Siloed & Reactive",
      class: "tier-siloed",
      desc: "Heavy administrative drag, high risk of FERPA compliance exposure, and major budgetary cost leakage inside unchecked cloud environments."
    },
    transitioning: {
      range: [7, 10],
      name: "Transitioning",
      class: "tier-transitioning",
      desc: "Functional digital foundations exist, but your highly skilled IT and data teams are still stuck 'keeping the lights on' via manual data maintenance."
    },
    modernized: {
      range: [11, 12],
      name: "The Modernized Campus",
      class: "tier-modernized",
      desc: "Tech-agnostic data foundations are locked in. The institution is primed to use automated agentic AI to drive student retention and operational efficiency."
    }
  }
};

let currentScreen = 0;
const totalScreens = ASSESSMENT_CONFIG.pillars.length + 1; // 4 pillars + 1 Cloud Spend screen
const userSelections = {};

document.addEventListener("DOMContentLoaded", () => {
  initWizard();
  setupNavigation();
  setupFormSubmission();
});

function initWizard() {
  const wizardContainer = document.getElementById("wizard-screens");
  wizardContainer.innerHTML = "";

  // Render 4 Pillars Screens
  ASSESSMENT_CONFIG.pillars.forEach((pillar, pIdx) => {
    const screen = document.createElement("div");
    screen.className = `wizard-screen ${pIdx === 0 ? "active" : ""}`;
    screen.id = `screen-pillar-${pIdx}`;
    
    screen.innerHTML = `
      <h2>${pillar.title}</h2>
      <p class="screen-subtitle">${pillar.description}</p>
      <div class="options-list">
        ${pillar.options.map(option => `
          <label class="option-card" data-pillar="${pillar.id}" data-score="${option.score}">
            <input type="radio" name="${pillar.id}" value="${option.score}">
            <div class="custom-radio"></div>
            <div class="option-content">
              <span class="option-label">${option.label}</span>
              <span class="option-text">${option.text}</span>
            </div>
          </label>
        `).join("")}
      </div>
    `;
    wizardContainer.appendChild(screen);
  });

  // Render Cloud Spend Screen
  const spendScreen = document.createElement("div");
  spendScreen.className = "wizard-screen";
  spendScreen.id = `screen-spend`;
  spendScreen.innerHTML = `
    <h2>${ASSESSMENT_CONFIG.cloudSpend.title}</h2>
    <p class="screen-subtitle">${ASSESSMENT_CONFIG.cloudSpend.description}</p>
    <div class="options-list">
      ${ASSESSMENT_CONFIG.cloudSpend.options.map(option => `
        <label class="option-card" data-spend-id="${option.id}">
          <input type="radio" name="cloud_spend" value="${option.id}">
          <div class="custom-radio"></div>
          <div class="option-content">
            <span class="option-label">${option.text}</span>
            <span class="option-text">Calibrate estimated infrastructure savings based on this tier.</span>
          </div>
        </label>
      `).join("")}
    </div>
  `;
  wizardContainer.appendChild(spendScreen);

  // Setup click listeners for radio option cards
  const cards = document.querySelectorAll(".option-card");
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      const radio = card.querySelector('input[type="radio"]');
      radio.checked = true;
      
      // Update selected class
      const name = radio.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
        r.closest(".option-card").classList.remove("selected");
      });
      card.classList.add("selected");

      // Save selection
      if (card.dataset.pillar) {
        userSelections[card.dataset.pillar] = parseInt(card.dataset.score);
      } else if (card.dataset.spendId) {
        userSelections["cloud_spend"] = card.dataset.spendId;
      }

      enableNextButton();
    });
  });

  updateProgress();
}

function setupNavigation() {
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  btnPrev.addEventListener("click", () => {
    if (currentScreen > 0) {
      changeScreen(currentScreen - 1);
    }
  });

  btnNext.addEventListener("click", () => {
    if (btnNext.disabled) return;
    
    if (currentScreen < totalScreens - 1) {
      changeScreen(currentScreen + 1);
    } else {
      // Finished questions, trigger lead capture gating flow
      showCalculatingState();
    }
  });
}

function changeScreen(index) {
  const screens = document.querySelectorAll(".wizard-screen");
  screens[currentScreen].classList.remove("active");
  screens[index].classList.add("active");
  currentScreen = index;

  updateProgress();
  enableNextButton();
}

function updateProgress() {
  // Update bar
  const pct = ((currentScreen) / totalScreens) * 100;
  document.getElementById("progress-bar").style.width = `${pct}%`;

  // Update labels
  const steps = document.querySelectorAll(".progress-step");
  steps.forEach((step, idx) => {
    if (idx <= currentScreen) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // Prev button state
  const btnPrev = document.getElementById("btn-prev");
  if (currentScreen === 0) {
    btnPrev.style.visibility = "hidden";
  } else {
    btnPrev.style.visibility = "visible";
  }
}

function enableNextButton() {
  const btnNext = document.getElementById("btn-next");
  let completed = false;

  if (currentScreen < totalScreens - 1) {
    const currentPillarId = ASSESSMENT_CONFIG.pillars[currentScreen].id;
    completed = !!userSelections[currentPillarId];
  } else {
    completed = !!userSelections["cloud_spend"];
  }

  btnNext.disabled = !completed;
}

function showCalculatingState() {
  const wizardCard = document.getElementById("wizard-card-body");
  const wizardNav = document.getElementById("wizard-nav");
  const calcState = document.getElementById("calculating-state");
  
  wizardCard.style.display = "none";
  wizardNav.style.display = "none";
  calcState.style.display = "flex";

  // Simulate calculating results
  setTimeout(() => {
    calcState.style.display = "none";
    showLeadForm();
  }, 1500);
}

function showLeadForm() {
  const formScreen = document.getElementById("lead-gate-screen");
  formScreen.style.display = "flex";
}

function setupFormSubmission() {
  const form = document.getElementById("lead-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting Assessment...";

    const formData = {
      firstname: document.getElementById("first-name").value,
      lastname: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      company: document.getElementById("institution").value,
      jobtitle: document.getElementById("job-title").value,
      // Pass diagnostic values
      integration_score: userSelections["integration"],
      compliance_score: userSelections["compliance"],
      ai_readiness_score: userSelections["ai_readiness"],
      finops_score: userSelections["finops"],
      cloud_spend_tier: userSelections["cloud_spend"]
    };

    // HubSpot Forms background POST configuration
    // The sharing link provided: https://qetbq.share.hsforms.com/2x8O8mHzWS0qo7dMakNgcZg
    // To implement background post, replace with the proper portal and form IDs:
    const PORTAL_ID = "YOUR_HUBSPOT_PORTAL_ID"; 
    const FORM_ID = "YOUR_HUBSPOT_FORM_ID";
    const hsEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

    console.log("Submitting diagnostic lead data to CRM", formData);

    // Make API request (Fallback gracefully on mock/local environments)
    fetch(hsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: formData.firstname },
          { name: "lastname", value: formData.lastname },
          { name: "email", value: formData.email },
          { name: "company", value: formData.company },
          { name: "jobtitle", value: formData.jobtitle },
          { name: "diagnostic_score", value: String(calculateTotalScore()) }
        ]
      })
    })
    .catch(err => {
      console.warn("HubSpot endpoint mock submission completed locally.", err);
    })
    .finally(() => {
      // Transition to results dashboard regardless of endpoint configuration
      document.getElementById("diagnostic-app").style.display = "none";
      renderResults();
    });
  });
}

function calculateTotalScore() {
  return (
    (userSelections["integration"] || 0) +
    (userSelections["compliance"] || 0) +
    (userSelections["ai_readiness"] || 0) +
    (userSelections["finops"] || 0)
  );
}

function getMaturityTier(score) {
  if (score >= 4 && score <= 6) return ASSESSMENT_CONFIG.maturityTiers.siloed;
  if (score >= 7 && score <= 10) return ASSESSMENT_CONFIG.maturityTiers.transitioning;
  return ASSESSMENT_CONFIG.maturityTiers.modernized;
}

function renderResults() {
  const totalScore = calculateTotalScore();
  const tier = getMaturityTier(totalScore);
  const cloudTier = ASSESSMENT_CONFIG.cloudSpend.options.find(o => o.id === userSelections["cloud_spend"]);
  
  // Set values
  document.getElementById("score-number").textContent = `${totalScore} / 12`;
  
  const badge = document.getElementById("results-tier-badge");
  badge.textContent = tier.name;
  badge.className = `badge-tier ${tier.class}`;
  
  document.getElementById("results-tier-desc").textContent = tier.desc;

  // Cloud savings display calibration based on FinOps selection
  const finopsVal = userSelections["finops"] || 1;
  const savingsDisplayEl = document.getElementById("estimated-leakage-stat");
  const savingsTextEl = document.getElementById("estimated-leakage-desc");

  if (finopsVal === 3) {
    savingsDisplayEl.textContent = "Optimized";
    savingsDisplayEl.style.color = "var(--color-success)";
    savingsTextEl.textContent = "Your active FinOps controls are successfully avoiding cloud waste.";
  } else {
    savingsDisplayEl.textContent = cloudTier.displayRange;
    savingsDisplayEl.style.color = "var(--color-warning)";
    savingsTextEl.textContent = `Estimated annual infrastructure waste (15% - 30%) due to unoptimized systems.`;
  }

  // Compliance hours display calibration
  const complianceVal = userSelections["compliance"] || 1;
  const complianceDisplayEl = document.getElementById("estimated-compliance-stat");
  const complianceTextEl = document.getElementById("estimated-compliance-desc");

  if (complianceVal === 1) {
    complianceDisplayEl.textContent = "300 - 400 Hrs";
    complianceTextEl.textContent = "Spent annually on manual data formatting and IPEDS compliance validation.";
  } else if (complianceVal === 2) {
    complianceDisplayEl.textContent = "120 - 200 Hrs";
    complianceTextEl.textContent = "Partial script automation still leaves significant manual formatting effort.";
  } else {
    complianceDisplayEl.textContent = "Automated";
    complianceDisplayEl.style.color = "var(--color-success)";
    complianceTextEl.textContent = "One-click compliance generation acts as an automated background process.";
  }

  // Display results dashboard
  document.getElementById("results-dashboard").style.display = "block";
  document.getElementById("results-dashboard").scrollIntoView({ behavior: "smooth" });
}
