from crewai import Crew, Process
from typing import Dict, List
from datetime import datetime
from market_analyzer import MarketAnalyzer
from financial_analyzer import FinancialAnalyzer
from competitor_analyzer import CompetitorAnalyzer
from risk_assessor import RiskAssessor

class StartupAnalysisOrchestrator:
    def __init__(self):
        self.market_analyzer = MarketAnalyzer()
        self.financial_analyzer = FinancialAnalyzer()
        self.competitor_analyzer = CompetitorAnalyzer()
        self.risk_assessor = RiskAssessor()
        
    async def analyze_startup(self, startup_data: Dict) -> Dict:
        """
        Orchestrates the complete startup analysis process using CrewAI
        """
        # Create agents
        market_agent = self.market_analyzer.create_agent()
        financial_agent = self.financial_analyzer.create_agent()
        competitor_agent = self.competitor_analyzer.create_agent()
        risk_agent = self.risk_assessor.create_agent()
        
        # Create crew with agents
        crew = Crew(
            agents=[market_agent, financial_agent, competitor_agent, risk_agent],
            tasks=[
                self._create_market_analysis_task(startup_data),
                self._create_financial_analysis_task(startup_data),
                self._create_competitor_analysis_task(startup_data),
                self._create_risk_assessment_task(startup_data)
            ],
            process=Process.sequential
        )
        
        # Execute analysis
        results = await crew.kickoff()
        
        # Compile final report
        return {
            "timestamp": datetime.now().isoformat(),
            "startup_name": startup_data["name"],
            "industry": startup_data["industry"],
            "analysis_results": results,
            "overall_score": self._calculate_overall_score(results)
        }
    
    def _create_market_analysis_task(self, startup_data: Dict) -> str:
        return f"""Analyze market conditions for {startup_data['name']} in {startup_data['industry']}:
        1. Market size and growth potential
        2. Industry trends and opportunities
        3. Market entry barriers
        4. Market score (0-1)"""
    
    def _create_financial_analysis_task(self, startup_data: Dict) -> str:
        return f"""Analyze financial aspects for {startup_data['name']}:
        1. Revenue metrics and growth
        2. Cost structure and efficiency
        3. Profitability assessment
        4. Financial health score (0-1)"""
    
    def _create_competitor_analysis_task(self, startup_data: Dict) -> str:
        return f"""Analyze competitive landscape for {startup_data['name']}:
        1. Key competitors and market share
        2. Competitive advantages
        3. Market positioning
        4. Competition score (0-1)"""
    
    def _create_risk_assessment_task(self, startup_data: Dict) -> str:
        return f"""Assess risks for {startup_data['name']}:
        1. Key risk factors
        2. Risk mitigation strategies
        3. Risk score (0-1)
        4. Recommendations"""
    
    def _calculate_overall_score(self, results: List[Dict]) -> float:
        """
        Calculate overall startup score based on all analysis components
        """
        weights = {
            "market": 0.3,
            "financial": 0.25,
            "competition": 0.25,
            "risk": 0.2
        }
        
        scores = {
            "market": self._extract_score(results, "market"),
            "financial": self._extract_score(results, "financial"),
            "competition": self._extract_score(results, "competition"),
            "risk": self._extract_score(results, "risk")
        }
        
        overall_score = sum(score * weights[category] 
                          for category, score in scores.items())
        
        return round(overall_score, 2)
    
    def _extract_score(self, results: List[Dict], category: str) -> float:
        """
        Extract score from results for a specific category
        """
        for result in results:
            if category in result.get("category", "").lower():
                return float(result.get("score", 0))
        return 0.0 