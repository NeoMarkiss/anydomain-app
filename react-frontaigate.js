import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Database, 
  Coins, 
  PowerOff, 
  Settings2, 
  Search,
  AlertTriangle,
  Clock,
  Cloud,
  Smartphone,
  Laptop,
  FolderSync,
  UploadCloud,
  Cpu
} from 'lucide-react';

const INITIAL_AGENTS = [
  { id: 1, name: 'LexisNexis LegalBot', type: 'Specialized Agent', trustScore: 98, status: 'active', tier: 'Tier 1', earned: 45.20 },
  { id: 2, name: 'OpenAI GPT-5 (Research)', type: 'General LLM', trustScore: 85, status: 'active', tier: 'Tier 2', earned: 12.50 },
  { id: 3, name: 'MedSynth AI', type: 'Medical RAG', trustScore: 94, status: 'paused', tier: 'Tier 1', earned: 8.00 },
  { id: 4, name: 'NewsAggregator-X', type: 'Scraper Bot', trustScore: 42, status: 'revoked', tier: 'None', earned: 0.00 },
  { id: 5, name: 'EduTutor Agent', type: 'EdTech', trustScore: 88, status: 'pending', tier: 'Tier 3', earned: 0.00 },
];

const INITIAL_LOGS = [
  { id: 101, agent: 'LexisNexis LegalBot', action: 'Accessed Raw Dataset', resource: '2025 City Council Voting Records', time: '2 mins ago', payout: '+0.05 TRUTH' },
  { id: 102, agent: 'OpenAI GPT-5 (Research)', action: 'Cited Synthesis', resource: 'Urban Development Meta-Analysis', time: '1 hour ago', payout: '+0.01 TRUTH' },
  { id: 103, agent: 'NewsAggregator-X', action: 'BLOCKED - Access Attempt', resource: 'Unpublished Photographic Evidence', time: '3 hours ago', payout: '0.00' },
  { id: 104, agent: 'MedSynth AI', action: 'Verified Signature Check', resource: 'Public Health Demographics', time: '5 hours ago', payout: '+0.02 TRUTH' },
];

const INITIAL_SESSIONS = [
  { id: 's1', name: 'Downtown Architecture Walk', type: 'Photography', status: 'Synced', devices: ['Laptop', 'Phone'], assets: 24, rewardEst: '+5.50 TRUTH/mo', aiTolerant: true, specs: 'Hardware C2PA (Sony A7IV)' },
  { id: 's2', name: 'Q3 Financial Synthesis', type: 'Research', status: 'Syncing...', devices: ['Laptop'], assets: 3, rewardEst: '+12.00 TRUTH/mo', aiTolerant: false, specs: 'Software Chain-of-Custody' },
  { id: 's3', name: 'Interview Transcripts', type: 'Audio/Text', status: 'Synced', devices: ['Phone', 'Tablet'], assets: 8, rewardEst: '+3.20 TRUTH/mo', aiTolerant: true, specs: 'Verified Identity (ORCID)' }
];

