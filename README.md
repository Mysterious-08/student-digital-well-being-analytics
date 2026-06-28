# Student Digital Well-Being Analytics

A full-stack web app for analyzing student digital well-being patterns and predicting social media addiction risk. The project combines a React + Vite frontend, a FastAPI backend, and a trained machine learning model to provide an interactive dashboard, prediction workflow, and personalized recommendations.

## Features

- Interactive analytics dashboard with cohort filters and risk insights
- Student risk prediction form with backend scoring
- Explainable feature importance visualization
- Personalized recommendations for high-risk users
- Dataset-driven reporting and summary views

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind-style UI components, Recharts
- Backend: Python, FastAPI, joblib, pandas
- Data: CSV-based student dataset and trained model assets

## Project Structure

```text
src/                # React frontend pages and UI components
backend/            # FastAPI prediction service and model assets
public/             # Static assets and training dataset
train_model.py      # Training script for the ML model
```

## Prerequisites

- Node.js 18+
- Python 3.10+
- npm
- pip

## Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. For a public or separately hosted backend, create a `.env` file and set:
   ```bash
   VITE_API_URL=https://your-public-backend-url
   ```
   For local-only development, the frontend falls back to `http://127.0.0.1:8000`.
4. Open the app in your browser at the local Vite URL shown in the terminal.

## Backend Setup

1. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```
2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
   ```
4. The API will be available at:
   - http://127.0.0.1:8000/docs
   - http://127.0.0.1:8000/predict
   - http://YOUR_COMPUTER_IP:8000/docs when testing from another device on the same network

## Notes

- The frontend expects the backend to be running for prediction requests.
- Make sure the model file exists in [backend/models/model.joblib](backend/models/model.joblib) before using predictions.
- The project was initialized and uploaded to GitHub as a new repository.

## License

This project is intended for educational and demonstration purposes.
