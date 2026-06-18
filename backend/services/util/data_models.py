from fastapi import HTTPException

class AuthenticationError(HTTPException):
    def __init__(self, e):

        status_code = self.getStatusCodeFromAuthError(e)
        detail = self.parseAuthenticationError(e)

        super().__init__(
            status_code = status_code,
            detail = detail
        )

    @staticmethod
    def getStatusCodeFromAuthError(e):
        return int(getattr(e, "status"))

    @staticmethod
    def parseAuthenticationError(e):
        error = e
        code = getattr(e, "code")

        return f"Code: {code} | Message: {error}"

class SupabaseError(HTTPException):
    def __init__(self, e):
        detail = self.parseSupabaseError(e)
        super().__init__(
            status_code = 500,
            detail = detail
        )
    @staticmethod
    def parseSupabaseError(e):
        msg = getattr(e, "message")
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        details = getattr(e, "details")

        return f"Message: {msg} | Code: {code} | Hints: {hint} | Details: {details}"

class SkillGapInput:
    def __init__(self, payload):
        self.candidate_skills = payload["candidate_skills"]
        self.job_requirements = payload["job_requirements"]

class CoverLetterGenInput:
    def __init__(self, payload):
        self.candidate_skills = payload["candidate_skills"]
        self.job_title = payload["job_title"]
        self.company_name = payload["company_name"]

class ResumeGenInput:
    def __init__(self, payload):
        self.candidate_name = payload["candidate_name"]
        self.candidate_skills = payload["candidate_skills"]
        self.experience_history = payload["experience_history"]
        self.target_job_title = payload["target_job_title"]
