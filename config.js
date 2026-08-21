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
    
    // Contact Numbers (International Format)
    // Note: If a phone number is empty string "", it will NOT be displayed on the website.
    phonePakistan: "+923284234241", // Pakistan Contact Number (+92 328 4234241)
    phoneUSA: "",                   // USA Contact Number (Keep empty/unset until available)
    
    // Social Media Profiles
    linkedinUrl: "https://www.linkedin.com/in/tayyab-automation/",
    whatsappUrl: "https://wa.me/923284234241",
    instagramUrl: "https://www.instagram.com/tayyab.dentavoice/",
    
    // Booking & Action Links
    bookingUrl: "#footer", // Can be updated to a Calendly/booking link or left as #footer
    
    // Canonical Website URL
    siteUrl: "https://tayyab-automation.com/"
};

// Function to format phone number for display
function formatPhoneNumber(phone) {
    if (!phone) return "";
    // Clean string
    const cleaned = phone.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+92") && cleaned.length === 13) {
        // Format: +92 328 4234241
        return `+92 ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    if (cleaned.startsWith("+1") && cleaned.length === 12) {
        // Format: +1 (XXX) XXX-XXXX
        return `+1 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    return phone;
}

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

    // 3. Update Pakistan Phone Number
    const pkPhoneContainer = document.getElementById("phone-pk-container");
    const pkPhoneLink = document.getElementById("phone-pk-link");
    const pkPhoneText = document.getElementById("phone-pk-text");
    if (pkPhoneContainer && pkPhoneLink) {
        if (PORTFOLIO_CONFIG.phonePakistan && PORTFOLIO_CONFIG.phonePakistan.trim() !== "") {
            pkPhoneLink.href = `tel:${PORTFOLIO_CONFIG.phonePakistan.replace(/[^\d+]/g, "")}`;
            if (pkPhoneText) {
                pkPhoneText.textContent = formatPhoneNumber(PORTFOLIO_CONFIG.phonePakistan);
            }
            pkPhoneContainer.style.display = "flex";
        } else {
            pkPhoneContainer.style.display = "none";
        }
    }

    // 4. Update USA Phone Number (Hidden when empty/unset)
    const usPhoneContainer = document.getElementById("phone-us-container");
    const usPhoneLink = document.getElementById("phone-us-link");
    const usPhoneText = document.getElementById("phone-us-text");
    if (usPhoneContainer && usPhoneLink) {
        if (PORTFOLIO_CONFIG.phoneUSA && PORTFOLIO_CONFIG.phoneUSA.trim() !== "") {
            usPhoneLink.href = `tel:${PORTFOLIO_CONFIG.phoneUSA.replace(/[^\d+]/g, "")}`;
            if (usPhoneText) {
                usPhoneText.textContent = formatPhoneNumber(PORTFOLIO_CONFIG.phoneUSA);
            }
            usPhoneContainer.style.display = "flex";
        } else {
            usPhoneContainer.style.display = "none";
        }
    }

    // 5. Update Booking Action Buttons
    const bookingBtns = document.querySelectorAll(".btn-book-call");
    bookingBtns.forEach(btn => {
        if (PORTFOLIO_CONFIG.bookingUrl) {
            btn.href = PORTFOLIO_CONFIG.bookingUrl;
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
            if (PORTFOLIO_CONFIG.whatsappUrl) sameAsList.push(PORTFOLIO_CONFIG.whatsappUrl);
            if (PORTFOLIO_CONFIG.instagramUrl) sameAsList.push(PORTFOLIO_CONFIG.instagramUrl);
            if (sameAsList.length > 0) {
                schemaData.sameAs = sameAsList;
            }

            // Telephone in Schema (only add if present)
            if (PORTFOLIO_CONFIG.phonePakistan) {
                schemaData.telephone = PORTFOLIO_CONFIG.phonePakistan;
            }
            
            personScript.textContent = JSON.stringify(schemaData, null, 2);
        } catch (e) {
            console.error("Could not update Schema.org data:", e);
        }
    }

    // 7. Project Modal Logic
    const projectsData = {
        "voice-receptionist": {
            title: "AI Voice Receptionist",
            type: "AI Voice Agent • Automation",
            status: "Concept Project",
            overview: "A voice-based AI agent that acts as a 24/7 receptionist for businesses, answering common inquiries and routing calls intelligently.",
            problem: "Small businesses miss potential clients because they cannot answer calls after hours or during peak times.",
            solution: "Developed an AI voice agent capable of understanding natural language, answering FAQs, and capturing caller details.",
            features: [
                "Natural conversational AI voice",
                "24/7 availability",
                "Call routing and forwarding",
                "Lead capture and CRM integration"
            ],
            workflow: "Incoming Call -> AI Agent answers -> Classifies intent -> Answers FAQ or captures details -> Sends webhook to CRM.",
            tech: ["Vapi / Bland AI", "Make.com / n8n", "OpenAI", "Twilio"],
            value: "Reduces missed calls to zero, saves 20+ hours of manual reception work weekly, and increases after-hours lead conversion."
        },
        "dental-clinic": {
            title: "Dental Clinic Appointment Automation",
            type: "AI Automation • Appointment Booking",
            status: "Demo Project",
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
            status: "Concept Project",
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
            status: "Demo Project",
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
            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                const projectId = card.getAttribute("data-project-id");
                const data = projectsData[projectId];
                
                if (data) {
                    document.getElementById("modal-title").textContent = data.title;
                    document.getElementById("modal-type").innerHTML = `${data.type} <span id="modal-status" class="project-tag">${data.status}</span>`;
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
