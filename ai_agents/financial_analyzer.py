from crewai import Agent
from serper_dev import SerperDev
from firecrawl import Firecrawl
from typing import Dict, List
from datetime import datetime

class FinancialAnalyzer:
    def __init__(self):
        self.serper = SerperDev()
        self.firecrawl = Firecrawl()
        
    def create_agent(self) -> Agent:
        return Agent(
            role='Financial Analyst',
            goal='Analyze financial performance and health of startups',
            backstory="""You are an experienced financial analyst specializing in 
            startup valuation and financial health assessment. You have expertise in 
            analyzing financial metrics and identifying key performance indicators.""",
            tools=[self.serper.search, self.firecrawl.scrape],
            verbose=True
        )
    
    async def analyze_financials(self, startup_data: Dict) -> Dict:
        agent = self.create_agent()
        
        # Search for financial benchmarks
        benchmarks = await agent.execute(
            f"Search for financial benchmarks and KPIs in {startup_data['industry']} industry"
        )
        
        # Scrape detailed financial data
        financial_data = await agent.execute(
            f"Scrape financial performance data for similar startups in {startup_data['industry']}"
        )
        
        # Generate financial analysis
        analysis = await agent.execute(
            f"""Based on the financial data, provide:
            1. Revenue metrics and growth
            2. Cost structure analysis
            3. Profitability assessment
            4. Financial health score (0-1)
            5. Key findings
            For {startup_data['name']}"""
        )
        
        return {
            "timestamp": datetime.now().isoformat(),
            "startup_name": startup_data["name"],
            "industry_benchmarks": benchmarks,
            "financial_data": financial_data,
            "analysis_summary": analysis
        } 