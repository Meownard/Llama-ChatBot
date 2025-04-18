# 🐾 Meowrn-Llama

**Meowrn-Llama** is a multilingual chatbot powered by the **Ollama** LLM, specifically using the **LLaMA 3.2** model. It features a full-stack modern architecture with a TypeScript-based Node.js backend and a Vite + React frontend.

---

## 🚀 Features

- Conversational chatbot using LLaMA 3.2
- Full-stack MERN-style structure
- TypeScript backend for type safety and scalability
- React + Vite frontend for fast development and hot reloading
- Modular code structure
- Dev environment with concurrent server and client startup

---

## 🛠️ Installation Guide

### 1. Install [Ollama](https://ollama.com/)

#### macOS
```bash
brew install ollama
```
Windows (WSL recommended)
Download and install from: https://ollama.com/download

Start the Ollama server:

```bash
ollama serve
```
Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve
```
⚠️ Make sure the Ollama server is running before using the chatbot.

2. Pull the LLaMA 3.2 Model
```bash
ollama pull llama3
```
3. Clone the Repository
```bash
git clone https://github.com/your-username/meowrn-llama.git
cd meowrn-llama
```

4. Install Dependencies
Install root dependencies and then separately install frontend and backend dependencies.

```bash
# Root
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

💻 Running the App in Development
Return to the root directory and run:

```bash
npm run start
```
This will use concurrently to run both:

npm run server → starts the backend (node dist/index.js)

npm run client → starts the frontend (vite)

Make sure Ollama is running with the llama3 model loaded.

🔧 Build for Production
Backend
```bash
cd backend
npm run build
```
Frontend
```bash
cd frontend
npm run build
```

📂 Project Structure
```bash
meowrn-llama/
├── backend/         # TypeScript backend logic
│   ├── src/
│   └── dist/
├── frontend/        # Vite + React frontend
│   └── src/
├── package.json     # Root for concurrent scripts
└── README.md
```

🧠 LLM Integration (Ollama)
The chatbot interacts with the local Ollama server. Ensure the model is pulled and the daemon is running before launching the app:

```bash
ollama serve
ollama pull llama3 (or other models)
```

📜 Scripts Overview
🔹 Root package.json
```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "npm --prefix backend start",
  "client": "npm --prefix frontend start"
}
```
🔹 Backend package.json
```json
"scripts": {
  "dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\"",
  "build": "tsc",
  "start": "node dist/index.js"
}
```
🔹 Frontend package.json
```json
"scripts": {
  "start": "vite",
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

📃 WIPWOP
© 2025 Meowrn-Llama

