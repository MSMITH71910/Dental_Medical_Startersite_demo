document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU =====
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileBtn.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ===== CHATBOT =====
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatMessages = document.querySelector('.chatbot-messages');
  const chatInput = document.querySelector('.chatbot-input');
  const chatSend = document.querySelector('.chatbot-send');

  let chatOpen = false;
  let hasGreeted = false;

  const botResponses = {
    'appointment': {
      text: "📅 Booking an appointment is easy!\n\n• Call us: (555) 384-2910\n• Online: Use our Appointments page\n• Walk-ins welcome for urgent care\n\nNew patients are always welcome! What type of appointment do you need?",
      quick: ['Dental appointment', 'Medical appointment', 'Urgent care', 'New patient']
    },
    'book': {
      text: "📅 We make booking simple! Visit our Appointments page to schedule online, or call (555) 384-2910. We offer same-day appointments for urgent issues.\n\nWhat type of visit do you need?",
      quick: ['Dental visit', 'Medical visit', 'Urgent care', 'Annual physical']
    },
    'dental appointment': {
      text: "We'd love to see you! 😁\n\nDr. Mitchell and Dr. Park see patients:\n• Mon–Thu: 8 AM – 6 PM\n• Fri: 8 AM – 5 PM\n• Sat: 9 AM – 2 PM\n\nNew patients get a FREE comprehensive exam! Call (555) 384-2910 or book online.",
      quick: ['Book online', 'New patient info', 'Insurance info', 'Emergency dental']
    },
    'medical appointment': {
      text: "Dr. Chen and Dr. Torres are accepting new patients! 🩺\n\nWe offer:\n• Same-day sick visits\n• Annual physicals\n• Chronic care management\n• Preventive wellness\n\nCall (555) 384-2910 to schedule. Most insurance plans accepted.",
      quick: ['Insurance info', 'Annual physical', 'New patient info', 'Hours']
    },
    'new patient': {
      text: "Welcome! We're so glad you're considering us 🎉\n\nAs a new patient you'll receive:\n✓ Comprehensive exam\n✓ Digital X-rays (dental)\n✓ Full health history review\n✓ Personalized care plan\n\nPlease bring your insurance card and photo ID. Arrive 15 minutes early to complete paperwork.",
      quick: ['Book now', 'Insurance info', 'What to bring', 'Hours']
    },
    'insurance': {
      text: "💳 We accept most major insurance plans, including:\n\n• Delta Dental • Cigna\n• Aetna • Blue Cross Blue Shield\n• United Healthcare • Humana\n• Medicare & Medicaid\n\nNot sure if we're in-network? Call us at (555) 384-2910 and we'll verify your benefits for free!",
      quick: ['Book appointment', 'Payment options', 'New patient info']
    },
    'insurance info': {
      text: "💳 We accept most major insurance plans, including:\n\n• Delta Dental • Cigna\n• Aetna • Blue Cross Blue Shield\n• United Healthcare • Humana\n• Medicare & Medicaid\n\nNot sure if we're in-network? Call us at (555) 384-2910 and we'll verify your benefits for free!",
      quick: ['Book appointment', 'Payment options', 'New patient info']
    },
    'payment': {
      text: "💰 We offer flexible payment options:\n\n• All major credit cards\n• CareCredit (0% financing available)\n• HSA/FSA accepted\n• Payment plans for large treatments\n\nWe also offer a 5% discount for patients without insurance who pay at time of service.",
      quick: ['Book appointment', 'Insurance info', 'Services']
    },
    'payment options': {
      text: "💰 We offer flexible payment options:\n\n• All major credit cards\n• CareCredit (0% financing available)\n• HSA/FSA accepted\n• Payment plans for large treatments\n\nWe also offer a 5% discount for patients without insurance who pay at time of service.",
      quick: ['Book appointment', 'Insurance info', 'Services']
    },
    'emergency': {
      text: "🚨 Dental or medical emergency?\n\nFor life-threatening emergencies, call 911 immediately.\n\nFor dental emergencies (severe pain, broken tooth, lost crown):\n📞 (555) 384-2910 — We have same-day emergency slots!\n\nFor urgent care needs, we also offer walk-in urgent care hours.",
      quick: ['Dental emergency', 'Urgent care', 'Call now', 'After hours']
    },
    'emergency dental': {
      text: "🦷 Dental emergency? Don't wait!\n\nCommon dental emergencies we treat same-day:\n• Severe toothache\n• Chipped or broken tooth\n• Lost filling or crown\n• Dental abscess\n• Knocked-out tooth\n\nCall (555) 384-2910 immediately — we keep emergency slots open daily!",
      quick: ['Call now', 'Hours', 'What to do']
    },
    'urgent care': {
      text: "🏥 Our Urgent Care is open for walk-ins!\n\n• Mon–Fri: 8 AM – 6 PM\n• Saturday: 9 AM – 2 PM\n• No appointment needed\n\nWe treat: infections, minor injuries, illness, flu, strep, UTIs, and more.\n\nFor emergencies, call 911.",
      quick: ['Hours', 'Insurance info', 'Book appointment']
    },
    'hours': {
      text: "🕐 Our office hours:\n\n• Mon–Thu: 8:00 AM – 6:00 PM\n• Friday: 8:00 AM – 5:00 PM\n• Saturday: 9:00 AM – 2:00 PM\n• Sunday: Closed\n\nUrgent care walk-ins welcome Mon–Sat! For after-hours emergencies, our answering service will connect you with the on-call provider.",
      quick: ['Book appointment', 'Urgent care', 'Location']
    },
    'location': {
      text: "📍 We're conveniently located at:\n\n8200 Medical Center Drive, Suite 400\nColumbus, OH 43215\n\nFree parking in the attached garage. We're on the 4th floor — elevators available.\n\nPublic transit: Bus routes 2, 11, and 24 stop at Medical Center Drive.",
      quick: ['Hours', 'Book appointment', 'Contact info']
    },
    'contact info': {
      text: "📞 Contact Bright Smile Dental & Medical:\n\nPhone: (555) 384-2910\nFax: (555) 384-2911\nEmail: info@brightsmilemedical.com\n\nAddress: 8200 Medical Center Drive, Suite 400, Columbus, OH 43215\n\nWe respond to messages within 1 business hour!",
      quick: ['Book appointment', 'Hours', 'Insurance info']
    },
    'hipaa': {
      text: "🔒 Your privacy is our top priority.\n\nAll communications through our website and forms are HIPAA compliant and SSL encrypted. We never share your health information without your written consent.\n\nOur full HIPAA Privacy Notice is available at the front desk or by request.",
      quick: ['Book appointment', 'Contact info', 'New patient info']
    },
    'teeth whitening': {
      text: "✨ We offer professional teeth whitening options:\n\n• In-office Zoom! Whitening — results in 1 hour!\n• Custom take-home whitening trays\n• Starting from $199\n\nGet a smile up to 8 shades whiter! Ask about our new patient whitening special.",
      quick: ['Book appointment', 'New patient info', 'Dental services']
    },
    'dental services': {
      text: "🦷 Our dental services include:\n\n• General & preventive dentistry\n• Cosmetic dentistry\n• Teeth whitening\n• Dental implants\n• Invisalign/orthodontics\n• Crowns, bridges & veneers\n• Root canal therapy\n• Emergency dental care\n\nWhat would you like to know more about?",
      quick: ['Teeth whitening', 'Implants', 'Invisalign', 'Book appointment']
    },
    'implants': {
      text: "🦷 Dental implants are the gold standard for replacing missing teeth!\n\nDr. Mitchell is a certified implant specialist with 500+ successful placements. Our implants are:\n• Natural-looking and permanent\n• 95%+ success rate\n• Lifetime with proper care\n• Starting at $2,499 per tooth\n\nFree implant consultation available!",
      quick: ['Free consultation', 'Book appointment', 'Payment options']
    },
    'invisalign': {
      text: "😁 Straighter teeth without metal braces!\n\nWe're a certified Invisalign provider. Treatment typically takes 6–18 months and is virtually invisible.\n\n• Free smile assessment\n• Payment plans from $99/month\n• Most insurance plans include orthodontic benefits\n\nWant to see what your smile could look like?",
      quick: ['Free consultation', 'Payment options', 'Book appointment']
    },
    'free consultation': {
      text: "We'd love to meet you! New patient consultations are FREE for dental implants, Invisalign, and cosmetic dentistry.\n\nCall (555) 384-2910 to schedule your no-obligation consultation, or book online on our Appointments page.",
      quick: ['Book now', 'Hours', 'Insurance info']
    },
    'annual physical': {
      text: "🩺 Annual physicals are essential for staying ahead of health issues!\n\nOur comprehensive physicals include:\n• Complete physical exam\n• Blood pressure & vitals\n• Lab work & bloodwork orders\n• Immunization review\n• Preventive screenings\n• Health counseling\n\nCovered by most insurance plans — $0 cost to you!",
      quick: ['Book physical', 'Insurance info', 'New patient info']
    },
    'book physical': {
      text: "Annual physicals are typically covered 100% by insurance. Call (555) 384-2910 or book online!\n\nDr. Chen and Dr. Torres have availability most weekdays with same-week scheduling for new patients.",
      quick: ['Book appointment', 'Insurance info', 'Hours']
    },
    'services': {
      text: "We offer both dental and medical services under one roof! 🏥🦷\n\nDental: General, cosmetic, implants, Invisalign, whitening, emergency\nMedical: Primary care, urgent care, physicals, chronic disease, preventive\n\nWhat would you like to know more about?",
      quick: ['Dental services', 'Medical services', 'Book appointment', 'Insurance info']
    },
    'medical services': {
      text: "🩺 Our medical services:\n\n• Primary care & family medicine\n• Preventive care & wellness visits\n• Urgent care (walk-ins welcome)\n• Chronic disease management\n• Annual physicals & checkups\n• Immunizations & vaccines\n• Lab work & diagnostics\n• Referrals to specialists\n\nAccepting new patients — call (555) 384-2910!",
      quick: ['Annual physical', 'Urgent care', 'Book appointment', 'Insurance info']
    },
    'what to bring': {
      text: "📋 What to bring to your first appointment:\n\n• Photo ID (driver's license or passport)\n• Insurance card(s)\n• List of current medications\n• Medical/dental records if available\n• Payment method for copay\n\nArrive 15 minutes early to complete new patient forms (or fill them out online in advance).",
      quick: ['Book appointment', 'Insurance info', 'Hours']
    },
    'what to do': {
      text: "If you have a dental emergency:\n\n🦷 Knocked-out tooth: Handle by crown, rinse gently, place in milk or between cheek and gum — get to us within 30 min!\n\n🦷 Toothache: Rinse with warm salt water, take OTC pain reliever, call us NOW\n\n🦷 Lost crown: Dental cement from pharmacy temporarily, call us first thing\n\nFor medical emergencies, call 911.",
      quick: ['Call now', 'Urgent care', 'Hours']
    },
    'call now': {
      text: "📞 Please call us at:\n\n(555) 384-2910\n\nOur office is open Mon–Thu 8AM–6PM, Fri 8AM–5PM, Sat 9AM–2PM. After hours, our answering service will connect you with our on-call provider.",
      quick: ['Hours', 'Location', 'Book appointment']
    },
    'after hours': {
      text: "After regular office hours, please call (555) 384-2910. Our automated system will connect you to our on-call provider for urgent medical or dental needs.\n\nFor life-threatening emergencies, always call 911 first.",
      quick: ['Urgent care', 'Hours', 'Book appointment']
    },
    'book online': {
      text: "Booking online is fast and easy! Visit our Appointments page and fill out the form — you'll receive a confirmation text and automated reminders before your visit.\n\nOr call us at (555) 384-2910 and we'll get you scheduled!",
      quick: ['Dental appointment', 'Medical appointment', 'Insurance info']
    },
    'book now': {
      text: "Let's get you scheduled! Visit our Appointments page online or call (555) 384-2910.\n\nWe'll send you:\n✓ Immediate booking confirmation\n✓ Reminder 48 hours before\n✓ Reminder morning of your visit\n✓ Post-visit review request",
      quick: ['Hours', 'What to bring', 'Insurance info']
    }
  };

  function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-tooth"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.style.whiteSpace = 'pre-line';
    bubble.textContent = text;
    msg.appendChild(avatar);
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function setQuickReplies(options) {
    const container = document.querySelector('.chatbot-quick-replies');
    if (!container) return;
    container.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleUserMessage(opt));
      container.appendChild(btn);
    });
  }

  function getBotResponse(input) {
    const lc = input.toLowerCase().trim();
    for (const key of Object.keys(botResponses)) {
      if (lc.includes(key)) return botResponses[key];
    }
    return {
      text: "Thanks for reaching out to Bright Smile Dental & Medical! 😊\n\nI can help with:\n• Appointments & scheduling\n• Insurance & billing\n• Dental & medical services\n• Hours & location\n• HIPAA & privacy info\n\nOr call us: (555) 384-2910",
      quick: ['Book appointment', 'Dental services', 'Medical services', 'Insurance info']
    };
  }

  function handleUserMessage(text) {
    addMessage(text, true);
    if (chatInput) chatInput.value = '';
    setTimeout(() => {
      const r = getBotResponse(text);
      addMessage(r.text);
      setQuickReplies(r.quick);
    }, 600);
  }

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      chatOpen = !chatOpen;
      chatbotWindow.classList.toggle('open', chatOpen);
      const n = chatbotToggle.querySelector('.chat-notification');
      if (n) n.style.display = 'none';
      if (chatOpen && !hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          addMessage("👋 Hello! I'm Maya, your virtual assistant at Bright Smile Dental & Medical.\n\nI can help you schedule appointments, answer insurance questions, or tell you about our services. How can I help you today?");
          setQuickReplies(['Book appointment', 'Dental services', 'Medical services', 'Insurance info', 'Hours']);
        }, 300);
      }
    });
  }
  if (chatbotClose) chatbotClose.addEventListener('click', () => { chatOpen = false; chatbotWindow.classList.remove('open'); });
  if (chatSend) chatSend.addEventListener('click', () => { const t = chatInput?.value.trim(); if (t) handleUserMessage(t); });
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && chatInput.value.trim()) handleUserMessage(chatInput.value.trim()); });

  setTimeout(() => {
    const n = document.querySelector('.chat-notification');
    if (n && !chatOpen) n.style.display = 'flex';
  }, 3000);

  // ===== MODALS =====
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  }
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) { o.classList.remove('open'); document.body.style.overflow = ''; } });
  });
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => { const m = btn.closest('.modal-overlay'); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } });
  });

  // ===== CONTACT LEAD FORM =====
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      openModal('lead-success-modal');
      leadForm.reset();
    });
  }

  // ===== APPOINTMENT FORM =====
  const apptForm = document.getElementById('appt-form');
  if (apptForm) {
    apptForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = apptForm.querySelector('[name="name"]')?.value || 'Patient';
      const type = apptForm.querySelector('[name="appt_type"]')?.value || 'appointment';
      const date = apptForm.querySelector('[name="preferred_date"]')?.value || 'your preferred date';
      const modal = document.getElementById('appt-success-modal');
      if (modal) {
        const n = modal.querySelector('.patient-name'); if (n) n.textContent = name;
        const t = modal.querySelector('.appt-type'); if (t) t.textContent = type;
        const d = modal.querySelector('.appt-date'); if (d) d.textContent = date || 'your selected date';
      }
      openModal('appt-success-modal');
      apptForm.reset();
    });
  }

  // ===== REVIEW BUTTON =====
  const reviewBtn = document.getElementById('google-review-btn');
  if (reviewBtn) reviewBtn.addEventListener('click', () => openModal('review-modal'));
  const reviewConfirm = document.getElementById('review-confirm-btn');
  if (reviewConfirm) reviewConfirm.addEventListener('click', () => { closeModal('review-modal'); openModal('review-thanks-modal'); });

  // ===== SCROLL ANIMATIONS =====
  document.querySelectorAll('.service-card, .team-card, .cert-card, .testimonial-card, .why-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    io.observe(el);
  });

  // ===== ACTIVE NAV =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
});
