import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
from recommendations import generate_recommendations

app = FastAPI(
    title="Egypt Social Media Addiction Predictive API",
    description="A production-ready FastAPI backend designed to serve predictive models for social media addiction diagnostics.",
    version="1.0.0"
)

# Enable CORS for the localhost React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific origins (e.g. ["http://localhost:3000"]) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schema representing the student behavioral parameters submitted by the frontend form
class StudentProfile(BaseModel):
    age: int = Field(..., ge=12, le=40, description="Age of the student")
    gender: str = Field(..., description="Gender of the student ('Male', 'Female', 'Other')")
    academicLevel: str = Field(..., description="Academic Level ('High School', 'Undergraduate', 'Postgraduate')")
    dailyUsageHours: float = Field(..., ge=0.0, le=24.0, description="Average daily hours spent on social media")
    platform: str = Field(..., description="Most used social media platform")
    sleepHours: float = Field(..., ge=0.0, le=24.0, description="Average nightly sleep hours")
    mentalHealthScore: int = Field(..., ge=1, le=10, description="Mental Health Score from 1 (Extreme Distress) to 10 (Thriving)")
    academicPerformance: str = Field(..., description="Subjective academic performance ('Excellent', 'Good', 'Average', 'Below Average')")
    conflictLevel: str = Field(..., description="Friction level over social media use ('Low', 'Medium', 'High')")

# Paths to the machine learning model assets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.joblib")

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Social Media Addiction Prediction API",
        "status": "Online",
        "model_loaded": os.path.exists(MODEL_PATH) and os.path.getsize(MODEL_PATH) >= 100
    }

@app.post("/predict")
def predict(profile: StudentProfile):
    # Check if the joblib model exists and is not a placeholder
    if not os.path.exists(MODEL_PATH) or os.path.getsize(MODEL_PATH) < 100:
        return {"status": "Model not loaded"}
    
    # Do NOT create fake predictions or random values
    # Once the model is copied from Google Colab, loading & processing occurs here:
    try:
        # Load the pipeline model safely
        model = joblib.load(MODEL_PATH)
        
        # Structure the input row into a pandas DataFrame corresponding to training schema
        import pandas as pd
        
        # Map conflict level string to numeric value for the model
        conflict_val = 1
        if isinstance(profile.conflictLevel, (int, float)):
            conflict_val = profile.conflictLevel
        elif str(profile.conflictLevel).isdigit():
            conflict_val = int(profile.conflictLevel)
        else:
            conflict_map = {"Low": 1, "Medium": 3, "High": 5}
            conflict_val = conflict_map.get(profile.conflictLevel, 1)

        # Map academic performance to Yes/No matching Affects_Academic_Performance in training set
        # "Excellent"/"Good" -> "No" (Not affected negatively)
        # "Average"/"Below Average" -> "Yes" (Affected negatively)
        affects_academic = "No"
        if profile.academicPerformance in ["Average", "Below Average"]:
            affects_academic = "Yes"

        # Map Postgraduate to Graduate to match the training categories
        academic_level_val = profile.academicLevel
        if academic_level_val == "Postgraduate":
            academic_level_val = "Graduate"

        input_data = pd.DataFrame([{
            "Age": profile.age,
            "Gender": profile.gender,
            "Academic_Level": academic_level_val,
            "Country": "Egypt",
            "Governorate": "Cairo",
            "Avg_Daily_Usage_Hours": profile.dailyUsageHours,
            "Most_Used_Platform": profile.platform,
            "Affects_Academic_Performance": affects_academic,
            "Sleep_Hours_Per_Night": profile.sleepHours,
            "Mental_Health_Score": profile.mentalHealthScore,
            "Relationship_Status": "Single",
            "Conflicts_Over_Social_Media": conflict_val
        }])
        
        # Use the pipeline to predict directly
        prediction = float(model.predict(input_data)[0])
        
        # Calculate wellbeing_score from model prediction and student habits.
        # Ensure the score stays within a meaningful 10-100 range for all valid inputs.
        base_score = 110.0 - prediction * 10.0
        sleep_bonus = max(0.0, min(10.0, (profile.sleepHours - 6.5) * 2.0))
        mental_health_bonus = max(0.0, min(10.0, (profile.mentalHealthScore - 5.0) * 1.5))
        usage_penalty = max(0.0, (profile.dailyUsageHours - 3.0) * 1.5)

        wellbeing_score = round(base_score + sleep_bonus + mental_health_bonus - usage_penalty, 1)
        wellbeing_score = max(10.0, min(100.0, wellbeing_score))
        
        # Generate risk_level based on prediction
        if prediction >= 4.5:
            risk_level = "Severe"
        elif prediction >= 3.5:
            risk_level = "High"
        elif prediction >= 2.5:
            risk_level = "Moderate"
        else:
            risk_level = "Low"
            
        recommendations = generate_recommendations(
            prediction=prediction,
            usage=profile.dailyUsageHours,
            sleep=profile.sleepHours,
            mental_health=profile.mentalHealthScore
        )
        
        return {
            "prediction": prediction,
            "wellbeing_score": wellbeing_score,
            "risk_level": risk_level,
            "recommendations": recommendations,
            "status": "Success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error executing machine learning prediction: {str(e)}"
        )
