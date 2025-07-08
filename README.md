# 🌍 GloboVibe

GloboVibe is a full-stack application that collects real-time news from various countries, analyzes the sentiment of those events using AI, and stores mood data to track global sentiment trends.

---
### 🔗 Live Demo

Frontend: [globovibe.vercel.app](https://globovibe.vercel.app)

---

## 📦 Features

- 🌐 Fetches live news articles by country.
- 🧠 Analyzes each event's sentiment using AI (Gemini).
- 🗃 Stores events, countries, and sentiment ("vibes") in a PostgreSQL database.
- 🔧 Clean modular codebase built with Express, TypeScript, and Prisma.
- 📊 Designed to support future globe-based visualizations and trend analysis.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **AI Service**: Gemini (for sentiment analysis)
- **Architecture**: Functional programming principles with clean, modular, and scalable codebase
---

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/emadnawarr/globovibe-backend.git

cd globovibe-backend

### 2. Install Dependencies
npm install

### 3. Set Up Environment Variables
Create a .env file in the root with the following values:

DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db_name>

API_KEY=<your_news_api_key>

GEMINI_API_KEY=<your_gemini_or_openai_key>

### 4. Generate Prisma Client & Run Migrations
npx prisma generate

npx prisma migrate dev --name init

### 6. Start the Application
npm run dev

### 7. 💻 Running with the Frontend Locally

To run the backend alongside the frontend interface, you need to clone and run the frontend repository:

Frontend repo: [https://github.com/youssefwaheedd/globovibe-frontend](https://github.com/youssefwaheedd/globovibe-frontend)


## 📬 API Endpoints
GET	/events/loadEvents	Fetch and insert real-time events with their sentiments(executed daily using a cron job)

POST	/events/getNews	get news for specific country

POST	/vibes/predictUserInput	Analyze sentiment for unprocessed events

GET	/vibes/getAllVibes	Get all vibes with sentiment summary

#### 🧠 How Sentiment Analysis Works
Events are fetched using a news API (e.g., NewsData.io).

Each article is sent to an AI model (Gemini) with a predefined prompt.

The model returns:

{
  "type": "Positive" | "Negative" | "Neutral",
  "intensity": number (1–100)
}

The result is stored in the database linked to the original event and its country.

