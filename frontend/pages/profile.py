import streamlit as st

st.title("Profile")

st.write(st.session_state.user.name)

st.selectbox("Swap Profiles", st.session_state.user.profiles, filter_mode=None)