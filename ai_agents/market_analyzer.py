from typing import Dict, List
import numpy as np
from datetime import datetime
from crewai import Agent
from serper_dev import SerperDev
from firecrawl import Firecrawl

class MarketAnalyzer:
    def __init__(self):
        self.serper = SerperDev()
        self.firecrawl = Firecrawl()
        self.market_trends = {}
        self.industry_metrics = {}
        
    def create_agent(self) -> Agent:
        return Agent(
            role='Market Research Analyst',
            goal='Analyze market conditions and opportunities for startups',
            backstory="""You are an expert market research analyst with deep knowledge 
            of startup ecosystems and market dynamics. You excel at identifying market 
            opportunities and analyzing industry trends.""",
            tools=[self.serper.search, self.firecrawl.scrape],
            verbose=True
        )
    
    async def analyze_market(self, startup_data: Dict) -> Dict:
        agent = self.create_agent()
        
        # Search for market data
        market_search = await agent.execute(
            f"Search for market size, growth rate, and trends in {startup_data['industry']} industry"
        )
        
        # Scrape detailed market information
        market_details = await agent.execute(
            f"Scrape detailed market analysis for {startup_data['industry']} from industry reports"
        )
        
        # Generate market analysis
        analysis = await agent.execute(
            f"""Based on the market data, provide:
            1. Market size and growth rate
            2. Key trends and opportunities
            3. Market score (0-1)
            4. Key insights
            For {startup_data['industry']} industry"""
        )
        
        return {
            "timestamp": datetime.now().isoformat(),
            "industry": startup_data["industry"],
            "market_data": market_search,
            "detailed_analysis": market_details,
            "analysis_summary": analysis
        }
    
    def analyze_market_data(self, market_data: Dict, industry: str) -> Dict:
        """
        Analyzes market conditions and opportunities for the startup
        """
        market_analysis = {
            "timestamp": datetime.now().isoformat(),
            "industry": industry,
            "market_metrics": {},
            "growth_potential": 0.0,
            "market_score": 0.0,
            "key_insights": []
        }
        
        # Analyze market size and growth
        market_size = market_data.get("market_size", 0)
        growth_rate = market_data.get("growth_rate", 0)
        market_analysis["market_metrics"]["size"] = market_size
        market_analysis["market_metrics"]["growth_rate"] = growth_rate
        
        # Calculate market score based on size and growth
        size_score = min(market_size / 1000000000, 1.0)  # Normalize to 1B market size
        growth_score = min(growth_rate / 0.2, 1.0)  # Normalize to 20% growth rate
        market_analysis["market_score"] = (size_score * 0.6 + growth_score * 0.4)
        
        # Analyze market trends
        trends = self._analyze_trends(market_data.get("trends", []))
        market_analysis["market_metrics"]["trends"] = trends
        
        # Calculate growth potential
        market_analysis["growth_potential"] = self._calculate_growth_potential(
            market_size,
            growth_rate,
            trends
        )
        
        # Generate key insights
        market_analysis["key_insights"] = self._generate_insights(
            market_analysis["market_metrics"],
            market_analysis["growth_potential"]
        )
        
        return market_analysis
    
    def _analyze_trends(self, trends_data: List[Dict]) -> Dict:
        """
        Analyzes market trends and their impact
        """
        trend_analysis = {
            "positive_trends": [],
            "negative_trends": [],
            "neutral_trends": [],
            "trend_impact_score": 0.0
        }
        
        for trend in trends_data:
            impact = trend.get("impact", 0)
            if impact > 0.3:
                trend_analysis["positive_trends"].append(trend)
            elif impact < -0.3:
                trend_analysis["negative_trends"].append(trend)
            else:
                trend_analysis["neutral_trends"].append(trend)
                
        # Calculate overall trend impact score
        if trends_data:
            impacts = [t.get("impact", 0) for t in trends_data]
            trend_analysis["trend_impact_score"] = np.mean(impacts)
            
        return trend_analysis
    
    def _calculate_growth_potential(self, market_size: float, growth_rate: float,
                                 trends: Dict) -> float:
        """
        Calculates the growth potential score
        """
        base_potential = min(market_size * growth_rate / 100000000, 1.0)
        trend_impact = trends.get("trend_impact_score", 0)
        
        # Adjust growth potential based on trend impact
        adjusted_potential = base_potential * (1 + trend_impact)
        return max(0.0, min(1.0, adjusted_potential))
    
    def _generate_insights(self, market_metrics: Dict, growth_potential: float) -> List[str]:
        """
        Generates key market insights
        """
        insights = []
        
        if market_metrics.get("growth_rate", 0) > 0.15:
            insights.append("High-growth market with significant expansion opportunities")
            
        if market_metrics.get("trends", {}).get("trend_impact_score", 0) > 0.5:
            insights.append("Strong positive market trends indicate favorable conditions")
            
        if growth_potential > 0.7:
            insights.append("Exceptional growth potential with favorable market dynamics")
            
        return insights 