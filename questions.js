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
export default ASSESSMENT_CONFIG;
