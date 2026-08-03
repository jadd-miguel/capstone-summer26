import os
import json
import spacy
from openai import OpenAI

# Initialize the LLM Client
# Ensure your environment variable OPENAI_API_KEY is set
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_universal_skills(resume_text: str) -> dict:
    """
    The Deterministic Reader: Scans unstructured resumes and extracts factual entities.
    """
    nlp = spacy.load("en_core_web_sm")
    ruler = nlp.add_pipe("entity_ruler", before="ner")
    
    # Universal extraction dictionary
    universal_patterns = [
        {"label": "TECH_SKILL", "pattern": [{"LOWER": "python"}]},
        {"label": "TECH_SKILL", "pattern": [{"LOWER": "autocad"}]},
        {"label": "EQUIPMENT", "pattern": [{"LOWER": "forklift"}]},
        {"label": "CERTIFICATION", "pattern": [{"LOWER": "cpr"}]},
        {"label": "SOFT_SKILL", "pattern": [{"LOWER": "leadership"}]}
    ]
    ruler.add_patterns(universal_patterns)
    
    doc = nlp(resume_text)
    
    extracted_data = {
        "TECH_SKILL": set(),
        "EQUIPMENT": set(),
        "CERTIFICATION": set(),
        "SOFT_SKILL": set()
    }
    
    for ent in doc.ents:
        if ent.label_ in extracted_data:
            extracted_data[ent.label_].add(ent.text.title())
            
    # Convert sets to lists
    for key in extracted_data:
        extracted_data[key] = list(extracted_data[key])
            
    return extracted_data


def generate_recruiter_summary(extracted_skills: dict, target_role: str) -> str:
    """
    The Generative Writer: Takes the factual matrix and prompts the LLM to assess viability.
    """
    system_prompt = """
    You are a ruthless, highly efficient Executive Recruiter. 
    Review the provided candidate skills against the target role.
    Provide a concise, 2-sentence verdict on whether this candidate is worth a phone screen.
    Do not hallucinate skills they do not have. Be direct and corporate.
    """
    
    user_prompt = f"""
    Target Role: {target_role}
    Candidate's Extracted Matrix: {json.dumps(extracted_skills)}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2 # Keep it cold and professional
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"LLM Generation failed: {str(e)}"


# --- Execution Test ---
if __name__ == "__main__":
    sample_resume = """
    I am an experienced warehouse supervisor and logistics coordinator. 
    I hold an active Forklift license and standard CPR certifications. 
    I pride myself on strong leadership and team management.
    """
    target_job = "Senior Warehouse Manager"
    
    print("1. Initiating NER extraction pipeline...")
    skills_matrix = extract_universal_skills(sample_resume)
    print(f"Extracted Matrix: {json.dumps(skills_matrix, indent=2)}\n")
    
    print("2. Pinging LLM for Recruiter Verdict...")
    verdict = generate_recruiter_summary(skills_matrix, target_job)
    
    print("\n--- FINAL PIPELINE OUTPUT ---")
    print(verdict)