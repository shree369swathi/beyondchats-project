\# BeyondChats AI Content Optimizer 🚀



A full-stack solution that scrapes blog articles, optimizes them using AI, and displays them in a professional React dashboard.



---



\## 📊 Project Overview



This project demonstrates a complete 3-phase solution for intelligent content optimization:



\- Phase 1: Scrape 5 articles from BeyondChats blogs → Store in MongoDB → CRUD APIs

\- Phase 2: Google search for competitors → Scrape content → AI optimization via GPT-4o-mini → Add references  

\- Phase 3: React dashboard displaying original and optimized articles



---



\## 🏗️ Architecture Diagram



┌─────────────────────────────────────────────────┐

│ BEYONDCHATS AI OPTIMIZER │

└─────────────────────────────────────────────────┘



PHASE 1: SCRAPING \& STORAGE

┌────────────────────────────────────────────┐

│ beyondchats.com/blogs/ │

│ ↓ (Puppeteer) │

│ 5 Original Articles │

│ ↓ │

│ MongoDB Atlas (Cloud) │

│ ↓ │

│ Express CRUD API (Port 5001) │

└────────────────────────────────────────────┘



PHASE 2: AI OPTIMIZATION

┌────────────────────────────────────────────┐

│ For each article: │

│ 1. Google Search (SerpAPI) │

│ 2. Filter blogs (competitor results) │

│ 3. Scrape content (Cheerio) │

│ 4. GPT-4o-mini optimization │

│ 5. Add references + Update status │

└────────────────────────────────────────────┘



PHASE 3: REACT DASHBOARD

┌────────────────────────────────────────────┐

│ React.js UI (Vercel Live) │

│ - Grid layout (responsive 1-3 cols) │

│ - Article cards with badges │

│ - Modal with full content │

│ - Clickable references │

│ - Dark/Light mode │

│ - Filters (Original/Updated/All) │

│ - Mobile optimized (auto-responsive) │

└────────────────────────────────────────────┘



text



---



\## 🛠️ Tech Stack



| Layer | Technology |

|-------|-----------|

| Backend | Node.js + Express.js |

| Database | MongoDB Atlas (Cloud) |

| Phase 2 | Google SERPAPI + Cheerio + OpenAI GPT-4o-mini |

| Frontend | React.js + Vite |

| Styling | CSS-in-JS (Glassmorphism) |

| Deployment | Vercel (Frontend Live) |



---



\## 📦 Project Structure



beyondchats-project/

├── beyondchats-backend/

│ ├── frontend/ # React Dashboard (inside backend!)

│ │ ├── src/

│ │ │ ├── App.jsx # Main dashboard component

│ │ │ └── index.css # Responsive styling

│ │ ├── public/

│ │ ├── package.json

│ │ └── vite.config.js

│ │

│ ├── scripts/

│ │ └── optimizeArticles.js # Phase 2 (Google + GPT)

│ │

│ ├── routes/

│ │ └── articles.js # CRUD endpoints

│ │

│ ├── models/

│ │ └── Article.js # MongoDB schema

│ │

│ ├── server.js # Express API

│ ├── .env # API keys (private)

│ ├── .env.example # Template

│ └── package.json

│

└── README.md



text



---



\## 🚀 Quick Start



\### Prerequisites

\- Node.js v16+

\- MongoDB Atlas account (free tier)

\- OpenAI API key

\- SerpAPI key (free: 100 searches/month)



\### Local Setup



\*\*Terminal 1: Backend\*\*

cd beyondchats-backend

npm install

node server.js



Runs on https://beyondchats-project-ltwxzi892-shrees-projects-c0dff4ad.vercel.app

text



\*\*Terminal 2: Frontend (Development)\*\*

cd beyondchats-backend/frontend

npm install

npm run dev



Runs on https://beyondchats-project-ltwxzi892-shrees-projects-c0dff4ad.vercel.app

text



\*\*Terminal 3: Phase 2 Script\*\*

cd beyondchats-backend

node scripts/optimizeArticles.js



text



---



\## 📊 API Endpoints



GET /api/articles # Fetch all articles

GET /api/articles/:id # Fetch one article

POST /api/articles # Create new article

PUT /api/articles/:id # Update article

DELETE /api/articles/:id # Delete article



text



---



\## 🌐 Live Deployment



| Component | Link |

|-----------|------|

| Frontend Dashboard | https://beyondchats-dashboard-sage.vercel.app |

| Backend API | https://beyondchats-project-ltwxzi892-shrees-projects-c0dff4ad.vercel.app |

| GitHub Repository | https://github.com/shree369swathi/beyondchats-project |



---



\## ✅ Results Achieved



\### Phase 1: Scraping \& CRUD ✅

\- ✅ 5 articles scraped from https://beyondchats.com/blogs/

\- ✅ MongoDB Atlas storage (cloud database)

\- ✅ Full CRUD APIs working (GET, POST, PUT, DELETE)

\- ✅ Status tracking (original/updated)



\### Phase 2: AI Optimization ✅

\- ✅ Google SERPAPI integration (real search results)

\- ✅ Competitor filtering (blogs only)

\- ✅ Content scraping with Cheerio

\- ✅ GPT-4o-mini optimization

\- ✅ References array (2 per article)

\- ✅ Status updated to "updated"



\### Phase 3: React Dashboard ✅

\- ✅ Responsive grid layout (auto 1-3 columns)

\- ✅ Article cards with status badges

\- ✅ Modal popup with full content

\- ✅ Clickable references to competitor blogs

\- ✅ Dark/Light mode toggle

\- ✅ Filter options (Original/Updated/All)

\- ✅ Professional glassmorphism UI

\- ✅ Mobile optimized (works on phone)



---



\## 🎯 Key Features



\### Backend

\- RESTful CRUD API

\- MongoDB Atlas integration

\- Real-time status updates

\- Error handling \& logging



\### Phase 2 Script

\- Live Google search (SerpAPI)

\- Intelligent blog filtering

\- Content extraction (Cheerio)

\- AI-powered optimization (GPT-4o-mini)

\- Rate limiting (6s between requests)



\### Frontend

\- Responsive grid design (auto-fit layout)

\- Dark mode toggle

\- Modal popups

\- Filter functionality

\- Professional glassmorphism UI

\- Mobile Optimized (tested on phone)



---



\## 📝 Environment Variables



Create `.env` file in backend folder:



MONGODB\_URI=your_key_here

OPENAI\_API\_KEY=sk-proj-your\_key\_here

SERPAPI\_KEY=your\_serpapi\_key\_here

PORT=5001



text



---



\## 🎓 What I Learned



\- Full-stack web development (Node.js, React, Vite)

\- Web scraping \& API integration

\- AI/LLM integration (OpenAI GPT-4o-mini)

\- Database design \& management (MongoDB)

\- Responsive UI/UX design (Glassmorphism)

\- Deployment \& DevOps (Vercel, MongoDB Atlas)

\- Version control (Git, GitHub)



---



\## 📧 Contact



\- Email: swathissn12@gmail.com

\- LinkedIn: linkedin.com/in/shree-swathi 

\- GitHub: github.com/shree369swathi



---



\## 📄 License



This project is submitted for BeyondChats Assignment evaluation.



---

