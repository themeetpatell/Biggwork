export class GapAnalysis {
  analyzeGaps(companyDNA, currentTeam, growthRequirements) {
    const skillGaps = this.identifySkillGaps(currentTeam, growthRequirements)
    const roleGaps = this.identifyRoleGaps(companyDNA, currentTeam)
    const bottlenecks = this.identifyBottlenecks(currentTeam, companyDNA)
    const priorities = this.prioritizeGaps(skillGaps, roleGaps, companyDNA)

    return {
      skillGaps,
      roleGaps,
      bottlenecks,
      priorities,
      urgency: this.calculateUrgency(companyDNA, priorities),
    }
  }

  identifySkillGaps(currentTeam, requirements) {
    const requiredSkills = requirements.skills || []
    const currentSkills = currentTeam.map(member => member.skills || []).flat()
    const uniqueCurrent = [...new Set(currentSkills)]
    
    return requiredSkills
      .filter(skill => !uniqueCurrent.includes(skill))
      .map(skill => ({
        skill,
        impact: 'high',
        reason: 'Missing critical skill for growth',
      }))
  }

  identifyRoleGaps(companyDNA, currentTeam) {
    const stage = companyDNA.stage
    const teamSize = currentTeam.length
    const expectedRoles = this.getExpectedRolesForStage(stage, teamSize)
    const currentRoles = currentTeam.map(m => m.role)
    
    return expectedRoles
      .filter(role => !currentRoles.includes(role))
      .map(role => ({
        role,
        priority: this.getRolePriority(role, companyDNA),
        reason: `Critical for ${stage} stage growth`,
      }))
  }

  getExpectedRolesForStage(stage, teamSize) {
    const base = ['Founder', 'CTO/Technical Lead']
    if (teamSize > 2) base.push('Head of Product')
    if (teamSize > 5) base.push('Head of Sales', 'Head of Marketing')
    if (teamSize > 10) base.push('Head of Operations', 'Head of People')
    return base
  }

  getRolePriority(role, companyDNA) {
    const highPriority = ['Head of Sales', 'Head of Product']
    if (companyDNA.stage === 'pre_seed' || companyDNA.stage === 'seed') {
      return highPriority.includes(role) ? 'high' : 'medium'
    }
    return 'medium'
  }

  identifyBottlenecks(currentTeam, companyDNA) {
    const bottlenecks = []
    
    const overloaded = currentTeam.filter(m => m.load > 0.8)
    if (overloaded.length > 0) {
      bottlenecks.push({
        type: 'overloaded_team',
        members: overloaded.map(m => m.name),
        impact: 'high',
        solution: 'Hire additional support or redistribute workload',
      })
    }

    const singlePoints = currentTeam.filter(m => m.critical && !m.backup)
    if (singlePoints.length > 0) {
      bottlenecks.push({
        type: 'single_point_failure',
        members: singlePoints.map(m => m.name),
        impact: 'critical',
        solution: 'Create backup coverage or hire additional team member',
      })
    }

    return bottlenecks
  }

  prioritizeGaps(skillGaps, roleGaps, companyDNA) {
    const allGaps = [
      ...roleGaps.map(gap => ({ ...gap, type: 'role', priority: gap.priority })),
      ...skillGaps.map(gap => ({ ...gap, type: 'skill', priority: 'medium' })),
    ]

    return allGaps.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  calculateUrgency(companyDNA, priorities) {
    const highPriorityCount = priorities.filter(p => p.priority === 'high').length
    const runway = companyDNA.runwayMonths || 12
    
    if (runway < 6 && highPriorityCount > 0) return 'critical'
    if (runway < 12 && highPriorityCount > 2) return 'high'
    if (highPriorityCount > 3) return 'high'
    return 'medium'
  }
}

