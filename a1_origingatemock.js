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
  Clock
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

export default function App() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [logs] = useState(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState('');

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
              Provenance Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Manage AI access to your cryptographically verified content.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Ledger Sync: Active
            </div>
          </div>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<Database />} title="Verified Assets" value="142" subtext="Cryptographically signed" />
          <StatCard icon={<Activity />} title="Active AI Consumers" value={activeCount} subtext="Currently licensed models" />
          <StatCard icon={<Coins />} title="Total Royalties" value={`${totalEarned} TRUTH`} subtext="≈ $148.50 USD equivalent" trend="up" />
          <StatCard icon={<ShieldCheck />} title="Global Trust Rating" value="99.8%" subtext="Top 1% of human creators" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
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
                  <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <th className="p-4 font-medium">Agent Name</th>
                    <th className="p-4 font-medium">Community Trust</th>
                    <th className="p-4 font-medium">Max Access Tier</th>
                    <th className="p-4 font-medium">Connection</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map(agent => (
                    <tr key={agent.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${agent.status === 'revoked' ? 'opacity-60 bg-red-50/30' : ''}`}>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{agent.name}</div>
                        <div className="text-xs text-slate-500">{agent.type}</div>
                      </td>
                      <td className="p-4">
                        <TrustBadge score={agent.trustScore} />
                      </td>
                      <td className="p-4">
                        <select 
                          className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 disabled:opacity-50"
                          value={agent.tier}
                          onChange={(e) => updateTier(agent.id, e.target.value)}
                          disabled={agent.status === 'revoked'}
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