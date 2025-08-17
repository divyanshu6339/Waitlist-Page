# ​ Waitlist Landing Page – React + Tailwind + OTP Modal

A modern, responsive **React (Vite)** landing page with a **Waitlist Modal** featuring an OTP-based sign-up flow.

Live Demo: [waitlist-page-beige.vercel.app](https://waitlist-page-beige.vercel.app)

---

##  Features

- **Dark theme with vibrant gradients** for visual appeal.
- **Sticky navbar** with actionable “Join Waitlist” button.
- **Hero section** featuring bold typography and a compelling tagline.
- **Problem highlights & insight cards** using glassmorphism styling.
- **Waitlist Modal** with multi-step flow:
  1. **Email input** → Send OTP (simulated)
  2. **OTP input** → Verification with retry limits
  3. **Success confirmation** showing blurred waitlist position
- **Mock backend** simulated using `localStorage`.
- **Robust error handling**: invalid emails, wrong OTPs, retry limits.
- **Loading states** with spinners using `lucide-react` icons.
- **Accessibility-first**: semantic HTML, keyboard support, ARIA-friendly input.
- **Fully responsive**, mobile-friendly layout.

---

##  Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **State Management**: React Hooks (`useState`)
- **Mock API**: `localStorage` to simulate sending and verifying OTPs

---

##  Installation & Setup

```bash
# Clone the repository
git clone https://github.com/divyanshu6339/Waitlist-Page.git

cd Waitlist-Page

# Install dependencies
npm install

# Run development server
npm run dev
Deployment
Easily deploy your project to Vercel (already live) or Netlify:

Push code to GitHub.

Import the repository on Vercel or Netlify.

Click deploy — your landing page will be live shortly!
