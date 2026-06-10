import { FileText, Image, FileCheck, AlertCircle, Download, Eye } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import RequestIDTag from '../../components/RequestIDTag'
import StatusBadge from '../../components/StatusBadge'

const evidenceFiles = [
  { id: 'EVD-001', requestRef: 'REQ-2025-0041', fileName: 'receipt_flight_booking_may14.pdf', fileType: 'Receipt', fileSize: '248 KB', uploadedBy: 'Aisha Khalid', uploadedDate: '14 May 2026 16:12', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Expense' },
  { id: 'EVD-002', requestRef: 'REQ-2025-0042', fileName: 'notion_annual_quote.pdf', fileType: 'Quote', fileSize: '186 KB', uploadedBy: 'Jay Nair', uploadedDate: '15 May 2026 10:25', status: 'Verified', verifiedBy: 'Sara Pereira', category: 'Purchase' },
  { id: 'EVD-003', requestRef: 'REQ-2025-0043', fileName: 'anthropic_may_invoice.pdf', fileType: 'Invoice', fileSize: '142 KB', uploadedBy: 'Finance Ops', uploadedDate: '16 May 2026 08:34', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Invoice' },
  { id: 'EVD-004', requestRef: 'REQ-2025-0044', fileName: 'datastax_company_registration.pdf', fileType: 'Company Registration', fileSize: '512 KB', uploadedBy: 'Procurement Ops', uploadedDate: '16 May 2026 11:18', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Vendor Onboarding' },
  { id: 'EVD-005', requestRef: 'REQ-2025-0044', fileName: 'datastax_bank_details.pdf', fileType: 'Bank Details', fileSize: '95 KB', uploadedBy: 'Procurement Ops', uploadedDate: '16 May 2026 11:20', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Vendor Onboarding' },
  { id: 'EVD-006', requestRef: 'REQ-2025-0046', fileName: 'kenya_travel_receipts.pdf', fileType: 'Travel Receipts', fileSize: '1.2 MB', uploadedBy: 'Delivery team', uploadedDate: '13 May 2026 14:45', status: 'Verified', verifiedBy: 'Sara Pereira', category: 'Expense' },
  { id: 'EVD-007', requestRef: 'REQ-2025-0047', fileName: 'mazrui_invoice_milestone2.pdf', fileType: 'Invoice', fileSize: '324 KB', uploadedBy: 'Finance Ops', uploadedDate: '15 May 2026 09:12', status: 'Pending Review', verifiedBy: '', category: 'Invoice' },
  { id: 'EVD-008', requestRef: 'REQ-2025-0047', fileName: 'delivery_confirmation_signed.pdf', fileType: 'Delivery Confirmation', fileSize: '1.8 MB', uploadedBy: 'Finance Ops', uploadedDate: '15 May 2026 09:15', status: 'Pending Review', verifiedBy: '', category: 'Invoice' },
  { id: 'EVD-009', requestRef: 'REQ-2025-0049', fileName: 'q3_marketing_campaign_brief.pdf', fileType: 'Campaign Brief', fileSize: '2.4 MB', uploadedBy: 'Jay Nair', uploadedDate: '17 May 2026 11:28', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Budget' },
  { id: 'EVD-010', requestRef: 'REQ-2025-0050', fileName: 'galp_energia_registration.pdf', fileType: 'Company Registration', fileSize: '687 KB', uploadedBy: 'Sara Pereira', uploadedDate: '16 May 2026 13:45', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Customer Onboarding' },
  { id: 'EVD-011', requestRef: 'REQ-2025-0050', fileName: 'galp_signed_msa.pdf', fileType: 'Master Service Agreement', fileSize: '3.2 MB', uploadedBy: 'Sara Pereira', uploadedDate: '16 May 2026 13:48', status: 'Verified', verifiedBy: 'Mohammed Rashid', category: 'Customer Onboarding' },
  { id: 'EVD-012', requestRef: 'REQ-2401-124', fileName: 'expense_receipts_mixed.jpg', fileType: 'Receipt', fileSize: '4.8 MB', uploadedBy: 'Sara Pereira', uploadedDate: '17 May 2026 10:14', status: 'Flagged', verifiedBy: '', category: 'Expense', flagReason: 'Image quality poor - hard to read amounts' },
  { id: 'EVD-013', requestRef: 'HR-002', fileName: 'jay_nair_employment_letter.pdf', fileType: 'Employment Letter', fileSize: '156 KB', uploadedBy: 'Fatima Bin Hammad', uploadedDate: '16 May 2026 15:32', status: 'Verified', verifiedBy: 'Fatima Bin Hammad', category: 'HR' },
  { id: 'EVD-014', requestRef: 'ADM-001', fileName: 'nairobi_flight_options.pdf', fileType: 'Travel Quote', fileSize: '428 KB', uploadedBy: 'Maya Sharma', uploadedDate: '14 May 2026 16:05', status: 'Verified', verifiedBy: 'Layla Seitkali', category: 'Travel' },
  { id: 'EVD-015', requestRef: 'REQ-2025-0052', fileName: 'senior_engineer_role_spec.pdf', fileType: 'Role Specification', fileSize: '198 KB', uploadedBy: 'Mohammed Rashid', uploadedDate: '10 May 2026 09:22', status: 'Verified', verifiedBy: 'Aisha Khalid', category: 'Budget' },
]

export default function EvidenceRepository() {
  const { showToast } = useToast()
  const verified = evidenceFiles.filter(e => e.status === 'Verified').length
  const pending = evidenceFiles.filter(e => e.status === 'Pending Review').length
  const flagged = evidenceFiles.filter(e => e.status === 'Flagged').length
  const totalSize = evidenceFiles.reduce((sum, e) => {
    const size = parseFloat(e.fileSize)
    const unit = e.fileSize.split(' ')[1]
    return sum + (unit === 'MB' ? size : size / 1024)
  }, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Evidence Repository</h1>
        <p className="text-sm text-gray-600 mt-1">Central repository of uploaded evidence files and documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Total Files</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900">{evidenceFiles.length}</div>
          <div className="text-xs text-gray-500 mt-1">{totalSize.toFixed(1)} MB total</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          <div className="text-2xl font-semibold text-green-600">{verified}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-orange-600" />
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="text-2xl font-semibold text-orange-600">{pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <div className="text-sm text-gray-600">Flagged</div>
          </div>
          <div className="text-2xl font-semibold text-red-600">{flagged}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {evidenceFiles.map((file) => (
                <tr key={file.id} className={`hover:bg-gray-50 ${file.status === 'Flagged' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs text-gray-600">{file.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RequestIDTag id={file.requestRef} />
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      {file.fileName.endsWith('.pdf') ? (
                        <FileText className="h-4 w-4 text-red-600" />
                      ) : (
                        <Image className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="text-sm text-gray-900 truncate">{file.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.fileType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {file.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.fileSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.uploadedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.uploadedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={file.status} />
                      {file.status === 'Verified' && file.verifiedBy && (
                        <span className="text-xs text-gray-500">by {file.verifiedBy}</span>
                      )}
                      {file.status === 'Flagged' && file.flagReason && (
                        <span className="text-xs text-red-600">{file.flagReason}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Viewing ${file.fileName}...`, 'info')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => showToast(`Downloading ${file.fileName}...`, 'info')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