export default function App() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [logs] = useState(INITIAL_LOGS);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('workspace'); // New state for tabs

  const toggleStatus = (id, currentStatus) => {
    if (currentStatus === 'revoked') return; // Cannot easily un-revoke without review
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setAgents(agents.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const updateTier = (id, newTier) => {
    setAgents(agents.map(a => a.id === id ? { ...a, tier: newTier } : a));
  };

  const killSwitch = (id) => {
    if (window.confirm("Are you sure you want to PERMANENTLY revoke this AI's cryptographic API key? This action is logged on the public ledger.")) {
      setAgents(agents.map(a => a.id === id ? { ...a, status: 'revoked', tier: 'None' } : a));
    }
  };

  const filteredAgents = agents.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalEarned = agents.reduce((sum, a) => sum + a.earned, 0).toFixed(2);
  const activeCount = agents.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="text-indigo-600 h-8 w-8" />
              Provenance Node
            </h1>
            <p className="text-slate-500 mt-1">Manage verified content, AI access, and node synchronization.</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <Smartphone className="w-4 h-4 text-indigo-500" />
              <Laptop className="w-4 h-4 text-indigo-500" />
              <span>3 Devices Synced</span>
              <Cloud className="w-5 h-5 ml-2 text-green-500" />
            </div>
            <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Ledger Sync: Active
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 pb-2">
          <button 
            onClick={() => setActiveTab('workspace')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'workspace' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            Routine Sessions & Content
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            AI Access Dashboard
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <>
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <StatCard icon={<Database />} title="Verified Assets" value="142" subtext="Cryptographically signed" />
              <StatCard icon={<Activity />} title="Active AI Consumers" value={activeCount} subtext="Currently licensed models" />
              <StatCard icon={<Coins />} title="Total Royalties" value={`${totalEarned} TRUTH`} subtext="≈ $148.50 USD equivalent" trend="up" />
              <StatCard icon={<ShieldCheck />} title="Global Trust Rating" value="99.8%" subtext="Top 1% of human creators" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              
              {/* Main Agent Management Table (Takes up 2/3 width on large screens) */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-slate-500" />
                    AI Agent Access Control
                  </h2>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search agents..." 
                      className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                        >
                          <option value="Tier 1">Tier 1: Raw Origin</option>
                          <option value="Tier 2">Tier 2: Vetted Synthesis</option>
                          <option value="Tier 3">Tier 3: Repurposed</option>
                          <option value="None">None (Blocked)</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleStatus(agent.id, agent.status)}
                          disabled={agent.status === 'revoked'}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:cursor-not-allowed ${
                            agent.status === 'active' ? 'bg-green-500' : 
                            agent.status === 'revoked' ? 'bg-red-200' : 'bg-slate-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            agent.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                        <span className="text-xs font-medium ml-2 uppercase text-slate-500">
                          {agent.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => killSwitch(agent.id)}
                          disabled={agent.status === 'revoked'}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Instant API Kill Switch"
                        >
                          <PowerOff className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: Real-time Access Ledger */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                Live API Ledger
              </h2>
            </div>
            <div className="p-0 overflow-y-auto max-h-[500px]">
              {logs.map((log, index) => (
                <div key={log.id} className={`p-4 border-b border-slate-100 last:border-0 ${log.action.includes('BLOCKED') ? 'bg-red-50/50' : 'hover:bg-slate-50'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold text-slate-800">{log.agent}</span>
                    <span className="text-xs text-slate-400">{log.time}</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    {log.action === 'BLOCKED - Access Attempt' ? (
                      <span className="text-red-600 font-medium flex items-center gap-1 text-xs">
                        <ShieldAlert className="w-3 h-3" /> BLOCKED
                      </span>
                    ) : (
                      log.action
                    )}
                  </div>
                  <div className="text-xs text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded truncate max-w-full">
                    ↳ {log.resource}
                  </div>
                  <div className="mt-2 text-right font-medium text-green-600 text-sm">
                    {log.payout}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 flex justify-center items-center gap-1">
              <Shield className="w-3 h-3" /> All logs cryptographically secured
            </div>
          </div>
          
        </div>
      </>
    ) : (
      <Workspace sessions={sessions} setSessions={setSessions} />
    )}
  </div>
</div>
);
}

function Workspace({ sessions, setSessions }) {
const toggleAiTolerance = (id) => {
setSessions(sessions.map(s => s.id === id ? { ...s, aiTolerant: !s.aiTolerant } : s));
};

return (
<div className="space-y-6 animate-in fade-in duration-300">
  {/* Upload/Session Action Area */}
  <div className="bg-indigo-600 text-white rounded-xl p-8 shadow-md flex flex-col items-center justify-center border border-indigo-700 text-center">
    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
      <UploadCloud className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-2xl font-bold mb-2">Drop files to start a new Routine Session</h2>
    <p className="text-indigo-100 max-w-lg mb-6">
      Files are encrypted locally. Origin specs (C2PA) are automatically parsed. You control the AI alignment and reward tiers before syncing to your other devices.
    </p>
    <button className="bg-white text-indigo-700 font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors">
      Browse Files
    </button>
  </div>

  {/* Active Sessions Grid */}
  <div>
    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <FolderSync className="w-5 h-5 text-slate-500" />
      Recent Routine Sessions
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {sessions.map(session => (
        <div key={session.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-slate-900">{session.name}</h4>
              <span className="text-xs text-slate-500">{session.type} • {session.assets} Assets</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${session.status === 'Synced' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {session.status}
            </span>
          </div>
          
          <div className="space-y-3 flex-grow">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Origin Specs:</span>
              <span className="font-medium text-slate-700 text-right max-w-[150px] truncate" title={session.specs}>{session.specs}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Projected Reward:</span>
              <span className="font-medium text-green-600">{session.rewardEst}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <span>Available on:</span>
              {session.devices.includes('Laptop') && <Laptop className="w-3 h-3" />}
              {session.devices.includes('Phone') && <Smartphone className="w-3 h-3" />}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 flex items-center gap-1">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  AI Tolerant Mode
                </span>
                <span className="text-xs text-slate-500">
                  {session.aiTolerant ? 'Allows generative training (Higher reward)' : 'Strictly RAG / Fact-check only'}
                </span>
              </div>
              <button 
                onClick={() => toggleAiTolerance(session.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  session.aiTolerant ? 'bg-indigo-500' : 'bg-slate-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  session.aiTolerant ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
);
}

// Sub-components
function StatCard({ icon, title, value, subtext, trend }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      </div>
    </div>
  );
}

function TrustBadge({ score }) {
  let color = 'bg-green-100 text-green-800 border-green-200';
  let icon = <ShieldCheck className="w-3 h-3 mr-1" />;
  
  if (score < 50) {
    color = 'bg-red-100 text-red-800 border-red-200';
    icon = <ShieldAlert className="w-3 h-3 mr-1" />;
  } else if (score < 80) {
    color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
    icon = <AlertTriangle className="w-3 h-3 mr-1" />;
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {icon}
      {score}%
    </div>
  );
}