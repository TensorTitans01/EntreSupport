import asyncio
from orchestrator import StartupAnalysisOrchestrator

async def main():
    # Initialize the orchestrator
    orchestrator = StartupAnalysisOrchestrator()
    
    # Example startup data
    startup_data = {
        "name": "TechStart",
        "industry": "AI/ML",
        "description": "AI-powered business analytics platform"
    }
    
    # Run the analysis
    results = await orchestrator.analyze_startup(startup_data)
    
    # Print results
    print("\nStartup Analysis Results:")
    print(f"Startup: {results['startup_name']}")
    print(f"Industry: {results['industry']}")
    print(f"Overall Score: {results['overall_score']}")
    
    print("\nDetailed Analysis:")
    for result in results['analysis_results']:
        print(f"\n{result['category']}:")
        print(result['analysis_summary'])

if __name__ == "__main__":
    asyncio.run(main()) 