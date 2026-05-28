import streamlit as st

st.title("Settings")


newName = st.text_input("Change Name", placeholder="New Name")

if st.button("Change"):
    if newName != "":
        st.session_state.user.name = newName