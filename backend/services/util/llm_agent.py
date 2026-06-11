import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class DocumentGenerationAgent:
    """
    Agentic LLM handler for generating highly targeted employment documents
    using the OpenAI Foundation Model.
    """

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
