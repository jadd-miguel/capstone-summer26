import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class DocumentGenerationAgent:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("CRITICAL: OPENAI_API_KEY environment variable is not set.")
        self.client = OpenAI(api_key=self.api_key)

    def generate_resume(self, candidate_name: str, candidate_skills: list, 
                        experience_history: list, target_job_title: str, 
                        template_type: str = "experience_first") -> dict:
        
        strategy = (
            "Prioritize professional achievements, quantifying impact with metrics." 
            if template_type == "experience_first" 
            else "Prioritize education, technical coursework, and academic projects."
        )

        system_prompt = f"""
        You are an elite technical resume writer. Format the candidate data into an ATS-friendly resume.
        Candidate: {candidate_name}
        Skills: {', '.join(candidate_skills)}
        Experience: {experience_history}
        Formatting Strategy: {strategy}
        Tone: Professional, concise, highly competent.
        Include only the markdown resume content.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Generate a {template_type} resume for {target_job_title}."}
                ],
                temperature=0.4
            )
            return {"status": "success", "document_type": "resume", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Resume Generation failed: {str(e)}"}

    def generate_bridge_roles(self, candidate_skills: list, target_role: str) -> dict:
        system_prompt = f"""
        You are a Predictive Career Architect. 
        1. ANALYZE: Briefly explain the candidate's core strengths and career blind spots relative to {target_role}.
        2. PRESCRIBE: Generate exactly 3 bridge roles.
        Output strictly in JSON:
        {{
            "analysis": "[Reasoning]",
            "bridge_roles": [{{"job_title": "...", "match_reason": "...", "experience_gained": "..."}}]
        }}
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                response_format={"type": "json_object"},
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.2
            )
            return {"status": "success", "document_type": "bridge_roles", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Bridge Role Generation failed: {str(e)}"}

    def generate_cover_letter(self, candidate_skills: list, job_title: str, company_name: str) -> dict:
        system_prompt = f"""
        You are an expert executive recruiter. Write a highly professional, 3-paragraph cover letter for a candidate applying for the {job_title} role at {company_name}. Focus strictly on how these specific skills add immediate enterprise value: {', '.join(candidate_skills)}. Tone: authoritative, concise, corporate.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Generate the cover letter for the {job_title} position."}
                ],
                temperature=0.7 
            )
            return {"status": "success", "document_type": "cover_letter", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Cover Letter Generation failed: {str(e)}"}

    def generate_learning_roadmap(self, missing_skills: list, target_role: str, time_to_master_days: int) -> dict:
        system_prompt = f"""
        You are an elite Career Architect. A candidate wants to become a {target_role}.
        They need to learn these specific skills: {', '.join(missing_skills)}.
        They have exactly {time_to_master_days} days to achieve baseline proficiency.
        Generate a highly actionable, week-by-week study curriculum. Output in clean Markdown format. Focus strictly on free, high-yield technical resources.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.5
            )
            return {"status": "success", "document_type": "career_roadmap", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Roadmap Generation failed: {str(e)}"}

    def score_resume(self, current_resume_text: str, target_job_description: str) -> dict:
        system_prompt = f"""
        You are an uncompromising Applicant Tracking System (ATS) algorithm.
        Evaluate the provided candidate resume against the provided job description.
        Job Description: {target_job_description}
        Candidate Resume: {current_resume_text}
        Provide a strict JSON output matching this exact structure:
        {{
            "ats_match_score": [A number between 0 and 100],
            "missing_keywords": [List of critical words the resume lacks],
            "formatting_errors": [List of ATS-breaking formatting issues],
            "executive_summary": "One sentence explaining the score"
        }}
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={"type": "json_object"},
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.1
            )
            return {"status": "success", "document_type": "resume_score", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Resume Scoring failed: {str(e)}"}

    def generate_embedding(self, text_content: str) -> list:
        """Converts text into a 1536-dimensional vector for semantic search."""
        try:
            response = self.client.embeddings.create(
                input=text_content,
                model="text-embedding-3-small"
            )
            return response.data[0].embedding
        except Exception as e:
            print(f"Embedding Generation failed: {str(e)}")
            return []

    def refine_to_star_method(self, raw_bullets: list) -> dict:
        """Converts basic bullet points into the STAR format."""
        system_prompt = """
        You are an elite Resume Architect. Take the user's raw experience bullets and rewrite them 
        using the STAR method (Situation, Task, Action, Result). Force the inclusion of implied metrics if necessary.
        Output strictly as a JSON list of strings.
        {"refined_bullets": ["...", "..."]}
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Refine these: {raw_bullets}"}
                ],
                temperature=0.3
            )
            return {"status": "success", "document_type": "star_bullets", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def generate_benchmark(self, candidate_skills: list, target_role: str) -> dict:
        """Analyzes candidate market competitiveness and salary estimates."""
        system_prompt = f"""
        You are a Tech Market Analyst. Compare the candidate's skills against current market requirements for a {target_role}.
        Calculate a 'Competitiveness Score' (0-100) and estimate their market value.
        Output strictly in JSON:
        {{
            "competitiveness_score": 85,
            "market_salary_estimate": "$110k - $130k",
            "critical_missing_tech": ["..."],
            "market_verdict": "Short sentence on their leverage in negotiations."
        }}
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                response_format={"type": "json_object"},
                messages=[{"role": "system", "content": system_prompt},
                          {"role": "user", "content": f"Skills: {candidate_skills}"}],
                temperature=0.2
            )
            return {"status": "success", "document_type": "market_benchmark", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def generate_persona_interview(self, target_role: str, persona: str) -> dict:
        """Generates dynamic interview questions based on the interviewer's role."""
        system_prompt = f"""
        You are conducting a job interview for a {target_role}. Adopt the persona of the: {persona}.
        - If Technical Lead: Ask highly specific coding/architecture questions.
        - If Product Manager: Ask about business value, ROI, and user impact.
        - If HR Manager: Ask behavioral and culture-fit questions.
        Generate 3 intense, persona-specific questions and explain what a 'Red Flag' answer would be.
        Output in clean Markdown format.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.6
            )
            return {"status": "success", "document_type": "persona_interview", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": str(e)}