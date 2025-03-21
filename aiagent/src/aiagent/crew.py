from crewai import Agent, Task, Crew

class BusinessAdvisor:
    def __init__(self):
        # Idea Validation Agent
        self.idea_validation_agent = Agent(
            name="Idea Validation Specialist",
            role="Quick business idea validation expert",
            goal="Provide concise validation of business ideas focusing on key aspects only",
            backstory="""Expert at quickly assessing business ideas and providing actionable insights in a brief format. 
            Focuses on the most critical aspects that determine an idea's viability.""",
            allow_delegation=True,
            verbose=True
        )

        # Market Research Agent
        self.market_research_agent = Agent(
            name="Market Research Analyst",
            role="Quick market analysis specialist",
            goal="Provide brief but insightful market analysis focusing on key factors",
            backstory="""Expert at quickly analyzing markets and competition to provide essential insights. 
            Specializes in identifying the most important market factors and opportunities.""",
            allow_delegation=True,
            verbose=True
        )

        # Tasks for Each Agent
        self.idea_validation_task = Task(
            description="""Provide a brief validation analysis of this business idea: {business_idea}
            
            Give a concise analysis (max 5 sentences per point) covering only:
            1. Quick viability assessment
            2. Key strength
            3. Main challenge/risk
            4. One key recommendation""",
            expected_output="""A brief, bullet-point validation report focusing only on the most critical insights. 
            Keep each point concise and actionable.""",
            agent=self.idea_validation_agent
        )

        self.market_research_task = Task(
            description="""Provide quick market insights for: {business_idea}
            
            Give a brief analysis (max 5 sentences per point) covering only:
            1. Target market size and potential (1-2 key statistics)
            2. Main competitor or competitive advantage
            3. Key market trend
            4. One growth opportunity""",
            expected_output="""A brief, bullet-point market analysis focusing only on the most important factors. 
            Keep each point concise and data-focused.""",
            agent=self.market_research_agent
        )

        # Individual Crews for Each Function
        self.validation_crew = Crew(
            agents=[self.idea_validation_agent],
            tasks=[self.idea_validation_task],
            verbose=True
        )

        self.research_crew = Crew(
            agents=[self.market_research_agent],
            tasks=[self.market_research_task],
            verbose=True
        )

    def validate_idea(self, business_idea):
        """Validate a business idea with brief analysis."""
        results = self.validation_crew.kickoff(inputs={"business_idea": business_idea})
        return results if results else "No validation analysis generated."

    def conduct_market_research(self, business_idea):
        """Conduct quick market research for the business idea."""
        results = self.research_crew.kickoff(inputs={"business_idea": business_idea})
        return results if results else "No market research generated."

    def get_full_business_analysis(self, business_idea):
        """Get both brief validation and market analysis."""
        validation_results = self.validate_idea(business_idea)
        market_research_results = self.conduct_market_research(business_idea)
        
        return {
            "validation_analysis": validation_results,
            "market_research": market_research_results
        }

