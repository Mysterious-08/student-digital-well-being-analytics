# Social Media Addiction Predictive API - FastAPI Backend

This directory houses the complete production-ready FastAPI backend architecture designed to serve machine learning models for predicting social media addiction risks and student well-being indexes.

## Folder Structure

```text
backend/
├── app.py                  # Primary FastAPI application entry point, CORS middleware, and predictive routing
├── recommendations.py      # Reusable logical module to generate behavioral recommendations
├── requirements.txt        # Backend dependencies listing
├── models/                 # Target folder for ML models (copied from Google Colab)
│   ├── model.joblib        # [Pending] Trained Random Forest / Gradient Boosting model binary
│   └── preprocessor.joblib # [Pending] Fitted pipeline transformer binary for categorical/numerical columns
└── README.md               # Backend documentation, setup and deployment instructions
```

---

## Google Colab Integration

The machine learning model is trained separately in **Google Colab**. After completing the model evaluation and training pipeline:

1. Save your trained model object and fitted preprocessor from Google Colab using `joblib`:
   ```python
   import joblib
   
   # Save the estimator/model
   joblib.dump(best_model, 'model.joblib')
   
   # Save the fitted Scikit-Learn ColumnTransformer / Pipeline
   joblib.dump(preprocessor, 'preprocessor.joblib')
   ```
2. Download both `model.joblib` and `preprocessor.joblib` files.
3. Place/copy them directly into this folder under:
   `backend/models/`

If these files are missing, the `/predict` endpoint will gracefully respond with a `"Model not loaded"` status.

---

## Setup & Running the Backend

Ensure you have Python 3.8+ installed, then follow these steps:

### 1. Create and Activate a Virtual Environment

On Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

On macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI Server

Start the development server with Hot Module Reloading (HMR):

```bash
uvicorn app:app --reload
```

The API will be available locally at `http://127.0.0.1:8000`. You can explore the interactive OpenAPI/Swagger interactive documentation at `http://127.0.0.1:8000/docs`.
