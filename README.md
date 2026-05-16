# Bright Smile Dental & Medical Center — Starter Site Demo

A professional, fully responsive **5-page Dental & Medical practice website** built with HTML, CSS, and vanilla JavaScript. Designed as a demo/starter template using the fictional brand **Bright Smile Dental & Medical Center** based in Columbus, OH.

> ⚠️ All business details, phone numbers, addresses, provider names, and credentials are **fictional and for demo purposes only.**

---

## Live Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, services overview, testimonials, insurance, appointment CTA |
| Services | `services.html` | Detailed dental & medical services with photos and pricing |
| Our Team | `about.html` | Practice story, provider team cards, certifications |
| Contact | `contact.html` | HIPAA-safe contact form, hours, Google review request |
| Appointments | `appointments.html` | Online booking form with SMS reminder automation |

---

## Features

### 🤖 AI Chatbot — FAQs & Booking
- Floating chat widget on every page
- 30+ topic responses covering appointments, services, insurance, hours, HIPAA, emergencies
- Handles dental AND medical questions intelligently
- Quick-reply buttons for common patient needs
- Auto-opens greeting after 3 seconds

### 📱 Appointment Reminders via Text (Simulated)
- After booking, a confirmation modal shows the full automated SMS sequence:
  1. Immediate booking confirmation text
  2. 48-hour reminder before the visit
  3. Morning-of reminder on the day of the appointment
  4. Post-visit "How did we do?" review request
- Preview of exact SMS message content shown to the patient

### ⭐ Patient Review Request Automation
- Review CTA card on the Contact page
- Two-step modal: request → personalized thank-you
- Post-appointment review request is part of the automated follow-up sequence

### 🔒 HIPAA-Safe Contact Forms
- HIPAA compliance notice on all forms (contact + appointments)
- "256-bit SSL Encrypted" messaging
- Patient consent checkbox for communications
- No sensitive health data (SSN, diagnosis, etc.) collected
- Privacy policy link in footer
- All modals reinforce data security messaging

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, flexbox, grid, animations (~1,800 lines, no framework)
- **Vanilla JavaScript** — AI chatbot, form handling, modals, scroll animations
- **Font Awesome 6** — Medical & dental icons (CDN)
- **Google Fonts** — Inter typeface (CDN)
- **Unsplash** — Free-use photography (no API key required)

---

## Fake Demo Credentials

| Field | Value |
|---|---|
| Practice | Bright Smile Dental & Medical Center |
| Founded | 1999 |
| Phone | (555) 384-2910 |
| Fax | (555) 384-2911 |
| Email | info@brightsmilemedical.com |
| Address | 8200 Medical Center Drive, Suite 400, Columbus, OH 43215 |
| Google Rating | 4.9 ⭐ (2,400+ reviews) |
| BBB Rating | A+ |

### Demo Provider Team
| Provider | Role | Specialty | Experience |
|---|---|---|---|
| **Dr. Sarah Mitchell** | Lead Dentist | General & Cosmetic Dentistry | 22 years |
| **Dr. James Chen** | Primary Care Physician | Family Medicine | 20 years |
| **Dr. Lisa Park** | Associate Dentist | Dental Implants & Orthodontics | 14 years |
| **Dr. Robert Torres** | Physician | Urgent Care & Chronic Disease | 16 years |
| **Jennifer Adams** | Office Manager | Patient Relations & Scheduling | 12 years |

---

## Getting Started

No build step required — pure static HTML.

```bash
# Clone the repo
git clone https://github.com/MSMITH71910/Dental_Medical_Startersite_demo.git

# Open in browser
open index.html
# or drag index.html into any browser
```

### Deploy to Static Hosting
- **GitHub Pages** — Enable in repo Settings → Pages → main branch → `/root`
- **Netlify** — Drag and drop the folder at netlify.com/drop
- **Vercel** — `npx vercel` in the project folder

---

## Project Structure

```
/
├── index.html           # Home page
├── services.html        # Dental & medical services
├── about.html           # Team & certifications
├── contact.html         # HIPAA contact form & reviews
├── appointments.html    # Online booking + SMS reminders
├── README.md
├── css/
│   └── style.css        # All styles (~1,800 lines, custom vars)
└── js/
    └── main.js          # Chatbot, forms, modals, animations
```

---

## Customization Guide

To adapt this template for a real dental or medical practice:

1. **Replace all fake credentials** — Update practice name, provider names, phone, address, and license numbers in all HTML files
2. **Swap team photos** — Replace Unsplash portrait URLs with real staff photos
3. **Update services & pricing** — Edit service cards in `services.html`
4. **Connect forms to a backend** — Use:
   - [Formspree](https://formspree.io) — easiest drop-in (add `action=` to your form)
   - [EmailJS](https://emailjs.com) — send emails directly from JS
   - [Netlify Forms](https://docs.netlify.com/forms/setup/) — if hosting on Netlify
5. **Enable real SMS reminders** — Integrate [Twilio](https://twilio.com) for actual appointment reminder texts
6. **Add real Google review link** — Update the review button href to your Google Business profile review URL (format: `https://g.page/r/YOUR_PLACE_ID/review`)
7. **Update chatbot responses** — Edit the `botResponses` object in `js/main.js` for your specific services, pricing, and FAQs
8. **Real HIPAA compliance** — For actual patient data, consult a HIPAA compliance specialist and use a certified healthcare form/messaging platform
9. **Patient Portal link** — Replace `#` href in footer with your EHR/patient portal URL (e.g., athenahealth, Dentrix, Open Dental)

---

## HIPAA Disclaimer

This is a **demo website only**. The HIPAA compliance messaging shown (SSL notices, consent checkboxes) is for visual demonstration purposes. A real healthcare practice website handling actual patient data must:
- Use a certified HIPAA-compliant hosting environment
- Implement proper Business Associate Agreements (BAAs) with all vendors
- Use a certified secure messaging platform
- Consult with a HIPAA compliance officer or attorney

---

## Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--primary` | `#0891b2` | Buttons, links, dental theme |
| `--primary-dark` | `#0e7490` | Hover states, navbar |
| `--secondary` | `#10b981` | Medical theme, CTA buttons |
| `--accent` | `#f97316` | Admin role, highlights |
| `--urgent` | `#dc2626` | Emergency notices |
| `--dark` | `#0f172a` | Text, footer, navbar |

---

## License

Released as a **demo starter template**. Free to use, modify, and deploy for real healthcare businesses. Proper HIPAA compliance measures are the responsibility of the deploying party.

---

*Built for Bright Smile Dental & Medical Center — Columbus, OH (Demo)*
