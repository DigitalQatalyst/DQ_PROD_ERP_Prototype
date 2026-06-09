import { useState } from 'react'
import { Brain, Zap, Send, Sparkles, TrendingUp, AlertTriangle, CheckCircle, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { kpis } from '../data/fixtures'
import { useToast } from '../components/Toast'

const aiInsights = [
  { domain: 'Finance', signal: 'Mazrui Holdings invoice (AED 90K) due in 8 days — executive approval required', severity: 'High', route: '/risk-alerts' },
  { domain: 'Procurement', signal: 'Loom Business renewal in 7 days — auto-renew OFF, action required', severity: 'High', route: '/subscriptions' },
  { domain: 'HR', signal: 'Onboarding TR-001 (Daniel Kimani) has 2 outstanding tasks 5 days before start', severity: 'Medium', route: '/onboarding-offboarding' },
  { domain: 'Finance', signal: 'Evidence rejection rate increased 6pp this period — recommend training', severity: 'Medium', route: '/finance-insights' },
]

const conversationHistory = [
  { role: 'assistant', text: 'Good morning. I\'ve identified 2 high-priority items requiring your attention today.', timestamp: '09:42' },
  { role: 'assistant', text: '1. Mazrui Holdings invoice (AED 90K) due in 8 days needs executive approval\n2. Loom Business subscription expires in 7 days with auto-renew disabled', timestamp: '09:42' },
  { role: 'user', text: 'Show me the invoice details', timestamp: '09:43' },
  { role: 'assistant', text: 'Invoice REQ-2025-0047 for Mazrui Holdings Ltd.\n• Amount: AED 90,000\n• Due date: 28 May 2026\n• Linked to: PRJ-2403 (Noor Retail DXP)\n• Status: Pending Approval (Aisha Khalid)\n• Evidence: All complete (3/3)', timestamp: '09:43' },
  { role: 'user', text: 'What\'s the budget status for PRJ-2403?', timestamp: '09:44' },
  { role: 'assistant', text: 'PRJ-2403 (Noor Retail DXP) is tracking AED 45K over budget. There\'s a draft budget amendment (REQ-2025-0048) awaiting submission for this overage.', timestamp: '09:44' },
]

const suggestedActions = [
  { label: 'Review overdue approvals', icon: AlertTriangle, action: 'Show me all overdue approvals' },
  { label: 'Check high-value requests', icon: TrendingUp, action: 'What high-value requests need attention?' },
  { label: 'Upcoming renewals', icon: Sparkles, action: 'Show upcoming subscription renewals' },
  { label: 'Budget exceptions', icon: CheckCircle, action: 'Are there any projects over budget?' },
]

export default function AICockpit() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(conversationHistory)
  const { showToast } = useToast()

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    setMessages([...messages, { role: 'user', text: inputValue, timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) }])
    setInputValue('')
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'I\'m analyzing that query across all domains. This is a prototype, so responses are simulated.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      }])
    }, 800)
  }

  const handleSuggestedAction = (action: string) => {
    setInputValue(action)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">AI Cockpit</h1>
      <p className="text-sm text-text-muted mb-6">
        AI-powered operating intelligence — conversational agent for cross-domain insights, automated decisions, and real-time recommendations.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-dq-navy rounded-card text-white">
          <p className="text-xs text-white/60 mb-1">Active Insights</p>
          <p className="text-2xl font-bold">{aiInsights.length}</p>
        </div>
        <div className="p-4 bg-status-error-surface rounded-card border border-status-error/20">
          <p className="text-xs text-text-muted mb-1">High Priority</p>
          <p className="text-2xl font-bold text-status-error-text">{aiInsights.filter(i => i.severity === 'High').length}</p>
        </div>
        <div className="p-4 bg-white rounded-card border border-border-subtle shadow-sm">
          <p className="text-xs text-white/60 mb-1">Avg Response Time</p>
          <p className="text-2xl font-bold">&lt;2s</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="col-span-2">
          <div className="bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-border-subtle bg-surface-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dq-orange flex items-center justify-center">
                  <Brain size={20} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">DQ AI Agent</h2>
                  <p className="text-xs text-text-muted">Cross-domain operating intelligence</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-dq-navy' : 'bg-dq-orange'
                  }`}>
                    {msg.role === 'user' ? (
                      <User size={16} className="text-white" strokeWidth={1.5} />
                    ) : (
                      <Brain size={16} className="text-white" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className={`flex-1 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`inline-block max-w-[80%] rounded-card p-3 ${
                      msg.role === 'user' 
                        ? 'bg-dq-navy text-white' 
                        : 'bg-surface-1 text-text-primary'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.role === 'user' ? 'text-white/60' : 'text-text-disabled'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border-subtle bg-surface-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about approvals, budgets, risks, or any operational query..."
                  className="flex-1 px-4 py-2.5 text-sm border border-border-subtle rounded-btn focus:outline-none focus:ring-2 focus:ring-dq-orange"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2.5 bg-dq-orange text-white rounded-btn hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Send size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Actions */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-dq-orange" strokeWidth={1.5} />
              Suggested Actions
            </h3>
            <div className="space-y-2">
              {suggestedActions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedAction(item.action)}
                  className="w-full flex items-center gap-2 p-2.5 rounded-card bg-surface-1 hover:bg-orange-50 transition-colors text-left"
                >
                  <item.icon size={14} className="text-dq-orange shrink-0" strokeWidth={1.5} />
                  <span className="text-xs text-text-primary">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Insights */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Active Insights</h3>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => (
                <Link
                  key={i}
                  to={insight.route}
                  className="flex items-start gap-2 p-2 rounded-card hover:bg-surface-1 transition-colors"
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    insight.severity === 'High' ? 'bg-status-error' :
                    insight.severity === 'Medium' ? 'bg-status-warning' : 'bg-status-success'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] font-semibold bg-navy-50 text-dq-navy rounded-pill px-1.5 py-0.5">{insight.domain}</span>
                      <span className={`text-[10px] font-semibold rounded-pill px-1.5 py-0.5 ${
                        insight.severity === 'High' ? 'bg-status-error-surface text-status-error-text' :
                        insight.severity === 'Medium' ? 'bg-status-warning-surface text-status-warning-text' :
                        'bg-status-success-surface text-status-success-text'
                      }`}>{insight.severity}</span>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-tight line-clamp-2">{insight.signal}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-card border border-border-subtle shadow-sm p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">AI Modules</h3>
            <div className="space-y-1">
              {[
                { label: 'AI Briefs', route: '/ai-briefs' },
                { label: 'Risk Alerts', route: '/risk-alerts' },
                { label: 'Finance Insights', route: '/finance-insights' },
                { label: 'Guardrails Log', route: '/ai-guardrails' },
              ].map(link => (
                <Link
                  key={link.route}
                  to={link.route}
                  className="flex items-center justify-between p-2 rounded-card hover:bg-surface-1 transition-colors text-xs"
                >
                  <span className="text-text-secondary">{link.label}</span>
                  <span className="text-dq-orange">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
