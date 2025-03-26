# EntreSupport - AI-Powered Startup Analysis Platform 🚀

EntreSupport is an intelligent platform that leverages AI to provide comprehensive startup analysis and insights. Our system uses advanced AI agents to evaluate market conditions, financial health, competitive landscape, and risk factors for startups.

## 🌟 Features

### AI-Powered Analysis
- **Market Analysis** 📊
  - Market size and growth potential
  - Industry trends and opportunities
  - Market entry barriers
  - Real-time market data using SerperDev

- **Financial Assessment** 💰
  - Revenue metrics and growth analysis
  - Cost structure evaluation
  - Profitability assessment
  - Industry benchmarking

- **Competitor Intelligence** 🎯
  - Competitive landscape mapping
  - Market positioning analysis
  - Competitor strengths and weaknesses
  - Market share analysis

- **Risk Assessment** ⚠️
  - Risk factor identification
  - Mitigation strategies
  - Industry-specific risk analysis
  - Future risk predictions

### Technical Features
- CrewAI-based agent system
- Real-time web scraping with Firecrawl
- Intelligent web search using SerperDev
- Asynchronous processing
- Comprehensive scoring system

## 🛠️ Technology Stack

- **Frontend**
  - React/TypeScript
  - Tailwind CSS
  - Shadcn UI Components

- **Backend**
  - Python
  - CrewAI
  - Firecrawl
  - SerperDev API

## 📋 Prerequisites

```bash
# Node.js dependencies
npm install

# Python dependencies
pip install -r ai_agents/requirements.txt
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/TensorTitans01/EntreSupport.git
cd EntreSupport
```

2. **Set up environment variables**
```bash
# Create .env file
touch .env

# Add your API keys
SERPER_API_KEY=your_serper_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

3. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install Python dependencies
pip install -r ai_agents/requirements.txt
```

4. **Run the application**
```bash
# Start frontend
npm run dev

# Start backend
python backend/app.py
```

## 🔄 Workflow

1. **Data Collection**
   - Web scraping using Firecrawl
   - Market research using SerperDev
   - Financial data analysis

2. **AI Analysis**
   - Market analysis agent evaluation
   - Financial metrics assessment
   - Competitor analysis processing
   - Risk factor identification

3. **Report Generation**
   - Comprehensive analysis report
   - Actionable insights
   - Risk mitigation strategies
   - Growth opportunities

## 📊 Example Usage

```python
import asyncio
from ai_agents.orchestrator import StartupAnalysisOrchestrator

async def analyze_startup():
    orchestrator = StartupAnalysisOrchestrator()
    
    startup_data = {
        "name": "TechStart",
        "industry": "AI/ML",
        "description": "AI-powered business analytics platform"
    }
    
    results = await orchestrator.analyze_startup(startup_data)
    print(f"Analysis Score: {results['overall_score']}")

asyncio.run(analyze_startup())
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CrewAI for the agent framework
- SerperDev for search capabilities
- Firecrawl for web scraping
- All contributors and supporters



---

<p align="center">Made with ❤️ by Nocturnauts</p> 