
class Skill_Gap_Input:
    def __init__(self, data):
        self.candidate_skills = data["candidate_skills"]
        self.job_requirements = data["job_requirements"]

class Supabase_Error:
    def __init__(self, error):
        self.message = f"{error["message"]} | {error["code"]} | {error["details"]} | {error["hint"]}"

    def getMessage(self):
        return self.message
