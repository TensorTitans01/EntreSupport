from crewai import Agent
from serper_dev import SerperDev
from firecrawl import Firecrawl
from typing import Dict, List
from datetime import datetime

class RiskAssessor:
    def __init__(self):
        self.serper = SerperDev()
        self.firecrawl = Firecrawl()
        
    def create_agent(self) -> Agent:
        return Agent(
            role='Risk Assessment Specialist',
            goal='Evaluate risks and opportunities for startups',
            backstory="""You are a risk assessment expert who specializes in 
            identifying and evaluating various types of risks in startup ventures, 
            including market risks, financial risks, and operational risks.""",
            tools=[self.serper.search, self.firecrawl.scrape],
            verbose=True
        )
    
    async def assess_risks(self, startup_data: Dict) -> Dict:
        agent = self.create_agent()
        
        # Search for industry risks
        industry_risks = await agent.execute(
            f"Search for common risks and challenges in {startup_data['industry']} industry"
        )
        
        # Scrape risk assessment data
        risk_data = await agent.execute(
            f"Scrape risk assessment reports and case studies for {startup_data['industry']}"
        )
        
        # Generate risk analysis
        analysis = await agent.execute(
            f"""Based on the risk data, provide:
            1. Key risk factors and their impact
            2. Risk mitigation strategies
            3. Risk score (0-1)
            4. Key recommendations
            For {startup_data['name']}"""
        )
        
        return {
            "timestamp": datetime.now().isoformat(),
            "startup_name": startup_data["name"],
            "industry_risks": industry_risks,
            "risk_data": risk_data,
            "analysis_summary": analysis
        } 