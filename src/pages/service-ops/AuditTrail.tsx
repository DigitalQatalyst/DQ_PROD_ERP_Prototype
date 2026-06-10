import { History, User, FileEdit, CheckCircle, XCircle, RefreshCw, Shield } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'

const auditEvents = [
  { id: 'AUD-1248', timestamp: '18 May 2026 11:42', actor: 'Mohammed Rashid', action: 'Approved', target: 'REQ-2025-0043', targetType: 'Invoice', details: 'Amount: AED 12,400 | Approved within SLA', ipAddress: '192.168.1.42' },
  { id: 'AUD-1247', timestamp: '18 May 2026 11:41', actor: 'System', action: 'BC Sync Completed', target: 'REQ-2025-0043', targetType: 'Invoice', details: 'BC Ref: BC-INV-48821 | Sync successful', ipAddress: 'System' },
  { id: 'AUD-1246', timestamp: '18 May 2026 10:34', actor: 'Sara Pereira', action: 'Updated Status', target: 'REQ-2025-0042', targetType: 'Purchase Order', details: 'Status: Draft → In Review', ipAddress: '192.168.1.38' },
  { id: 'AUD-1245', timestamp: '17 May 2026 16:22', actor: 'Aisha Khalid', action: 'Rejected', target: 'REQ-2401-076', targetType: 'Expense', details: 'Reason: Outside approval threshold — requires CFO sign-off', ipAddress: '192.168.1.25' },
  { id: 'AUD-1244', timestamp: '17 May 2026 15:41', actor: 'System', action: 'BC Sync Failed', target: 'INV-013', targetType: 'Asset', details: 'Error: Asset category not mapped | Retry 2/3', ipAddress: 'System' },
  { id: 'AUD-1243', timestamp: '17 May 2026 14:18', actor: 'Fatima Bin Hammad', action: 'Evidence Uploaded', target: 'HR-002', targetType: 'HR Request', details: 'File: jay_nair_employment_letter.pdf | Size: 156 KB', ipAddress: '192.168.1.56' },
  { id: 'AUD-1242', timestamp: '17 May 2026 13:05', actor: 'Tariq Al-Amin', action: 'User Role Updated', target: 'Sara Pereira', targetType: 'User', details: 'Added role: FIN-OPS | Updated permissions', ipAddress: '192.168.1.12' },
  { id: 'AUD-1241', timestamp: '17 May 2026 11:28', actor: 'Jay Nair', action: 'Submitted Request', target: 'REQ-2025-0049', targetType: 'Budget Requisition', details: 'Amount: AED 32,000 | Project: PRJ-2402', ipAddress: '192.168.1.67' },
  { id: 'AUD-1240', timestamp: '17 May 2026 09:30', actor: 'Mohammed Rashid', action: 'Dispute Raised', target: 'REQ-2401-112', targetType: 'Invoice', details: 'Reason: Invoice amount does not match PO reference', ipAddress: '192.168.1.42' },
  { id: 'AUD-1239', timestamp: '17 May 2026 09:15', actor: 'Layla Seitkali', action: 'BC Sync Retry', target: 'VND-004', targetType: 'Vendor', details: 'Manual retry initiated | Retry 3/3', ipAddress: '192.168.1.84' },
  { id: 'AUD-1238', timestamp: '16 May 2026 16:45', actor: 'Rashid Ahmed', action: 'Evidence Flagged', target: 'EVD-012', targetType: 'Evidence', details: 'Reason: Image quality poor - hard to read amounts', ipAddress: '192.168.1.73' },
  { id: 'AUD-1237', timestamp: '16 May 2026 15:12', actor: 'Yasmin Al-Mansoori', action: 'Vendor Rejected', target: 'REQ-2401-085', targetType: 'Vendor Onboarding', details: 'Reason: Failed compliance check — tax registration invalid', ipAddress: '192.168.1.91' },
  { id: 'AUD-1236', timestamp: '16 May 2026 14:22', actor: 'System', action: 'BC Sync Failed', target: 'REQ-2025-0044', targetType: 'Vendor Onboarding', details: 'Error: Tax registration cert validation failed | Retry 2/3', ipAddress: 'System' },
  { id: 'AUD-1235', timestamp: '16 May 2026 13:48', actor: 'Sara Pereira', action: 'Evidence Uploaded', target: 'REQ-2025-0050', targetType: 'Customer Onboarding', details: 'File: galp_signed_msa.pdf | Size: 3.2 MB', ipAddress: '192.168.1.38' },
  { id: 'AUD-1234', timestamp: '16 May 2026 11:20', actor: 'Procurement Ops', action: 'Evidence Uploaded', target: 'REQ-2025-0044', targetType: 'Vendor Onboarding', details: 'File: datastax_bank_details.pdf | Size: 95 KB', ipAddress: '192.168.1.102' },
  { id: 'AUD-1233', timestamp: '15 May 2026 18:05', actor: 'System', action: 'SLA Warning', target: 'REQ-2025-0047', targetType: 'Invoice', details: 'SLA breach warning: 4 days remaining until due date', ipAddress: 'System' },
  { id: 'AUD-1232', timestamp: '15 May 2026 16:30', actor: 'Tariq Al-Amin', action: 'Permission Changed', target: 'Platform Config', targetType: 'System', details: 'Updated approval threshold for high-value invoices: AED 50,000 → AED 75,000', ipAddress: '192.168.1.12' },
  { id: 'AUD-1231', timestamp: '15 May 2026 14:45', actor: 'Sara Pereira', action: 'Approved', target: 'REQ-2401-087', targetType: 'Purchase Order', details: 'Amount: AED 45,800 | Approved within SLA', ipAddress: '192.168.1.38' },
  { id: 'AUD-1230', timestamp: '15 May 2026 10:25', actor: 'Jay Nair', action: 'Evidence Uploaded', target: 'REQ-2025-0042', targetType: 'Purchase Order', details: 'File: notion_annual_quote.pdf | Size: 186 KB', ipAddress: '192.168.1.67' },
  { id: 'AUD-1229', timestamp: '15 May 2026 09:15', actor: 'Finance Ops', action: 'Evidence Uploaded', target: 'REQ-2025-0047', targetType: 'Invoice', details: 'File: delivery_confirmation_signed.pdf | Size: 1.8 MB', ipAddress: '192.168.1.95' },
]

