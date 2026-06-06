"""
Candidate Viability Engine
Core analytical module for auditing skill gaps and calculating time-to-master (TTM) metrics.
"""

import logging
from typing import List, Dict, Any

# Configure enterprise-grade logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


class FillableGapAgent:
    """
    Analyzes candidate skill sets against job requirements to calculate
    a predictive viability score and identify fillable knowledge gaps.
    """

    def __init__(self, ttm_threshold: int = 20):
        self.ttm_threshold = ttm_threshold
        # Define high-penalty core architectural requirements
        self.high_ttm_skills = {"PyTorch", "System Architecture", "Advanced NLP"}

    def analyze_viability(
        self, candidate_skills: List[str], job_requirements: List[str]
    ) -> Dict[str, Any]:
        """
        Calculates a candidate's market readiness.

        Args:
            candidate_skills: Skills the candidate currently possesses.
            job_requirements: Skills explicitly required by the target role.

        Returns:
            Dictionary containing the viability status, final score, and gap remediation metrics.
        """
        # Normalize inputs for accurate intersection
        candidate_set = {skill.strip().lower() for skill in candidate_skills}

        missing_skills = [
            skill
            for skill in job_requirements
            if skill.strip().lower() not in candidate_set
        ]

        viability_score = 100
        estimated_study_hours = 0
        normalized_high_ttm = {s.lower() for s in self.high_ttm_skills}

        for skill in missing_skills:
            if skill.lower() in normalized_high_ttm:
                logging.warning(
                    f"Hard constraint unmet: '{skill}'. High TTM penalty applied."
                )
                viability_score -= 40
            else:
                logging.info(
                    f"Fillable gap identified: '{skill}'. Flagged for micro-module remediation."
                )
                viability_score -= 5
                estimated_study_hours += 3

        # Boolean logic determining if the gap can be closed within the acceptable timeframe
        is_viable = bool(
            viability_score >= 80 and estimated_study_hours <= self.ttm_threshold
        )

        return {
            "is_viable": is_viable,
            "final_score": max(0, viability_score),
            "estimated_remediation_hours": estimated_study_hours,
            "missing_skills_to_learn": missing_skills,
        }


if __name__ == "__main__":
    # Internal execution test
    sample_candidate = ["Python", "SQL", "Pandas"]
    sample_job = ["Python", "SQL", "Pandas", "Jira", "Tableau"]

    auditor = FillableGapAgent()
    result = auditor.analyze_viability(sample_candidate, sample_job)
    logging.info(f"Audit Result: {result}")
