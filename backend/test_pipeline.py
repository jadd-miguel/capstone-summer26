from ml_engine import calculate_match_score

resume = "I am a developer with experience in Python, SQL, and AWS."
jd = "We are looking for a software developer with skills in Python and AWS."

score = calculate_match_score(resume, jd)
print(f"Match Score: {score}%")