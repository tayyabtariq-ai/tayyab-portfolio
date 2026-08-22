/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION - TAYYAB TARIQ (AI Automation Engineer)
 * ==============================================================================
 * Central location to update personal details, contact info, and social links.
 * Any updates here automatically reflect across the website and metadata.
 */

const PORTFOLIO_CONFIG = {
    // Basic Profile
    name: "Tayyab Tariq",
    jobTitle: "AI Automation Engineer",
    
    // Contact Information (Exact lowercase email)
    email: "getdentavoice@gmail.com",
    
    // Social Media Profiles
    linkedinUrl: "https://www.linkedin.com/in/tayyab-automation/",
    whatsappUrl: "https://wa.me/923097934907?text=Hi%20Tayyab%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20talk%20about%20automation%20for%20my%20clinic",
    instagramUrl: "https://www.instagram.com/tayyab.dentavoice/",
    
    // Canonical Website URL
    siteUrl: "https://tayyab-portfolio-bay.vercel.app/"
};

// Automatically apply configuration to the DOM on load
document.addEventListener("DOMContentLoaded", () => {
    // 1. Update Social Media Links
    const linkedinEl = document.getElementById("social-linkedin");
    if (linkedinEl) {
        if (PORTFOLIO_CONFIG.linkedinUrl) {
            linkedinEl.href = PORTFOLIO_CONFIG.linkedinUrl;
            linkedinEl.style.display = "inline-flex";
        } else {
            linkedinEl.style.display = "none";
        }
    }

    const whatsappEl = document.getElementById("social-whatsapp");
    if (whatsappEl) {
        if (PORTFOLIO_CONFIG.whatsappUrl) {
            whatsappEl.href = PORTFOLIO_CONFIG.whatsappUrl;
            whatsappEl.style.display = "inline-flex";
        } else {
            whatsappEl.style.display = "none";
        }
    }

    const instagramEl = document.getElementById("social-instagram");
    if (instagramEl) {
        if (PORTFOLIO_CONFIG.instagramUrl) {
            instagramEl.href = PORTFOLIO_CONFIG.instagramUrl;
            instagramEl.style.display = "inline-flex";
        } else {
            instagramEl.style.display = "none";
        }
    }

    // 2. Update Email Links & Texts
    const emailEls = document.querySelectorAll(".contact-email");
    emailEls.forEach(el => {
        el.href = `mailto:${PORTFOLIO_CONFIG.email}`;
        el.textContent = PORTFOLIO_CONFIG.email;
    });

    // 5. Wire every call-to-action to the WhatsApp conversation link
    const ctaLinks = document.querySelectorAll(".js-cta-whatsapp");
    ctaLinks.forEach(link => {
        if (PORTFOLIO_CONFIG.whatsappUrl) {
            link.href = PORTFOLIO_CONFIG.whatsappUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
    });

    // 6. Update Schema.org Structured Data
    const personScript = document.getElementById("schema-person");
    if (personScript) {
        try {
            const schemaData = JSON.parse(personScript.textContent);
            schemaData.name = PORTFOLIO_CONFIG.name;
            schemaData.jobTitle = PORTFOLIO_CONFIG.jobTitle;
            schemaData.email = PORTFOLIO_CONFIG.email;
            
            // Build sameAs array only with valid URLs
            const sameAsList = [];
            if (PORTFOLIO_CONFIG.linkedinUrl) sameAsList.push(PORTFOLIO_CONFIG.linkedinUrl);
            if (PORTFOLIO_CONFIG.instagramUrl) sameAsList.push(PORTFOLIO_CONFIG.instagramUrl);
            if (sameAsList.length > 0) {
                schemaData.sameAs = sameAsList;
            }

            
            personScript.textContent = JSON.stringify(schemaData, null, 2);
        } catch (e) {
            console.error("Could not update Schema.org data:", e);
        }
    }

    // 6b. Keep the ProfessionalService contactPoint on the configured WhatsApp URL
    const serviceScript = document.getElementById("schema-service");
    if (serviceScript) {
        try {
            const serviceData = JSON.parse(serviceScript.textContent);
            if (PORTFOLIO_CONFIG.whatsappUrl && serviceData.contactPoint) {
                serviceData.contactPoint.url = PORTFOLIO_CONFIG.whatsappUrl;
            }
            if (PORTFOLIO_CONFIG.siteUrl) {
                serviceData.url = PORTFOLIO_CONFIG.siteUrl;
            }
            serviceScript.textContent = JSON.stringify(serviceData, null, 2);
        } catch (e) {
            console.error("Could not update ProfessionalService data:", e);
        }
    }

    // 7. Project Modal Logic
    const projectsData = {
        "dental-clinic": {
            title: "Dental Clinic Appointment Automation",
            type: "AI Automation • Appointment Booking",
            overview: "An automated system for dental clinics that handles appointment scheduling, reminders, and follow-ups without human intervention.",
            problem: "Dental clinics spend too much time on manual phone tag for scheduling and suffer from high no-show rates.",
            solution: "Built a fully integrated appointment automation workflow that syncs calendars, sends SMS reminders, and manages rescheduling.",
            features: [
                "Automated calendar syncing",
                "Smart SMS/WhatsApp reminders",
                "Self-serve rescheduling link",
                "Post-appointment review requests"
            ],
            workflow: "Patient requests slot -> AI checks calendar -> Books slot -> Triggers automated confirmation & reminders sequence.",
            tech: ["n8n", "Google Calendar API", "Twilio / WhatsApp API", "GoHighLevel"],
            value: "Decreases no-show rates by up to 35% and frees up clinic staff to focus on in-person patient care."
        },
        "lead-system": {
            title: "AI Lead Qualification System",
            type: "AI Agent • Lead Automation",
            overview: "An intelligent chatbot and webhook system that engages inbound leads, qualifies them based on business criteria, and routes hot leads to sales.",
            problem: "Sales teams waste time talking to unqualified leads while hot leads go cold waiting for a response.",
            solution: "Created an automated conversational funnel that engages leads instantly and scores them based on their answers.",
            features: [
                "Instant lead engagement",
                "Dynamic qualification questioning",
                "Automated lead scoring",
                "Instant notifications for hot leads"
            ],
            workflow: "Lead fills form/messages -> AI engages -> Asks qualifying questions -> Scores lead -> Pushes to CRM -> Alerts sales team.",
            tech: ["n8n", "OpenAI", "HubSpot / Pipedrive", "Slack API"],
            value: "Improves lead response time from hours to seconds and increases sales team efficiency by filtering out 40% of unqualified prospects."
        },
        "support-agent": {
            title: "AI Customer Support Agent",
            type: "AI Agent • Customer Support Automation",
            overview: "An AI-powered customer support agent designed to answer common customer questions, handle repetitive support requests, and route conversations when human assistance is required.",
            problem: "Support teams are overwhelmed with repetitive FAQs, leading to slow response times for complex issues.",
            solution: "Deployed a knowledge-based AI agent that resolves tier-1 support tickets instantly and escalates complex issues seamlessly.",
            features: [
                "Knowledge base semantic search",
                "Multi-channel support (Web, WhatsApp)",
                "Human handoff capabilities",
                "Sentiment analysis"
            ],
            workflow: "Customer asks question -> AI searches knowledge base -> Provides answer -> If unresolved, creates ticket and tags human agent.",
            tech: ["Voiceflow / Botpress", "OpenAI Embeddings", "Zendesk API", "n8n"],
            value: "Resolves 60% of common support tickets instantly, improving customer satisfaction scores and reducing support costs."
        }
    };

    const modal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const workCards = document.querySelectorAll(".work-card");

    if (modal && modalClose && workCards.length > 0) {
        workCards.forEach(card => {
            // The video fills the top of the card, so the details row below it
            // is the modal trigger. Clicks inside the iframe belong to YouTube.
            const trigger = card.querySelector(".work-details");
            if (!trigger) return;

            trigger.setAttribute("role", "button");
            trigger.setAttribute("tabindex", "0");
            trigger.setAttribute("aria-haspopup", "dialog");

            const openProject = () => {
                const projectId = card.getAttribute("data-project-id");
                const data = projectsData[projectId];
                
                if (data) {
                    document.getElementById("modal-title").textContent = data.title;
                    document.getElementById("modal-type").textContent = data.type;
                    document.getElementById("modal-overview").textContent = data.overview;
                    document.getElementById("modal-problem").textContent = data.problem;
                    document.getElementById("modal-solution").textContent = data.solution;
                    
                    const featuresList = document.getElementById("modal-features");
                    featuresList.innerHTML = "";
                    data.features.forEach(f => {
                        const li = document.createElement("li");
                        li.textContent = f;
                        featuresList.appendChild(li);
                    });
                    
                    document.getElementById("modal-workflow").textContent = data.workflow;
                    
                    const techStack = document.getElementById("modal-tech");
                    techStack.innerHTML = "";
                    data.tech.forEach(t => {
                        const div = document.createElement("div");
                        div.className = "tech-tag";
                        div.textContent = t;
                        techStack.appendChild(div);
                    });
                    
                    document.getElementById("modal-value").textContent = data.value;
                    
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden"; // Prevent background scrolling
                }
            };

            trigger.addEventListener("click", openProject);
            trigger.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject();
                }
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        };

        modalClose.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
