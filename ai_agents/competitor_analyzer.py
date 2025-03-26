from crewai import Agent
from serper_dev import SerperDev
from firecrawl import Firecrawl
from typing import Dict, List
from datetime import datetime

class CompetitorAnalyzer:
    def __init__(self):
        self.serper = SerperDev()
        self.firecrawl = Firecrawl()
        
    def create_agent(self) -> Agent:
        return Agent(
            role='Competitive Intelligence Analyst',
            goal='Analyze competitive landscape and market positioning',
            backstory="""You are a competitive intelligence expert who excels at 
            analyzing market competition, identifying key players, and evaluating 
            competitive advantages and threats.""",
            tools=[self.serper.search, self.firecrawl.scrape],
            verbose=True
        )
    
    async def analyze_competitors(self, startup_data: Dict) -> Dict:
        agent = self.create_agent()
        
        # Search for competitors
        competitors = await agent.execute(
            f"Search for main competitors and market players in {startup_data['industry']} industry"
        )
        
        # Scrape competitor details
        competitor_details = await agent.execute(
            f"Scrape detailed information about top competitors in {startup_data['industry']}"
        )
        
        # Generate competitive analysis
        analysis = await agent.execute(
            f"""Based on the competitor data, provide:
            1. Key competitors and their market share
            2. Competitive advantages and disadvantages
            3. Market positioning analysis
            4. Competition score (0-1)
            5. Key insights
            For {startup_data['name']}"""
        )
        
        return {
            "timestamp": datetime.now().isoformat(),
            "startup_name": startup_data["name"],
            "competitor_list": competitors,
            "competitor_details": competitor_details,
            "analysis_summary": analysis
        } 