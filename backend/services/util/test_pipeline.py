import json
from services import orchestrate_career_path

# Mock payload representing a real user profile
test_payload = {
    "name": "Moses Effeyotah",
    "user_id": "8cf5da6d-test-uuid-value", # Ensure this format aligns with your auth setup
    "candidate_skills": ["Python", "SQL", "PyTorch", "Data Modeling"],
    "experience_history": [
        "Customer Care Specialist: Handled high-volume corporate client queries, managed dispute logs.",
        "Academic Class Representative: Coordinated cohort schedules, mediated student-faculty communication."
    ],
    "target_job_title": "AI Solutions Architect"
}

print("🚀 Initializing End-to-End Orchestrator Test...")
try:
    result = orchestrate_career_path(test_payload)
    print("\n✅ Execution Successful! Pipeline Output:\n")
    print(json.dumps(result, indent=4))
except Exception as e:
    print(f"\n❌ Pipeline Crashed. Error Diagnostic: {str(e)}")