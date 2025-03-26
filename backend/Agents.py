import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM
from crewai_tools import SerperDevTool
import json

# Load environment variables
load_dotenv()

# Set environment variables
os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")

# Initialize LLM
llm = LLM(
    model="gemini/gemini-2.0-flash"
)

# Initialize search tool if API key is available
search_tool = None
if os.getenv("SERPER_API_KEY"):
    search_tool = SerperDevTool(api_key=os.getenv("SERPER_API_KEY"))

def parse_task_output(output):
    """Parse task output into a dictionary"""
    if hasattr(output, 'raw_output'):
        try:
            return json.loads(output.raw_output)
        except json.JSONDecodeError:
            return {"raw_response": output.raw_output}
    elif isinstance(output, str):
        try:
            return json.loads(output)
        except json.JSONDecodeError:
            return {"raw_response": output}
    elif isinstance(output, dict):
        return output
    return {"raw_response": str(output)}

class StartupResearchWorkflow:
    def __init__(self):
        """Initialize the startup research workflow"""
        self.llm = llm
        self.search_tool = search_tool
        
    def create_agents(self):
        """Create the agents for the workflow"""
        tools = [self.search_tool] if self.search_tool else []
        
        researcher = Agent(
            role='Market Research Analyst',
            goal='Conduct thorough market research and competitive analysis',
            backstory="""You are an experienced market research analyst with expertise in 
            startup ecosystems and industry analysis. You use data-driven approaches to 
            uncover market opportunities and challenges.""",
            tools=tools,
            llm=self.llm,
            verbose=True
        )

        strategist = Agent(
            role='Business Strategist',
            goal='Analyze business potential and provide strategic recommendations',
            backstory="""You are a seasoned business strategist who has helped numerous 
            startups succeed. You excel at identifying strengths, weaknesses, opportunities, 
            and threats.""",
            llm=self.llm,
            verbose=True
        )

        team_advisor = Agent(
            role='Team Building Consultant',
            goal='Recommend optimal team structure and key roles',
            backstory="""You are an expert in startup team building and organizational 
            development. You help founders build effective teams by identifying crucial 
            roles and required skill sets.""",
            llm=self.llm,
            verbose=True
        )
        
        return researcher, strategist, team_advisor
    
    def create_tasks(self, agents, startup_idea):
        """Create tasks for each agent based on the startup idea"""
        researcher, strategist, team_advisor = agents
        
        research_task = Task(
            description=f"""Analyze the following startup idea and provide detailed market research:
            {startup_idea}
            
            Include:
            1. Market size and growth potential
            2. Key competitors and their strengths
            3. Current market trends
            4. Cite your sources""",
            expected_output="""JSON object with the following structure:
            {
                "marketSize": {"value": "string", "year": number, "cagr": "string"},
                "competitors": [{"name": "string", "description": "string", "strengths": ["string"]}],
                "trends": ["string"],
                "sources": ["string"]
            }""",
            agent=researcher
        )

        team_task = Task(
            description=f"""Based on this startup idea, recommend the essential team members needed:
            {startup_idea}
            
            For each role, provide:
            1. Role title
            2. Key responsibilities
            3. Required skills
            4. Estimated salary range
            5. Priority level (High/Medium/Low)""",
            expected_output="""JSON array with the following structure:
            [{
                "role": "string",
                "description": "string",
                "keySkills": ["string"],
                "estimatedSalary": "string",
                "priority": "string"
            }]""",
            agent=team_advisor
        )

        swot_task = Task(
            description=f"""Conduct a SWOT analysis for this startup idea:
            {startup_idea}""",
            expected_output="""JSON object with the following structure:
            {
                "strengths": ["string"],
                "weaknesses": ["string"],
                "opportunities": ["string"],
                "threats": ["string"]
            }""",
            agent=strategist
        )
        
        return [research_task, team_task, swot_task]
    
    def run_analysis(self, startup_idea):
        """Run the complete analysis workflow"""
        agents = self.create_agents()
        tasks = self.create_tasks(agents, startup_idea)
        
        crew = Crew(
            agents=list(agents),
            tasks=tasks,
            process=Process.sequential,
            verbose=True
        )
        
        results = crew.kickoff()
        
        # Process results
        try:
            # Parse each task's output
            market_research = parse_task_output(tasks[0].output)
            team_resources = parse_task_output(tasks[1].output)
            if not isinstance(team_resources, list):
                team_resources = [team_resources]
            swot_analysis = parse_task_output(tasks[2].output)
            
        except Exception as e:
            print(f"Error processing results: {e}")
            # Provide fallback values
            market_research = {"error": f"Could not parse market research: {str(e)}"}
            team_resources = [{"error": f"Could not parse team resources: {str(e)}"}]
            swot_analysis = {"error": f"Could not parse SWOT analysis: {str(e)}"}
        
        return {
            "marketResearch": market_research,
            "teamResources": team_resources,
            "swotAnalysis": swot_analysis,
            "rawResults": str(results)  # Include raw results for debugging
        }

def format_json_for_display(json_data):
    """Format JSON data for better display in Streamlit"""
    if isinstance(json_data, str):
        try:
            return json.loads(json_data)
        except json.JSONDecodeError:
            return json_data
    return json_data