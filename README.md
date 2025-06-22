# Magna Medicos MBE Calculator

A privacy-focused, user-friendly web application to help 300 level medical and dental students at Obafemi Awolowo University, College of Health Sciences, Ile-Ife, Osun State, Nigeria calculate and understand their required  and aggregate scores for the Medical Board Examination (MBE). All calculations are performed locally in the browser—no personal data is stored or transmitted.

---

## ✨ Features

- **Easy Calculation**: Input your 300L incourse and 200L MBE scores with a simple interface and get instant results.
- **Instant Results**: Get your eligibility status and detailed breakdown as soon as you calculate.
- **MBE Ready**: Designed specifically for OAU COHS First MBE requirements, following the official grading and eligibility rules.
- **Privacy First**: No tracking, analytics, or data transmission. All calculations and results are visible only to you, and happen entirely in your browser.
- **Downloadable Reports**: Generate and download a detailed score report as a PNG image for your personal records.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (recommended: latest LTS)
- **npm** or **yarn**

### Setup

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Akin125/incourse-cal.git
   cd incourse-cal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## 🖥️ Project Structure

- `app/` - Next.js application folder
  - `page.tsx` - Landing page with introduction and CTA
  - `calculator/page.tsx` - Main MBE Calculator UI and logic
  - `globals.css` - Global Tailwind & custom styles
- `components/ui/` - Reusable UI components (Button, Card, Dialog, etc.)
- `hooks/` - Custom React hooks (e.g., for responsive design)
- `public/` - Static assets (if any)
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS setup

---

## ⚙️ Configuration & Environment

- **No environment variables** are required for basic usage.
- There is no backend and no data storage; everything runs client-side.
- Deployment can be done to any static host supporting Next.js (e.g., Vercel, Netlify).

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

---

## 🛡️ Privacy & Data Security

- **Your data is completely private.** All calculations are performed locally in your browser.
- **No data is stored or transmitted.** Your scores and personal information are only visible to you.
- **No tracking or analytics.** The app does not collect, store, or share any of your information.

---

## 📄 How It Works

1. **Input Scores**
   - Enter your name (optional), class, and scores for Anatomy, Biochemistry, Physiology (300L incourse and 200L MBE).
2. **Calculate**
   - The app computes your aggregate and required score for the MBE using OAU COHS rules.
3. **Download Report**
   - You can download a PNG report of your results for your personal use.

---

## 🧑‍💻 Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) and custom UI components
- [Lucide Icons](https://lucide.dev/) for icons

---

## 🏷️ License

&copy; 2024 INCOHS MBE Calculator. Built for medical students.  
See [LICENSE](LICENSE) for details.

---

## 🙋 FAQ

### Is my data sent to a server?

> No, all calculations and data remain in your browser and never leave your device.

### Can I use this on mobile?

> Yes, the interface is responsive and works well on all devices.

### How do I deploy this?

> Deploy like any Next.js static site, e.g., on Vercel or Netlify. No backend setup required.

---

## 👨‍⚕️ About

This tool was built to help OAU COHS medical and dental students conveniently calculate their MBE standing, ensuring privacy, simplicity, and accuracy.

---