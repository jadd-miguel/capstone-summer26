from backend.services.util.llm_agent import DocumentGenerationAgent

agent = DocumentGenerationAgent()
response = agent.generate_resume("Victor Wembanyama", ["Python"], ["Sales"], "Software Dev")
print(response)