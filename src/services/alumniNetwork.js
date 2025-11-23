export class AlumniNetwork {
  constructor() {
    this.alumni = this.loadAlumni()
  }

  loadAlumni() {
    const saved = localStorage.getItem('biggwork_alumni')
    return saved ? JSON.parse(saved) : []
  }

  saveAlumni() {
    localStorage.setItem('biggwork_alumni', JSON.stringify(this.alumni))
  }

  addAlumni(employeeData, exitData) {
    const alumni = {
      id: `alumni_${Date.now()}`,
      name: employeeData.name,
      email: employeeData.email,
      role: employeeData.role,
      tenure: employeeData.tenure,
      exitDate: exitData.exitDate,
      exitReason: exitData.exitReason,
      exitSatisfaction: exitData.satisfaction,
      currentCompany: null,
      currentRole: null,
      status: 'active',
      referralCount: 0,
      referrals: [],
      lastContact: new Date().toISOString(),
      tags: [],
      notes: []
    }

    this.alumni.push(alumni)
    this.saveAlumni()
    return alumni
  }

  getAlumni() {
    return this.alumni
  }

  getAlumniById(id) {
    return this.alumni.find(a => a.id === id)
  }

  updateAlumni(id, updates) {
    const alumni = this.getAlumniById(id)
    if (!alumni) throw new Error('Alumni not found')

    Object.assign(alumni, updates)
    alumni.lastContact = new Date().toISOString()
    this.saveAlumni()
    return alumni
  }

  addReferral(alumniId, referralData) {
    const alumni = this.getAlumniById(alumniId)
    if (!alumni) throw new Error('Alumni not found')

    const referral = {
      id: `ref_${Date.now()}`,
      candidateName: referralData.name,
      candidateEmail: referralData.email,
      role: referralData.role,
      status: 'pending',
      date: new Date().toISOString(),
      outcome: null
    }

    alumni.referrals.push(referral)
    alumni.referralCount = alumni.referrals.length
    this.saveAlumni()
    return referral
  }

  updateReferralStatus(alumniId, referralId, status, outcome = null) {
    const alumni = this.getAlumniById(alumniId)
    if (!alumni) throw new Error('Alumni not found')

    const referral = alumni.referrals.find(r => r.id === referralId)
    if (!referral) throw new Error('Referral not found')

    referral.status = status
    if (outcome) referral.outcome = outcome
    this.saveAlumni()
    return referral
  }

  getReferralStats() {
    const totalReferrals = this.alumni.reduce((sum, a) => sum + a.referralCount, 0)
    const activeReferrers = this.alumni.filter(a => a.referralCount > 0).length
    const hiredReferrals = this.alumni.reduce((sum, a) => {
      return sum + a.referrals.filter(r => r.outcome === 'hired').length
    }, 0)

    return {
      totalAlumni: this.alumni.length,
      activeAlumni: this.alumni.filter(a => a.status === 'active').length,
      totalReferrals,
      activeReferrers,
      hiredReferrals,
      referralConversionRate: totalReferrals > 0 ? (hiredReferrals / totalReferrals) * 100 : 0
    }
  }

  searchAlumni(query) {
    const lowerQuery = query.toLowerCase()
    return this.alumni.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.role.toLowerCase().includes(lowerQuery) ||
      a.currentCompany?.toLowerCase().includes(lowerQuery)
    )
  }

  addNote(alumniId, note) {
    const alumni = this.getAlumniById(alumniId)
    if (!alumni) throw new Error('Alumni not found')

    alumni.notes.push({
      id: `note_${Date.now()}`,
      content: note,
      date: new Date().toISOString()
    })
    this.saveAlumni()
    return alumni
  }

  addTag(alumniId, tag) {
    const alumni = this.getAlumniById(alumniId)
    if (!alumni) throw new Error('Alumni not found')

    if (!alumni.tags.includes(tag)) {
      alumni.tags.push(tag)
      this.saveAlumni()
    }
    return alumni
  }
}

