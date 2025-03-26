import os
import sys
import json
import traceback
import streamlit as st
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import the market research workflow
from Agents import StartupResearchWorkflow, format_json_for_display

def main():
    st.set_page_config(
        page_title="Startup Analyzer AI",
        page_icon="🚀",
        layout="wide"
    )

    st.title("🚀 Startup Idea Analyzer")
    st.markdown("Get comprehensive analysis of your startup idea using AI agents")

    # Check for API keys
    if not os.getenv("GEMINI_API_KEY"):
        st.error("⚠️ Gemini API key not found. Please set GEMINI_API_KEY in your .env file.")
        return
    
    if not os.getenv("SERPER_API_KEY"):
        st.warning("⚠️ Serper API key not found. The search tool will be disabled. Set SERPER_API_KEY in your .env file for enhanced research capabilities.")
    
    # Sidebar configuration
    st.sidebar.header("Configuration")
    analysis_detail = st.sidebar.radio(
        "Analysis Detail Level",
        ["Basic", "Standard", "Comprehensive"],
        index=1
    )
    
    # Main input area
    st.subheader("Your Startup Idea")
    startup_idea = st.text_area(
        "Describe your startup idea in detail",
        height=150,
        placeholder="Example: A subscription-based platform that delivers personalized healthy meal kits to busy professionals, with AI-driven nutritional planning and zero-waste packaging..."
    )
    
    col1, col2 = st.columns([1, 5])
    with col1:
        analyze_button = st.button("Analyze Idea", type="primary")
    with col2:
        if analyze_button:
            if not startup_idea:
                st.error("Please enter a startup idea to analyze")
            else:
                run_analysis(startup_idea, analysis_detail)

    # Footer
    st.sidebar.markdown("---")
    st.sidebar.info("This tool uses AI agents to analyze startup ideas. The analysis includes market research, team recommendations, and SWOT analysis.")

def run_analysis(startup_idea, detail_level):
    """Run the startup idea analysis with CrewAI agents"""
    try:
        analysis_start = st.empty()
        analysis_start.info("🔍 Starting analysis... This may take several minutes depending on the detail level.")
        
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        # Initialize the workflow
        status_text.text("Initializing AI agents...")
        progress_bar.progress(10)
        workflow = StartupResearchWorkflow()
        
        # Run the analysis
        status_text.text("Conducting market research and competitive analysis...")
        progress_bar.progress(30)
        
        # Analysis timeout based on detail level
        timeout_map = {"Basic": 120, "Standard": 240, "Comprehensive": 360}
        timeout = timeout_map.get(detail_level, 240)
        
        results = workflow.run_analysis(startup_idea)
        progress_bar.progress(100)
        status_text.text("Analysis complete!")
        analysis_start.success("✅ Analysis completed successfully!")
        
        # Display results
        display_results(results)
        
    except Exception as e:
        st.error(f"An error occurred during analysis: {str(e)}")
        st.error(traceback.format_exc())

def display_results(results):
    """Display the analysis results in a structured format"""
    # Create tabs for different sections
    tab1, tab2, tab3 = st.tabs(["📊 Market Research", "👥 Team Resources", "📈 SWOT Analysis"])
    
    with tab1:
        st.header("Market Research")
        market_data = results.get("marketResearch", {})
        
        # Market size
        if "marketSize" in market_data:
            market_size = market_data["marketSize"]
            st.subheader("Market Size")
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Market Value", market_size.get("value", "N/A"))
            with col2:
                st.metric("Year", market_size.get("year", "N/A"))
            with col3:
                st.metric("CAGR", market_size.get("cagr", "N/A"))
                
        # Competitors
        if "competitors" in market_data:
            st.subheader("Key Competitors")
            for i, competitor in enumerate(market_data["competitors"]):
                with st.expander(f"{competitor.get('name', f'Competitor {i+1}')}"):
                    st.write(competitor.get('description', 'No description available'))
                    st.subheader("Strengths")
                    strengths = competitor.get('strengths', [])
                    if strengths:
                        for strength in strengths:
                            st.markdown(f"- {strength}")
                    else:
                        st.write("No strengths listed")
        
        # Trends
        if "trends" in market_data:
            st.subheader("Current Market Trends")
            for trend in market_data["trends"]:
                st.markdown(f"- {trend}")
                
        # Sources
        if "sources" in market_data:
            st.subheader("Sources")
            for source in market_data["sources"]:
                st.markdown(f"- {source}")
                
        # If we have error data instead
        if "error" in market_data:
            st.error(market_data["error"])
            st.json(market_data)
    
    with tab2:
        st.header("Recommended Team Structure")
        team_data = results.get("teamResources", [])
        
        if isinstance(team_data, list) and len(team_data) > 0:
            # Create columns for filtering
            col1, col2 = st.columns(2)
            with col1:
                priority_filter = st.multiselect(
                    "Filter by Priority",
                    ["High", "Medium", "Low"],
                    default=["High", "Medium", "Low"]
                )
            
            # Display team members in cards
            for role in team_data:
                # Skip if doesn't match filter
                if "priority" in role and role["priority"] not in priority_filter:
                    continue
                    
                with st.expander(f"{role.get('role', 'Team Member')} ({role.get('priority', 'N/A')} Priority)"):
                    st.write(role.get('description', 'No description available'))
                    
                    st.subheader("Key Skills")
                    skills = role.get('keySkills', [])
                    if skills:
                        for skill in skills:
                            st.markdown(f"- {skill}")
                    else:
                        st.write("No skills listed")
                        
                    st.metric("Estimated Salary", role.get('estimatedSalary', 'N/A'))
        else:
            if isinstance(team_data, list) and "error" in team_data[0]:
                st.error(team_data[0]["error"])
            st.json(team_data)
    
    with tab3:
        st.header("SWOT Analysis")
        swot_data = results.get("swotAnalysis", {})
        
        if not "error" in swot_data:
            # Create a 2x2 grid for SWOT
            col1, col2 = st.columns(2)
            
            with col1:
                # Strengths
                st.subheader("💪 Strengths")
                strengths = swot_data.get("strengths", [])
                for strength in strengths:
                    st.success(f"✓ {strength}")
                    
                # Weaknesses
                st.subheader("🔍 Weaknesses")
                weaknesses = swot_data.get("weaknesses", [])
                for weakness in weaknesses:
                    st.error(f"✗ {weakness}")
            
            with col2:
                # Opportunities
                st.subheader("🚀 Opportunities")
                opportunities = swot_data.get("opportunities", [])
                for opportunity in opportunities:
                    st.info(f"➤ {opportunity}")
                
                # Threats
                st.subheader("⚠️ Threats")
                threats = swot_data.get("threats", [])
                for threat in threats:
                    st.warning(f"! {threat}")
        else:
            st.error(swot_data["error"])
            st.json(swot_data)
    
    # Advanced: Raw data viewing for debugging
    with st.expander("View Raw Response Data"):
        st.json(results)

if __name__ == "__main__":
    main()