const actionTypes = [
  { type: 'Approved', count: 142, color: 'text-green-600' },
  { type: 'Rejected', count: 38, color: 'text-red-600' },
  { type: 'Submitted', count: 186, color: 'text-blue-600' },
  { type: 'Evidence Uploaded', count: 124, color: 'text-purple-600' },
  { type: 'BC Sync Completed', count: 856, color: 'text-green-600' },
  { type: 'BC Sync Failed', count: 21, color: 'text-red-600' },
  { type: 'Status Updated', count: 94, color: 'text-gray-600' },
  { type: 'Permission Changed', count: 12, color: 'text-orange-600' },
]

export default function AuditTrail() {
  const { showToast } = useToast()
  const systemEvents = auditEvents.filter(e => e.actor === 'System').length
  const userEvents = auditEvents.filter(e => e.actor !== 'System').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Audit Trail</h1>
        <p className="text-sm text-gray-600 mt-1">Comprehensive audit trail of all system actions and decisions (Last 7 days)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <History className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900">{auditEvents.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-purple-600" />
            <div className="text-sm text-gray-600">User Actions</div>
          </div>
          <div className="text-2xl font-semibold text-purple-600">{userEvents}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="h-4 w-4 text-gray-600" />
            <div className="text-sm text-gray-600">System Events</div>
          </div>
          <div className="text-2xl font-semibold text-gray-600">{systemEvents}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">Retention</div>
          </div>
          <div className="text-lg font-semibold text-gray-900">7 years</div>
        </div>
      </div>

      {/* Action Type Summary */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Action Type Summary (30 days)</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actionTypes.map((action) => (
              <div key={action.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{action.type}</span>
                <span className={`text-lg font-semibold ${action.color}`}>{action.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Events Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Audit Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{event.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {event.actor === 'System' ? (
                        <RefreshCw className="h-4 w-4 text-gray-400" />
                      ) : (
                        <User className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="text-sm text-gray-900">{event.actor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {event.action.includes('Approved') && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {event.action.includes('Rejected') && <XCircle className="h-4 w-4 text-red-600" />}
                      {event.action.includes('Uploaded') && <FileEdit className="h-4 w-4 text-purple-600" />}
                      {event.action.includes('Failed') && <XCircle className="h-4 w-4 text-red-600" />}
                      {event.action.includes('Completed') && <CheckCircle className="h-4 w-4 text-green-600" />}
                      <span className="text-sm font-medium text-gray-900">{event.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.target.startsWith('REQ') || event.target.startsWith('VND') || event.target.startsWith('CUST') ? (
                      <RequestIDTag id={event.target} />
                    ) : (
                      <span className="text-sm text-gray-900">{event.target}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {event.targetType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <p className="line-clamp-2">{event.details}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-500">{event.ipAddress}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Audit Compliance & Retention</h4>
            <p className="text-sm text-gray-700">
              All system events are logged and retained for 7 years in compliance with financial regulations. 
              Audit logs are immutable and cryptographically signed. Access to audit trail is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
