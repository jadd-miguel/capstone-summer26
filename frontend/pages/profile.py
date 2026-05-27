import streamlit as st

st.title("Profile")

st.write(st.session_state.user.name)