export class AICopilot {
  constructor() {
    this.conversationHistory = this.loadHistory()
  }

  loadHistory() {
    const saved = localStorage.getItem('biggwork_copilot_history')
    return saved ? JSON.parse(saved) : []
  }

  saveHistory() {
    localStorage.setItem('biggwork_copilot_history', JSON.stringify(this.conversationHistory))
  }

  async askQuestion(question, context = {}) {
    const response = await this.generateResponse(question, context)
    
    const conversation = {
      id: `conv_${Date.now()}`,
      question,
      response,
      context,
      timestamp: new Date().toISOString()
    }

    this.conversationHistory.push(conversation)
    this.saveHistory()
    return response
  }

  async generateResponse(question, context) {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('candidate') || lowerQuestion.includes('hire') || lowerQuestion.includes('should i')) {
      return this.generateHiringRecommendation(question, context)
    }
    
    if (lowerQuestion.includes('role') || lowerQuestion.includes('job description') || lowerQuestion.includes('jd')) {
      return this.generateRoleAdvice(question, context)
    }
    
    if (lowerQuestion.includes('compensation') || lowerQuestion.includes('salary') || lowerQuestion.includes('offer')) {
      return this.generateCompensationAdvice(question, context)
    }
    
    if (lowerQuestion.includes('interview') || lowerQuestion.includes('question')) {
      return this.generateInterviewAdvice(question, context)
    }
    
    if (lowerQuestion.includes('onboarding') || lowerQuestion.includes('new hire')) {
      return this.generateOnboardingAdvice(question, context)
    }
    
    return this.generateGeneralAdvice(question, context)
  }

  generateHiringRecommendation(question, context) {
    const companyDNA = JSON.parse(localStorage.getItem('biggwork_company') || '{}')
    
    return {
      type: 'recommendation',
      answer: `Based on your company DNA (${companyDNA.stage || 'seed'} stage, ${companyDNA.values?.join(', ') || 'startup values'}), I recommend:

1. **Focus on Stage Fit**: Look for candidates with experience at similar startup stages
2. **Culture Alignment**: Prioritize candidates who demonstrate ${companyDNA.values?.[0] || 'ownership'} mindset
3. **Builder Mindset**: Assess for entrepreneurial thinking and ownership
4. **Velocity Match**: Ensure candidate can operate at startup speed

Would you like me to analyze a specific candidate or help refine your hiring criteria?`,
      suggestions: [
        'Analyze candidate fit score',
        'Generate interview questions',
        'Review compensation benchmarks',
        'Check market competition'
      ],
      confidence: 0.85
    }
  }

  generateRoleAdvice(question, context) {
    return {
      type: 'advice',
      answer: `For creating effective role definitions:

1. **Start with Company DNA**: Align role requirements with your stage and culture
2. **Define Outcomes, Not Tasks**: Focus on what success looks like (30/60/90 days)
3. **Stage-Appropriate Expectations**: Don't ask for Series B experience at seed stage
4. **Builder Qualities**: Include ownership, velocity, and growth mindset
5. **Red Flags to Avoid**: List what you're NOT looking for

I can help you generate a job description based on your company DNA. Would you like me to create one?`,
      suggestions: [
        'Generate job description',
        'Review role requirements',
        'Check market benchmarks',
        'Identify red flags'
      ],
      confidence: 0.90
    }
  }

  generateCompensationAdvice(question, context) {
    const companyDNA = JSON.parse(localStorage.getItem('biggwork_company') || '{}')
    const stage = companyDNA.stage || 'seed'
    
    return {
      type: 'advice',
      answer: `For ${stage.replace('_', ' ')} stage compensation:

1. **Equity is Key**: At early stages, equity often matters more than cash
2. **Market Benchmarks**: Use Talent Market Intelligence to check current rates
3. **Stage Adjustment**: Early-stage typically 80-90% of market rate + higher equity
4. **Total Package**: Consider equity value, benefits, and growth potential
5. **Competitive Analysis**: Check what competitors are offering

I can pull current market data for your specific role and stage. Would you like me to do that?`,
      suggestions: [
        'Get compensation benchmarks',
        'Calculate equity package',
        'Compare with market',
        'Generate offer letter'
      ],
      confidence: 0.88
    }
  }

  generateInterviewAdvice(question, context) {
    return {
      type: 'advice',
      answer: `For effective interviews:

1. **Stage-Specific Questions**: Ask about experience at similar startup stages
2. **Culture Deep-Dive**: Assess builder mindset and ownership
3. **Behavioral Scenarios**: Use real startup situations
4. **Velocity Assessment**: Understand their pace and decision-making
5. **Red Flag Detection**: Watch for stage mismatch, culture concerns

I can generate stage-specific interview questions based on your company DNA. Would you like me to create a question set?`,
      suggestions: [
        'Generate interview questions',
        'Create interview guide',
        'Assess candidate responses',
        'Review interview feedback'
      ],
      confidence: 0.87
    }
  }

  generateOnboardingAdvice(question, context) {
    return {
      type: 'advice',
      answer: `For successful onboarding:

1. **Builder Mode Activation**: Start culture immersion in first 30 days
2. **Alignment Checkpoints**: Assess at 7/30/60/90 days
3. **Early Warning System**: Monitor for misalignment signals
4. **Personalized Plan**: Use company DNA to customize onboarding
5. **Quick Wins**: Set up early successes to build confidence

I can help create a personalized onboarding plan. Would you like me to generate one?`,
      suggestions: [
        'Create onboarding plan',
        'Set up checkpoints',
        'Review onboarding progress',
        'Identify risks'
      ],
      confidence: 0.89
    }
  }

  generateGeneralAdvice(question, context) {
    return {
      type: 'general',
      answer: `I'm here to help with all aspects of hiring and talent management:

- **Hiring Decisions**: Candidate evaluation and recommendations
- **Role Definition**: Job descriptions and requirements
- **Compensation**: Market benchmarks and offer advice
- **Interviews**: Question generation and assessment
- **Onboarding**: Personalized plans and checkpoints
- **Performance**: Goal setting and feedback
- **Exit Management**: Risk prediction and offboarding

What specific area would you like help with?`,
      suggestions: [
        'Help with hiring',
        'Create job description',
        'Review candidate',
        'Get market data'
      ],
      confidence: 0.75
    }
  }

  getConversationHistory() {
    return this.conversationHistory.slice(-10)
  }

  clearHistory() {
    this.conversationHistory = []
    this.saveHistory()
  }
}

