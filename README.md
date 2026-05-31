# NaviSkill AI

[![Server Check](https://github.com/jadd-miguel/capstone-summer26/actions/workflows/server_check.yml/badge.svg?branch=main)](https://github.com/jadd-miguel/capstone-summer26/actions/workflows/server_check.yml)

[![Server Deployed](https://github.com/jadd-miguel/capstone-summer26/actions/workflows/server_deploy.yml/badge.svg?branch=main)](https://github.com/jadd-miguel/capstone-summer26/actions/workflows/server_deploy.yml)

NaviSkill AI is an agentic suite of personalised, employment-oriented
learning and upskilling tools designed to optimise dynamic career
roadmapping!

## Installation

**FRONTEND**

**BACKEND**<br>
[Server URL ↗](naviskillai-crasasakfrasaqgd.canadaeast-01.azurewebsites.net)

*Local Dev*
1. Make sure you have [Python 3.10 and PIP ↗](https://www.python.org/downloads/release/python-31020/).
2. To backend folder
`cd backend`
3. Build python env
`python -m venv capstone-backend-env`
4. Install dependencies
`pip install -r requirements.txt`
5. Activate env
```
capstone-backend-env\Scripts\activate.bat // cmd
source capstone-backend-env/Scripts/activate // bash
capstone-backend-env\Scripts\Activate.ps1 // powershell
```
6. Build app 
`uvicorn server:app --reload`
7. Server is ready
`http://127.0.0.1:8000`

*Docker*
1. Make sure you have [Docker ↗](https://docs.docker.com/desktop/setup/install/windows-install/).
2. To backend folder
`cd backend`
2. Build container
`docker compose up --build -d`
3. Server is ready
`http://localhost:8000/`
4. To kill docker build
`docker compose down`

## Stack
Frontend -> React<br>
Backend -> Python, FastApi<br>
Database -> Supabase<br>
<br>
Cloud -> Azure<br>
Container -> Docker<br>
CI/CD -> GitHub<br>
&emsp;- ✔ Env, ✔ Dependencies, ✔ Syntax, ✔ Api, ✔ Docker, ✔ Deploy

## Development Team
Bruno M., Jadd A., Min D., Moses E.
