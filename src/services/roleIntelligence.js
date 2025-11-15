// Role Intelligence Engine
export class RoleIntelligence {
  generateRole(companyDNA, roleTitle, department) {
    return {
      title: roleTitle,
      department,
      priority: this.determinePriority(companyDNA, roleTitle),
      purpose: this.getPurpose(companyDNA, roleTitle),
      mustHaves: this.getMustHaves(companyDNA, roleTitle),
      redFlags: this.getRedFlags(companyDNA, roleTitle),
      expectedOutcomes: this.getExpectedOutcomes(roleTitle),
      interviewQuestions: this.generateInterviewQuestions(companyDNA, roleTitle),
    }
  }

  getMustHaves(companyDNA, roleTitle) {
    const mustHaves = [`Experience at ${companyDNA.stage} stage`, 'Builder mindset and ownership']
    if (roleTitle.toLowerCase().includes('sales')) {
      mustHaves.push('Built sales from 0-1', 'High velocity mindset')
    }
    return mustHaves
  }

  getRedFlags(companyDNA, roleTitle) {
    return ['Only enterprise experience', 'Requires large team', 'Slow decision maker']
  }

  getExpectedOutcomes(roleTitle) {
    return {
      '30_days': 'Onboarding complete, first contributions made',
      '60_days': 'Key processes established, measurable impact',
      '90_days': 'Full ownership, targets on track',
    }
  }

  generateInterviewQuestions(companyDNA, roleTitle) {
    return [
      {
        type: 'culture',
        question: 'How do you handle ambiguity and rapid change?',
        purpose: 'Assess chaos tolerance and builder mindset',
      },
      {
        type: 'stage',
        question: `Tell me about your experience at ${companyDNA.stage} stage companies.`,
        purpose: 'Verify stage-fit experience',
      },
    ]
  }

  determinePriority(companyDNA, roleTitle) {
    const isHighPriority = companyDNA.hiringPriorities?.some(p => 
      p.role.toLowerCase().includes(roleTitle.toLowerCase())
    )
    return isHighPriority ? 'high' : 'medium'
  }

  getPurpose(companyDNA, roleTitle) {
    return `Build and lead ${roleTitle} function for ${companyDNA.stage} stage startup`
  }

  generateJD(roleIntelligence, companyDNA) {
    return `# ${roleIntelligence.title}

## About the Role
We're looking for a ${roleIntelligence.title} to join our ${companyDNA.stage} stage startup.

## What You'll Do
- Build and own the ${roleIntelligence.title} function from the ground up
- Work directly with founders to execute on vision
- Move fast, iterate quickly, and own outcomes

## What We're Looking For
${roleIntelligence.mustHaves.map(m => `- ${m}`).join('\n')}

## Red Flags (This role is NOT for you if):
${roleIntelligence.redFlags.map(r => `- ${r}`).join('\n')}

## Expected Outcomes
- **30 days**: ${roleIntelligence.expectedOutcomes['30_days']}
- **60 days**: ${roleIntelligence.expectedOutcomes['60_days']}
- **90 days**: ${roleIntelligence.expectedOutcomes['90_days']}
`
  }
}

