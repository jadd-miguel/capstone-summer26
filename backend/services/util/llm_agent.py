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
        self.system_ready = True

    def generate_cover_letter(self, candidate_skills: list, job_title: str, company_name: str) -> dict:
        system_prompt = f"""
        You are an expert executive recruiter. Write a highly professional, 3-paragraph 
        cover letter for a candidate applying for the {job_title} role at {company_name}.
        Focus strictly on how these specific skills add immediate enterprise value: {', '.join(candidate_skills)}.
        Tone: authoritative, concise, corporate.
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

            return {
                "status": "success",
                "document_type": "cover_letter", 
                "prompt_used": system_prompt,
                "generated_document": response.choices[0].message.content,
            }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Cover Letter Generation failed: {str(e)}"
            }

    def generate_resume(self, candidate_name: str, candidate_skills: list, experience_history: list, target_job_title: str) -> dict:
        system_prompt = f"""
        You are an elite technical resume writer. Take the provided candidate data and format it into a 
        highly optimized, ATS-friendly resume targeting a {target_job_title} position.
        
        Candidate Name: {candidate_name}
        Core Skills to Highlight: {', '.join(candidate_skills)}
        Raw Experience Data: {experience_history}
        
        Output Requirements:
        - Format the response strictly in clean Markdown format.
        - Include a strong Professional Summary.
        - Add new lines where applicable.
        - Rewrite their experience bullets to sound highly impactful and quantifiable (use action verbs).
        - Keep the tone "Quiet Luxury" — professional, understated, and highly competent.
        - Include only the resume.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Generate the targeted resume for the {target_job_title} role."}
                ],
                temperature=0.5
            )

            return {
                "status": "success",
                "document_type": "resume",
                "prompt_used": system_prompt,
                "generated_document": response.choices[0].message.content,
            }

        except Exception as e:
            return {"status": "error", "message": f"Resume Generation failed: {str(e)}"}

    def generate_interview_script(self, candidate_skills: list, missing_skills: list, job_title: str) -> dict:
        system_prompt = f"""
        You are a Senior Technical Hiring Manager. The candidate is applying for {job_title}.
        They HAVE these skills: {', '.join(candidate_skills)}.
        They LACK these skills: {', '.join(missing_skills)}.
        
        Generate a 5-question interview script for the recruiter. 
        - 2 questions verifying their existing skills.
        - 3 questions testing their ability to quickly learn their missing skills.
        Provide the output in clean Markdown format with expected ideal answers for the recruiter to reference.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.6,
            )
            return {"status": "success", "document_type": "interview_script", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Interview Script Generation failed: {str(e)}"}

    def score_resume(self, current_resume_text: str, target_job_description: str) -> dict:
        system_prompt = f"""
        You are an uncompromising Applicant Tracking System (ATS) algorithm.
        Evaluate the provided candidate resume against the provided job description.
        
        Job Description: {target_job_description}
        Candidate Resume: {current_resume_text}
        
        Provide a strict JSON output matching this exact structure, nothing else:
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
                temperature=0.1, 
            )
            return {"status": "success", "document_type": "resume_score", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Resume Scoring failed: {str(e)}"}

    def generate_learning_roadmap(self, missing_skills: list, target_role: str, time_to_master_days: int) -> dict:
        system_prompt = f"""
        You are an elite Career Architect. A candidate wants to become a {target_role}.
        They need to learn these specific skills: {', '.join(missing_skills)}.
        They have exactly {time_to_master_days} days to achieve baseline proficiency.
        
        Generate a highly actionable, week-by-week study curriculum.
        Output in clean Markdown format. Focus strictly on free, high-yield technical resources 
        (e.g., official documentation, specific GitHub repos) and practical project building. 
        Tone: motivating, structured, and authoritative.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": system_prompt}],
                temperature=0.5,
            )
            return {"status": "success", "document_type": "career_roadmap", "generated_document": response.choices[0].message.content}
        except Exception as e:
            return {"status": "error", "message": f"Roadmap Generation failed: {str(e)}"}