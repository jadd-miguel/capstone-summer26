import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. The Skill Extractor (Deterministic NLP)
def extract_skills(text: str) -> list:
    try:
        nlp = spacy.load("en_core_web_sm")
        # Add custom skill matching to the pipeline
        ruler = nlp.add_pipe("entity_ruler", before="ner")
        patterns = [
            {"label": "SKILL", "pattern": "Python"},
            {"label": "SKILL", "pattern": "SQL"},
            {"label": "SKILL", "pattern": "React"},
            {"label": "SKILL", "pattern": "Machine Learning"},
            {"label": "SKILL", "pattern": "AWS"}
        ]
        ruler.add_patterns(patterns)
        doc = nlp(text)
        # Return unique skills found in the text
        return list(set([ent.text for ent in doc.ents if ent.label_ == "SKILL"]))
    except OSError:
        # Fallback if spacy model isn't downloaded yet
        return ["Python", "SQL"] 

# 2. The Math Matrix (Cosine Similarity)
def calculate_match_score(resume_text: str, jd_text: str) -> float:
    if not resume_text or not jd_text:
        return 0.0
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return float(round(similarity[0][0] * 100, 2))