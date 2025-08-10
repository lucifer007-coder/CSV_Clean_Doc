# 📄 CSV Clean Doctor  
*Your one-click prescription for messy CSV files*  

---

## 🧭 Table of Contents
1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Quick Start](#quick-start)  
4. [Local Development](#local-development)  
5. [Tech Stack](#tech-stack)  
6. [License](#license)  

---

## 1. About the Project
**CSV Clean Doctor** is a lightweight, web-based CSV cleaning & validation tool designed to help both technical and non-technical users instantly diagnose and fix common CSV issues.  

Whether it's inconsistent delimiters, missing headers, or strange encoding problems — CSV Clean Doctor has the cure.  

Common use cases include:
- Pre-processing CSVs for data analysis or ML pipelines
- Fixing export issues from legacy systems
- Ensuring files are UTF-8 and well-structured before sharing  

---

## 2. Features
| 🩺 Diagnostic | 💊 Cure |
|--------------|---------|
| Auto-detect delimiter (`,`, `;`, `\t`, `\|`) | Normalize to any delimiter |
| Detect missing headers | Insert / rename headers |
| Locate encoding issues | UTF-8, Windows-1252, ISO-8859-1 conversion |
| Find duplicate rows & blank lines | Remove or merge duplicates |
| Preview before download | Side-by-side diff view |

---

## 3. Quick Start
Try it instantly online: **[Live Demo](https://csv-clean-doctor.vercel.app)**  
1. Upload your CSV file  
2. Apply desired fixes (delimiter change, header insertion, encoding conversion, etc.)  
3. Preview changes  
4. Download your clean CSV  

---

## 4. Local Development
Prefer to hack locally? No problem.  

### Prerequisites
- **Node.js** ≥ 18 (we recommend [nvm](https://github.com/nvm-sh/nvm))  
- **npm** (comes with Node)  

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/lucifer007-coder/csv-clean-doctor.git
cd csv-clean-doctor

# 2. Install dependencies
npm install

# 3. Start the dev server with hot-reload
npm run dev
````

The app should now be running at **[http://localhost:5173](http://localhost:5173)**.

---

## 5. Tech Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| **Build Tool** | [Vite](https://vitejs.dev)         |
| **Language**   | TypeScript                         |
| **UI Library** | React 18                           |
| **Styling**    | Tailwind CSS                       |
| **Components** | [shadcn/ui](https://ui.shadcn.com) |
| **Deployment** | Vercel                             |

---
## 6. License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

**💡 Pro Tip:** If your CSV file feels like it’s possessed — don’t panic. Call the Doctor. 🩺
