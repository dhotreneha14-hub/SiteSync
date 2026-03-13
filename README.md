# SiteSync - Construction Field Management App

A responsive React.js web application for construction field teams to manage projects, submit Daily Progress Reports (DPR), and view historic reports. 

## 🚀 Features

- **Authentication**: Custom mock-based signup and login system.
- **Project Dashboard**: Responsive grid view of all active/planned projects with status filtering and search.
- **DPR Submission Form**: Mobile-optimized form with:
  - Project selection
  - Date and Weather input
  - Detailed activity description
  - Worker headcount tracking
  - Photo documentation (up to 3 images with previews)
- **Reports Dashboard**: 
  - View all submitted DPRs (stored locally).
  - Search reports by project name or work description.
  - Interactive fullscreen photo viewing model.
  - Ability to delete reports.
- **Responsive Design**: Works seamlessly on Mobile (375px), Tablet (768px), and Desktop (1280px+).
- **Dark Mode Toggle**: A persistent Sun/Moon toggle available on every page. Switches between full dark and light themes; preference is saved to `localStorage` and survives page refreshes.
- **Project Filter & Search**: Real-time text search combined with a dropdown status filter on the Project Dashboard to quickly find any project.
- **Animated Transitions**: Smooth page mounts, list pop-in effects, and modal animations powered by `framer-motion`.
- **Tech Stack**:
  - React.js 19
  - Vite (Fast Build Tool)
  - Tailwind CSS 4
  - React Router v7
  - Lucide React (Icons)
  - Framer Motion (Animations, Transitions, and Layout effects)
  - React Hot Toast (Notifications)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd construction-field-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🧪 Demo Credentials
- **Email**: `abc@gmail.com`
- **Password**: `123456`

## 📁 Project Structure
- `src/pages`: Main application screens (`Login`, `ProjectList`, `DPRForm`, `Reports`).
- `src/context`: Authentication (`AuthContext`) and Theme management (`ThemeContext`).
- `src/constants`: Project data, configuration, mock data, and themes.
- `index.css`: Tailwind configuration, dark mode dot-pattern overrides, and custom scrollbar styles.

---

**Made by Neha Dhotre**
