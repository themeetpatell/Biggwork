import { useState, useEffect } from 'react'
import { AlumniNetwork } from '../services/alumniNetwork'
import { Users, UserPlus, TrendingUp, Search, Mail, Tag, FileText } from 'lucide-react'

export default function AlumniNetworkPage() {
  const [alumniService] = useState(() => new AlumniNetwork())
  const [alumni, setAlumni] = useState([])
  const [stats, setStats] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAlumni, setSelectedAlumni] = useState(null)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [referralData, setReferralData] = useState({ name: '', email: '', role: '' })
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [noteContent, setNoteContent] = useState('')

  useEffect(() => {
    loadAlumni()
    loadStats()
  }, [])

  const loadAlumni = () => {
    setAlumni(alumniService.getAlumni())
  }

  const loadStats = () => {
    setStats(alumniService.getReferralStats())
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setAlumni(alumniService.searchAlumni(query))
    } else {
      loadAlumni()
    }
  }

  const handleAddReferral = () => {
    if (!selectedAlumni || !referralData.name || !referralData.email) return
    
    alumniService.addReferral(selectedAlumni.id, referralData)
    setShowReferralForm(false)
    setReferralData({ name: '', email: '', role: '' })
    loadAlumni()
    loadStats()
  }

  const handleAddNote = () => {
    if (!selectedAlumni || !noteContent.trim()) return
    
    alumniService.addNote(selectedAlumni.id, noteContent)
    setShowNoteForm(false)
    setNoteContent('')
    loadAlumni()
    const updated = alumniService.getAlumniById(selectedAlumni.id)
    setSelectedAlumni(updated)
  }

  const filteredAlumni = searchQuery.trim()
    ? alumniService.searchAlumni(searchQuery)
    : alumni

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Network</h1>
        <p className="text-gray-600">Maintain relationships with former employees and leverage referrals</p>
      </div>

      {stats && (
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Total Alumni</p>
            <p className="text-3xl font-bold">{stats.totalAlumni}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Active Alumni</p>
            <p className="text-3xl font-bold text-green-600">{stats.activeAlumni}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Total Referrals</p>
            <p className="text-3xl font-bold">{stats.totalReferrals}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Hired Referrals</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.hiredReferrals}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold">{stats.referralConversionRate.toFixed(1)}%</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search alumni by name, role, or company..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600" />
            Alumni Directory
          </h2>
          {filteredAlumni.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500">No alumni found. Alumni will be added automatically when employees exit.</p>
            </div>
          ) : (
            filteredAlumni.map(alum => (
              <div
                key={alum.id}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                onClick={() => setSelectedAlumni(alum)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg">{alum.name}</p>
                    <p className="text-sm text-gray-500">{alum.role}</p>
                    {alum.currentCompany && (
                      <p className="text-sm text-gray-600 mt-1">
                        Now at {alum.currentCompany} {alum.currentRole && `as ${alum.currentRole}`}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    alum.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {alum.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>Tenure: {alum.tenure} months</span>
                  <span>Referrals: {alum.referralCount}</span>
                  <span>Exited: {new Date(alum.exitDate).toLocaleDateString()}</span>
                </div>
                {alum.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {alum.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {selectedAlumni && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedAlumni.name}</h2>
                <p className="text-gray-600">{selectedAlumni.role}</p>
              </div>
              <button
                onClick={() => setSelectedAlumni(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
                <p className="text-sm text-gray-600">{selectedAlumni.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Last Contact: {new Date(selectedAlumni.lastContact).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Exit Information</h3>
                <p className="text-sm text-gray-600">Exit Date: {new Date(selectedAlumni.exitDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Reason: {selectedAlumni.exitReason || 'N/A'}</p>
                {selectedAlumni.exitSatisfaction && (
                  <p className="text-sm text-gray-600">Satisfaction: {selectedAlumni.exitSatisfaction}/10</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                  <span>Referrals ({selectedAlumni.referralCount})</span>
                  <button
                    onClick={() => setShowReferralForm(true)}
                    className="flex items-center px-2 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Referral
                  </button>
                </h3>
                {selectedAlumni.referrals.length === 0 ? (
                  <p className="text-sm text-gray-500">No referrals yet</p>
                ) : (
                  <div className="space-y-2">
                    {selectedAlumni.referrals.map(ref => (
                      <div key={ref.id} className="border rounded p-2 text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{ref.candidateName}</p>
                            <p className="text-gray-500">{ref.role}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            ref.status === 'hired' ? 'bg-green-100 text-green-700' :
                            ref.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {ref.status}
                          </span>
                        </div>
                        {ref.outcome && (
                          <p className="text-xs text-gray-500 mt-1">Outcome: {ref.outcome}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                  <span>Notes</span>
                  <button
                    onClick={() => setShowNoteForm(true)}
                    className="flex items-center px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Add Note
                  </button>
                </h3>
                {selectedAlumni.notes.length === 0 ? (
                  <p className="text-sm text-gray-500">No notes yet</p>
                ) : (
                  <div className="space-y-2">
                    {selectedAlumni.notes.map(note => (
                      <div key={note.id} className="border rounded p-2 text-sm">
                        <p className="text-gray-700">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Referral from {selectedAlumni?.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Candidate Name</label>
                <input
                  type="text"
                  value={referralData.name}
                  onChange={(e) => setReferralData({ ...referralData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={referralData.email}
                  onChange={(e) => setReferralData({ ...referralData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={referralData.role}
                  onChange={(e) => setReferralData({ ...referralData, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddReferral}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Referral
              </button>
              <button
                onClick={() => setShowReferralForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Note for {selectedAlumni?.name}</h2>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows="5"
              placeholder="Enter note..."
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddNote}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Note
              </button>
              <button
                onClick={() => setShowNoteForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

