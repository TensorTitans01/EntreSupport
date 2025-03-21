from flask import Flask, render_template, request, jsonify
from crew import BusinessAdvisor
import json

app = Flask(__name__)
advisor = BusinessAdvisor()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    business_idea = data.get('business_idea', '')
    analysis_type = data.get('analysis_type', 'full')

    try:
        if analysis_type == 'validation':
            result = advisor.validate_idea(business_idea)
            result_data = str(result)
        elif analysis_type == 'market_research':
            result = advisor.conduct_market_research(business_idea)
            result_data = str(result)
        else:  # full analysis
            result = advisor.get_full_business_analysis(business_idea)
            result_data = {
                'validation_analysis': str(result['validation_analysis']),
                'market_research': str(result['market_research'])
            }
        
        return jsonify({
            'success': True,
            'result': result_data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
