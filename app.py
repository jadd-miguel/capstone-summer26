import streamlit as st
from streamlit_navigation_bar import st_navbar

#Run command
#python -m streamlit run app.py

class UserProfile:
    def __init__(self):
        self.name = "Me"
        self.profiles = ["1","2","3"]

#Webpage title
st.set_page_config(
    page_title="Naviskill AI Capstone Project",
)

if "user" not in st.session_state:
    st.session_state.user = UserProfile()

pages = {
    "Account": [    
        st.Page("pages/profile.py", title="Swap Profile"),
        st.Page("pages/settings.py", title="Settings"),
    ],
    "Features": [     
        st.Page("pages/roadmap.py", title="Create your roadmap"),
        st.Page("pages/resume.py", title="Add Resume"),
    ],
}


pg = st.navigation(pages)
pg.run()

