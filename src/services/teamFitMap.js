export class TeamFitMap {
  constructor() {
    this.teamData = this.loadTeamData()
  }

  loadTeamData() {
    const saved = localStorage.getItem('biggwork_team_map')
    if (saved) return JSON.parse(saved)

    return {
      members: [
        { 
          id: 'emp_1', 
          name: 'Alice Johnson', 
          role: 'Engineering Lead',
          department: 'Engineering',
          skills: ['React', 'Node.js', 'System Design', 'Team Management'],
          tenure: 18,
          personality: 'analytical',
          workStyle: 'collaborative',
          strengths: ['technical leadership', 'mentoring'],
          velocity: 'high',
          cultureFit: 92
        },
        { 
          id: 'emp_2', 
          name: 'Bob Smith', 
          role: 'Product Manager',
          department: 'Product',
          skills: ['Product Strategy', 'Roadmapping', 'User Research', 'Analytics'],
          tenure: 12,
          personality: 'strategic',
          workStyle: 'independent',
          strengths: ['vision', 'execution'],
          velocity: 'high',
          cultureFit: 88
        },
        { 
          id: 'emp_3', 
          name: 'Carol Davis', 
          role: 'Senior Designer',
          department: 'Design',
          skills: ['UI/UX', 'Figma', 'User Research', 'Design Systems'],
          tenure: 8,
          personality: 'creative',
          workStyle: 'collaborative',
          strengths: ['creativity', 'user empathy'],
          velocity: 'medium',
          cultureFit: 85
        },
        { 
          id: 'emp_4', 
          name: 'David Lee', 
          role: 'Backend Engineer',
          department: 'Engineering',
          skills: ['Python', 'PostgreSQL', 'APIs', 'DevOps'],
          tenure: 6,
          personality: 'analytical',
          workStyle: 'independent',
          strengths: ['problem solving', 'infrastructure'],
          velocity: 'high',
          cultureFit: 90
        }
      ]
    }
  }

  saveTeamData() {
    localStorage.setItem('biggwork_team_map', JSON.stringify(this.teamData))
  }

  analyzeTeamComposition() {
    const members = this.teamData.members

    const departmentBreakdown = members.reduce((acc, m) => {
      acc[m.department] = (acc[m.department] || 0) + 1
      return acc
    }, {})

    const skillCoverage = {}
    members.forEach(m => {
      m.skills.forEach(skill => {
        skillCoverage[skill] = (skillCoverage[skill] || 0) + 1
      })
    })

    const workStyleDistribution = members.reduce((acc, m) => {
      acc[m.workStyle] = (acc[m.workStyle] || 0) + 1
      return acc
    }, {})

    const velocityDistribution = members.reduce((acc, m) => {
      acc[m.velocity] = (acc[m.velocity] || 0) + 1
      return acc
    }, {})

    const avgCultureFit = members.reduce((sum, m) => sum + m.cultureFit, 0) / members.length

    return {
      totalMembers: members.length,
      departments: departmentBreakdown,
      skills: skillCoverage,
      workStyles: workStyleDistribution,
      velocities: velocityDistribution,
      avgCultureFit: Math.round(avgCultureFit),
      avgTenure: Math.round(members.reduce((sum, m) => sum + m.tenure, 0) / members.length)
    }
  }

  identifySkillGaps() {
    const composition = this.analyzeTeamComposition()
    const gaps = []

    const criticalSkills = [
      'Frontend Development', 'Backend Development', 'System Design',
      'Product Strategy', 'UI/UX', 'Data Analysis',
      'Sales', 'Marketing', 'DevOps', 'Security'
    ]

    criticalSkills.forEach(skill => {
      const coverage = composition.skills[skill] || 0
      if (coverage === 0) {
        gaps.push({
          skill,
          severity: 'high',
          impact: 'Critical capability missing',
          recommendation: `Hire for ${skill} expertise`
        })
      } else if (coverage === 1) {
        gaps.push({
          skill,
          severity: 'medium',
          impact: 'Single point of failure',
          recommendation: `Consider backup for ${skill}`
        })
      }
    })

    return gaps
  }

  analyzeNewHireFit(candidateProfile) {
    const composition = this.analyzeTeamComposition()
    const members = this.teamData.members

    let skillGapCoverage = 0
    const coveredGaps = []
    candidateProfile.skills?.forEach(skill => {
      if (!composition.skills[skill]) {
        skillGapCoverage += 20
        coveredGaps.push(skill)
      }
    })
    skillGapCoverage = Math.min(skillGapCoverage, 100)

    const similarMembers = members.filter(m => 
      m.department === candidateProfile.department ||
      m.workStyle === candidateProfile.workStyle
    )

    const potentialConflicts = []
    const synergies = []

    members.forEach(member => {
      if (member.workStyle === 'independent' && candidateProfile.workStyle === 'collaborative') {
        potentialConflicts.push({
          with: member.name,
          reason: 'Work style mismatch - may need mediation',
          severity: 'low'
        })
      }

      if (member.personality === candidateProfile.personality) {
        synergies.push({
          with: member.name,
          reason: 'Similar thinking patterns - good collaboration potential',
          strength: 'medium'
        })
      }

      const sharedSkills = (member.skills || []).filter(s => 
        (candidateProfile.skills || []).includes(s)
      )
      if (sharedSkills.length > 2) {
        synergies.push({
          with: member.name,
          reason: `Shared expertise in ${sharedSkills.slice(0, 2).join(', ')}`,
          strength: 'high'
        })
      }
    })

    const velocityBalance = this.calculateVelocityBalance(candidateProfile.velocity)
    const cultureAlignment = this.calculateCultureAlignment(candidateProfile.cultureFit)

    const teamDiversityImpact = this.calculateDiversityImpact(candidateProfile)

    const overallFitScore = Math.round(
      skillGapCoverage * 0.30 +
      velocityBalance * 0.20 +
      cultureAlignment * 0.25 +
      teamDiversityImpact * 0.15 +
      (100 - (potentialConflicts.length * 10)) * 0.10
    )

    return {
      overallFitScore,
      skillGapCoverage,
      coveredGaps,
      velocityBalance,
      cultureAlignment,
      teamDiversityImpact,
      potentialConflicts,
      synergies,
      recommendation: this.generateFitRecommendation(overallFitScore, potentialConflicts, coveredGaps),
      teamImpact: this.assessTeamImpact(overallFitScore, coveredGaps, potentialConflicts)
    }
  }

  calculateVelocityBalance(candidateVelocity) {
    const composition = this.analyzeTeamComposition()
    const velocities = composition.velocities
    
    if (candidateVelocity === 'high' && (velocities.high || 0) < this.teamData.members.length * 0.7) {
      return 85
    } else if (candidateVelocity === 'medium' && (velocities.medium || 0) < this.teamData.members.length * 0.3) {
      return 70
    } else if (candidateVelocity === 'high') {
      return 95
    }
    return 60
  }

  calculateCultureAlignment(candidateCultureFit) {
    const composition = this.analyzeTeamComposition()
    const avgFit = composition.avgCultureFit
    
    if (Math.abs(candidateCultureFit - avgFit) < 10) {
      return 95
    } else if (Math.abs(candidateCultureFit - avgFit) < 20) {
      return 80
    }
    return 65
  }

  calculateDiversityImpact(candidateProfile) {
    const members = this.teamData.members
    const personalities = members.map(m => m.personality)
    const workStyles = members.map(m => m.workStyle)

    let diversityScore = 70

    if (!personalities.includes(candidateProfile.personality)) {
      diversityScore += 15
    }

    if (!workStyles.includes(candidateProfile.workStyle)) {
      diversityScore += 15
    }

    return Math.min(diversityScore, 100)
  }

  generateFitRecommendation(score, conflicts, coveredGaps) {
    if (score >= 85 && coveredGaps.length > 0) {
      return {
        verdict: 'strong_hire',
        message: 'Excellent team fit with critical skill gap coverage',
        confidence: 'high'
      }
    } else if (score >= 75) {
      return {
        verdict: 'good_hire',
        message: 'Good team fit with positive impact',
        confidence: 'medium'
      }
    } else if (score >= 60) {
      return {
        verdict: 'consider',
        message: 'Moderate fit - review potential conflicts',
        confidence: 'medium'
      }
    } else {
      return {
        verdict: 'risky',
        message: 'Low team fit - significant integration challenges',
        confidence: 'high'
      }
    }
  }

  assessTeamImpact(score, coveredGaps, conflicts) {
    const impacts = []

    if (coveredGaps.length > 0) {
      impacts.push({
        type: 'positive',
        area: 'Skill Coverage',
        description: `Fills ${coveredGaps.length} critical skill gaps: ${coveredGaps.join(', ')}`,
        magnitude: 'high'
      })
    }

    if (score >= 80) {
      impacts.push({
        type: 'positive',
        area: 'Team Velocity',
        description: 'Expected to increase team execution velocity',
        magnitude: 'medium'
      })
    }

    if (conflicts.length > 0) {
      impacts.push({
        type: 'caution',
        area: 'Team Dynamics',
        description: `${conflicts.length} potential friction points to monitor`,
        magnitude: conflicts.length > 2 ? 'high' : 'low'
      })
    }

    impacts.push({
      type: 'neutral',
      area: 'Team Size',
      description: `Team will grow to ${this.teamData.members.length + 1} members`,
      magnitude: 'low'
    })

    return impacts
  }

  getTeamMembers() {
    return this.teamData.members
  }

  getTeamVisualizationData() {
    const composition = this.analyzeTeamComposition()
    
    return {
      departments: Object.entries(composition.departments).map(([name, value]) => ({ name, value })),
      skills: Object.entries(composition.skills)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, value]) => ({ name, value })),
      workStyles: Object.entries(composition.workStyles).map(([name, value]) => ({ name, value })),
      velocities: Object.entries(composition.velocities).map(([name, value]) => ({ name, value }))
    }
  }
}

