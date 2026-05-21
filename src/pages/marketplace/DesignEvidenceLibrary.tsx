import {
  Receipt, FileText, GitPullRequest, Shield, Building, IdCard, Plane, Briefcase, ClipboardCheck,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface Evidence {
  id: string
  name: string
  icon: ReactNode
  whatItIs: string
  whenRequired: string
  accepted: string[]
  example: string
}

const evidence: Evidence[] = [
  {
    id: 'receipt',
    name: 'Receipt',
    icon: <Receipt size={20} strokeWidth={1.5} />,
    whatItIs: 'Proof of payment showing the vendor, amount, date, and items purchased.',
    whenRequired: 'Mandatory for any expense ≥ AED 50; for reimbursement and travel claims.',
    accepted: ['PDF', 'JPG / PNG photo', 'Original PDF from vendor'],
    example: 'Hotel folio, restaurant bill, taxi receipt, online store receipt.',
  },
  {
    id: 'invoice',
    name: 'Signed Invoice',
    icon: <FileText size={20} strokeWidth={1.5} />,
    whatItIs: 'Vendor-issued invoice with itemised charges, dates, VAT details, and payment terms.',
    whenRequired: 'Mandatory for all Invoice / Payment requests; for AP processing and BC sync.',
    accepted: ['PDF (vendor letterhead)', 'Structured e-invoice (XML)'],
    example: 'Microsoft 365 invoice, AWS monthly statement, consulting engagement invoice.',
  },
  {
    id: 'quote',
    name: 'Supplier Quote',
    icon: <GitPullRequest size={20} strokeWidth={1.5} />,
    whatItIs: 'Pricing proposal from a supplier — scope, unit costs, total, validity period.',
    whenRequired: 'Mandatory for Purchase Requests; 3 quotes required above AED 25k.',
    accepted: ['Vendor PDF quote', 'Email confirmation with line items'],
    example: 'AWS infrastructure top-up quote, recruitment agency fee quote.',
  },
  {
    id: 'tax-cert',
    name: 'Tax Registration Certificate',
    icon: <Shield size={20} strokeWidth={1.5} />,
    whatItIs: 'Official document confirming vendor / customer registration with the tax authority (TRN in UAE).',
    whenRequired: 'Mandatory for Vendor Onboarding and Customer Onboarding; supports VAT reclaim.',
    accepted: ['Official tax authority PDF', 'Government portal screenshot with reference number'],
    example: 'UAE FTA TRN certificate, EU VAT registration.',
  },
  {
    id: 'company-reg',
    name: 'Company Registration',
    icon: <Building size={20} strokeWidth={1.5} />,
    whatItIs: 'Trade licence or incorporation document proving the legal existence of the entity.',
    whenRequired: 'Mandatory for Vendor Onboarding, Customer Onboarding, and cross-border partner setup.',
    accepted: ['Trade licence (UAE DED)', 'Company registry extract', 'Incorporation certificate'],
    example: 'UAE trade licence, Kenya CR12, Portuguese certidão permanente.',
  },
  {
    id: 'bank-details',
    name: 'Bank Details Letter',
    icon: <IdCard size={20} strokeWidth={1.5} />,
    whatItIs: 'Bank-issued confirmation of account name, number, IBAN, SWIFT, and currency.',
    whenRequired: 'Mandatory for Vendor Onboarding and Vendor Data Change (bank field updates).',
    accepted: ['Bank-issued PDF on letterhead', 'Cancelled cheque with name + IBAN'],
    example: 'Bank confirmation letter showing IBAN and SWIFT code.',
  },
  {
    id: 'travel-details',
    name: 'Travel Itinerary',
    icon: <Plane size={20} strokeWidth={1.5} />,
    whatItIs: 'Confirmed travel plan with dates, route, traveller, purpose, and cost estimate.',
    whenRequired: 'Mandatory for Travel / Admin requests; supports per-diem calculation.',
    accepted: ['Booking confirmation', 'Itinerary PDF', 'Travel approval email'],
    example: 'Flight + hotel itinerary for a client kickoff trip.',
  },
  {
    id: 'milestone-evidence',
    name: 'Milestone Evidence',
    icon: <Briefcase size={20} strokeWidth={1.5} />,
    whatItIs: 'Documentation that a project milestone has been reached — deliverables, sign-off, or client acceptance.',
    whenRequired: 'Mandatory for Service Billing Requests and Milestone Update Requests.',
    accepted: ['Signed acceptance form', 'Client email confirmation', 'Demo recording or deliverable link'],
    example: 'Client sign-off email for Design System Delivered milestone.',
  },
  {
    id: 'justification',
    name: 'Business Justification',
    icon: <ClipboardCheck size={20} strokeWidth={1.5} />,
    whatItIs: 'Short written rationale explaining why the request should be approved and expected outcomes.',
    whenRequired: 'Mandatory for Budget Requisitions, Budget Amendments, Purchase Requests; recommended for any high-value request.',
    accepted: ['Free-text in request form', 'Attached one-pager'],
    example: '"Q3 marketing campaign drives 200 new leads; AED 32k spend = ~AED 160 CPL."',
  },
]

export default function DesignEvidenceLibrary() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2" style={{ letterSpacing: '0.12em' }}>
          S01 Marketplace · Design
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Evidence Checklist Library</h1>
        <p className="text-sm text-text-muted max-w-3xl leading-relaxed">
          Every evidence type DWS.04 accepts — what it is, when it’s required, accepted formats, and examples. Use this to prepare evidence before raising a request, so nothing comes back as "evidence pending".
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {evidence.map((e) => (
          <div key={e.id} className="bg-white rounded-card border border-border-subtle shadow-sm p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0 text-dq-orange"
                   style={{ background: '#FFF5F2' }}>
                {e.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary leading-tight mb-1">{e.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{e.whatItIs}</p>
              </div>
            </div>

            <div className="space-y-2 mt-3 pt-3 border-t border-border-subtle">
              <div>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">When required</p>
                <p className="text-xs text-text-secondary">{e.whenRequired}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Accepted formats</p>
                <p className="text-xs text-text-secondary">{e.accepted.join(' · ')}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Example</p>
                <p className="text-xs text-text-secondary italic">{e.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
