class SkillGapInput:
    def __init__(self, payload):

        if not payload:
            self.candidate_skills = ["Python", "SQL", "Pandas"]
            self.job_requirements = ["Python", "SQL", "Pandas", "Jira", "Tableau"]

        self.candidate_skills = payload["candidate_skills"]
        self.job_requirements = payload["job_requirements"]

class CoverLetterGenInput:
    def __init__(self, payload):

        if not payload:
            self.candidate_skills = ["Python", "SQL", "Pandas", "Jira", "Tableau"]
            self.job_title = "Software Developer"
            self.company_name = "Fanshawe College"
        else:
            self.candidate_skills = payload["candidate_skills"]
            self.job_title = payload["job_title"]
            self.company_name = payload["company_name"]

class ResumeGenInput:
    def __init__(self, payload):

        if not payload:
            self.candidate_name = "Victor Wembanyama"
            self.candidate_skills = ["Python", "SQL", "Pandas", "Jira", "Tableau"]
            self.experience_history = ["Sales Associate", "Teacher", "Automotive Mechanic"]
            self.target_job_title = "Software Developer"

        else:
            self.candidate_name = payload["candidate_name"]
            self.candidate_skills = payload["candidate_skills"]
            self.experience_history = payload["experience_history"]
            self.target_job_title = payload["target_job_title"]
