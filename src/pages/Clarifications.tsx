import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import RequestIDTag from '../components/RequestIDTag'
import StatusBadge from '../components/StatusBadge'
import { useToast } from '../components/Toast'

const threads = [
  {
    id: 'CLR-001',
    requestId: 'REQ-2025-0046',
    subject: 'Expense: Kenya team travel — Per-diem breakdown required',
    status: 'Open' as const,
    initiator: 'Sara Pereira',
    daysOpen: 4,
    messages: [
      { author: 'Sara Pereira', role: 'Finance Ops Practitioner', time: '16 May 2026 14:30', text: 'Please provide a per-diem breakdown for each team member for the Kenya travel claim. The current submission shows a lump sum of AED 8,750 without individual day/person detail. We need this to process the reimbursement.' },
      { author: 'Delivery Team', role: 'Internal Requestor', time: '17 May 2026 09:15', text: 'Apologies for the delay — we are compiling the breakdown from the trip log. Will upload by EOD today.' },
      { author: 'Sara Pereira', role: 'Finance Ops Practitioner', time: '18 May 2026 11:00', text: 'Still waiting — this is now 4 days overdue. Please submit the breakdown today or the claim will be escalated.' },
    ],
  },
  {
    id: 'CLR-002',
    requestId: 'REQ-2025-0044',
    subject: 'Vendor Onboarding: DataStax Ltd. — Tax registration certificate missing',
    status: 'Open' as const,
    initiator: 'Mohammed Rashid',
    daysOpen: 3,
    messages: [
      { author: 'Mohammed Rashid', role: 'Finance Control Owner', time: '16 May 2026 10:00', text: 'The vendor onboarding submission for DataStax Ltd. is missing the UAE tax registration certificate. This is a required document before we can create the vendor record in Business Central. Please provide the certificate or confirm if DataStax is not UAE-registered.' },
      { author: 'Procurement Ops', role: 'Procurement Practitioner', time: '17 May 2026 08:45', text: 'DataStax is incorporated in the US and does not have a UAE tax registration. I have reached out to their finance team to confirm the applicable tax documentation for cross-border vendor registration.' },
    ],
  },
]

export default function Clarifications() {
  const [activeThread, setActiveThread] = useState(threads[0])
  const [reply, setReply] = useState('')
  const { showToast } = useToast()

  const handleSend = () => {
    if (!reply.trim()) return
    showToast('Reply sent. The requester has been notified.', 'success')
    setReply('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Clarifications</h1>
      <p className="text-sm text-text-muted mb-6">Threaded clarification requests linked to active finance and procurement records.</p>

      <div className="flex gap-5 h-[580px]">
        {/* Thread list */}
        <div className="w-[280px] shrink-0 bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle bg-surface-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Open ({threads.filter(t => t.status === 'Open').length})
            </p>
          </div>
          <div className="overflow-y-auto flex-1">
            {threads.map((t) => (
              <button key={t.id} onClick={() => setActiveThread(t)}
                className={`w-full text-left px-4 py-4 border-b border-border-subtle transition-all ${
                  activeThread.id === t.id ? 'bg-navy-50 border-l-2 border-l-dq-orange' : 'hover:bg-surface-1 border-l-2 border-l-transparent'
                }`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <RequestIDTag id={t.requestId} />
                  <span className="text-[10px] font-semibold text-status-error-text bg-status-error-surface rounded-pill px-1.5 py-0.5">
                    {t.daysOpen}d open
                  </span>
                </div>
                <p className="text-xs font-medium text-text-primary leading-snug line-clamp-2">{t.subject}</p>
                <p className="text-xs text-text-muted mt-1">From: {t.initiator}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Thread detail */}
        <div className="flex-1 bg-white rounded-card border border-border-subtle shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border-subtle bg-surface-1">
            <div className="flex items-center gap-2 mb-1">
              <RequestIDTag id={activeThread.requestId} />
              <StatusBadge status="Clarification Needed" size="sm" />
            </div>
            <p className="text-sm font-semibold text-text-primary">{activeThread.subject}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {activeThread.messages.map((msg, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-dq-navy flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {msg.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">{msg.author}</span>
                    <span className="text-xs text-text-muted">{msg.role}</span>
                    <span className="text-xs text-text-disabled ml-auto">{msg.time}</span>
                  </div>
                  <div className="bg-surface-1 rounded-card p-3 text-sm text-text-secondary leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <div className="border-t border-border-subtle px-6 py-4">
            <div className="flex gap-3">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply…"
                rows={2}
                className="flex-1 px-4 py-2.5 rounded-input border border-border-default text-sm focus:outline-none resize-none"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 self-end"
              >
                <Send size={14} strokeWidth={1.5} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
