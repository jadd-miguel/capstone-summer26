import sys

# THE NUCLEAR OPTION: Hardcode your exact Windows path
sys.path.append(r"C:\GitHub\capstone-summer26")

import streamlit as st
import json

from PyPDF2 import PdfReader
from services.util.llm_agent import DocumentGenerationAgent

# Initialize the AI Engine
@st.cache_resource
def load_agent():
    return DocumentGenerationAgent()

ai_agent = load_agent()

# --- UI CONFIGURATION ---
st.set_page_config(page_title="AI Career Architect (Dev Mode)", layout="wide", page_icon="⚡")
st.title("⚡ AI Career Architect: Enterprise Sandbox")
st.markdown("Internal testing portal for the Prescriptive Intelligence Layer.")

# --- SIDEBAR NAVIGATION ---
st.sidebar.header("Intelligence Modules")
module = st.sidebar.radio("Select Workflow to Test:", [
    "0. 🆕 Multimodal PDF Parser", # NEW MENU ITEM
    "1. STAR Resume Refiner", 
    "2. Market Competitiveness Benchmark",
    "3. Multi-Persona Interview Simulator"
])

# ==========================================
# MODULE 0: The Multimodal PDF Parser
# ==========================================
if module == "0. 🆕 Multimodal PDF Parser":
    st.header("📄 Autonomous Resume Ingestion")
    st.write("Upload a legacy PDF resume. The engine will extract the raw data for AI processing.")
    
    uploaded_file = st.file_uploader("Upload Resume (PDF)", type="pdf")
    
    if uploaded_file is not None:
        with st.spinner("Extracting text layer..."):
            # Read the PDF
            pdf_reader = PdfReader(uploaded_file)
            extracted_text = ""
            for page in pdf_reader.pages:
                extracted_text += page.extract_text()
            
            st.success("Extraction Complete! Raw Data:")
            
            # Display the raw text in an editable box so the user can verify it
            st.text_area("Extracted Resume Content:", extracted_text, height=300)
            
            # Pro-Move: Save it to Streamlit's "Session State"
            # This allows the other tabs to automatically use this text!
            st.session_state['parsed_resume'] = extracted_text

# ==========================================
# MODULE 1: STAR Refiner
# ==========================================
if module == "1. STAR Resume Refiner":
    st.header("✨ STAR Method Resume Refiner")
    st.write("Input raw, junior-sounding bullet points. The AI will convert them into enterprise-grade metrics.")
    
    # --- NEW LOGIC: Check if we have extracted PDF text ---
    default_text = "Built a database for users\nFixed bugs in the python code\nLed a team of 3 people"
    if 'parsed_resume' in st.session_state:
        default_text = st.session_state['parsed_resume']
        st.info("💡 Auto-filled with text extracted from your PDF!")
        
    raw_input = st.text_area("Raw Experience Bullets:", default_text, height=300)

# ==========================================
# MODULE 2: Market Benchmark
# ==========================================
elif module == "2. Market Competitiveness Benchmark":
    st.header("📊 Salary & Market Benchmark")
    
    col1, col2 = st.columns(2)
    with col1:
        role = st.text_input("Target Role:", "Lead Data Architect")
    with col2:
        skills = st.text_input("Candidate Skills (comma separated):", "Python, SQL, AWS, Supabase, LLMs")
        
    if st.button("Run Market Audit"):
        with st.spinner("Analyzing market data..."):
            result = ai_agent.generate_benchmark(skills.split(","), role)
            
            if result["status"] == "success":
                data = json.loads(result["generated_document"])
                st.metric(label="Competitiveness Score", value=f"{data['competitiveness_score']}/100")
                st.metric(label="Est. Market Value", value=data['market_salary_estimate'])
                st.warning(f"**Critical Missing Tech:** {', '.join(data['critical_missing_tech'])}")
                st.info(f"**Verdict:** {data['market_verdict']}")
            else:
                st.error(result["message"])

# ==========================================
# MODULE 3: Persona Interview
# ==========================================
elif module == "3. Multi-Persona Interview Simulator":
    st.header("🎙️ Multi-Persona Interview Simulator")
    
    col1, col2 = st.columns(2)
    with col1:
        target_job = st.text_input("Target Role:", "Senior Backend Engineer")
    with col2:
        persona = st.selectbox("Select Interviewer Persona:", [
            "The Technical Lead (Code/Architecture focus)",
            "The Product Manager (ROI/Business focus)",
            "The HR Manager (Behavioral/Culture focus)"
        ])
        
    if st.button("Generate Interview Script"):
        with st.spinner(f"Preparing {persona} questions..."):
            result = ai_agent.generate_persona_interview(target_job, persona)
            
            if result["status"] == "success":
                st.markdown(result["generated_document"])
            else:
                st.error(result["message"])