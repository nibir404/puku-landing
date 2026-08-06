# Puku — The AI-Powered Developer Environment

Puku is a state-of-the-art developer platform designed to accelerate programming workflows through intelligent completions, context compaction, and multi-agent execution loops.

This repository hosts the official landing page, documentation, and release logs built using a unified, premium design system.

---

## 🌟 Key Features

### 🖥️ Interactive Mock IDE
An interactive visual workspace mapping real-time Fill-in-the-Middle (FIM) autocomplete hints, an active agent terminal trace, and a right-hand Copilot chat layout.

### 📚 6-Product Documentation
A fully loaded technical manual section supporting six dedicated products:
1. **Puku Editor** (`puku-editor`) — The core VS Code fork.
2. **Puku CLI** (`puku-cli`) — Local terminal assistant.
3. **Puku Cloud** (`puku-cloud`) — Serverless container GPU scaling.
4. **Puku Design** (`puku-design`) — Figma layout variables token sync.
5. **Puku Co-work** (`puku-cowork`) — Real-time team buffer collaboration.
6. **Puku App** (`puku-app`) — Desktop client tray manager.

*Features a custom dropdown selector to switch between product namespaces instantly.*

### 📱 Native-App Mobile Vibe
Optimized responsive structures including:
- **Bottom Navigation Tab Bar** — Floating 5-tab app layout (Home, Docs, Updates, Contact, Menu) with safe-area spacing.
- **App Menu Drawer** — Slides up with spring physics, grouping core products and platform services into settings-like cards.

### 📢 Elegant Changelog Timeline
A status-themed release timeline grouping additions, fixes, and improvements with cover previews and inline mobile date badges.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nibir404/puku-landing.git
   cd puku-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

### Production Build

Compile the optimized bundle:
```bash
npm run build
```
The output assets will be exported to the `dist/` directory.
