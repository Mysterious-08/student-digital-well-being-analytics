from typing import List

def generate_recommendations(prediction, usage, sleep, mental_health):
    recommendations = []

    # Usage
    if usage >= 6:
        recommendations.append(
            "Reduce social media usage to less than 4 hours per day."
        )
    elif usage >= 4:
        recommendations.append(
            "Take a 15-minute break after every hour of screen time."
        )

    # Sleep
    if sleep < 7:
        recommendations.append(
            "Aim for at least 7-8 hours of sleep every night."
        )

    # Mental Health
    if mental_health <= 4:
        recommendations.append(
            "Practice mindfulness, exercise, or speak with a counselor."
        )

    # Addiction Prediction
    if prediction >= 4.5:
        recommendations.append(
            "High addiction risk detected. Consider scheduling regular digital detox periods."
        )
    elif prediction >= 3.5:
        recommendations.append(
            "Monitor your digital habits and reduce unnecessary social media usage."
        )
    elif prediction >= 2.5:
        recommendations.append(
            "Maintain balanced digital habits and avoid excessive late-night usage."
        )

    # Default recommendation
    if len(recommendations) == 0:
        recommendations.append(
            "Excellent digital well-being. Keep maintaining your healthy digital lifestyle."
        )

    return recommendations
