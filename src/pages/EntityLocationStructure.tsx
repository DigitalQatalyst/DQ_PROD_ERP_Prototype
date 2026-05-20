import { Globe, Building2, CheckCircle } from 'lucide-react'
import { entities } from '../data/fixtures'
import { useToast } from '../components/Toast'

const entityDetails = [
  {
    name: 'DigitalQatalyst MENA',
    country: 'UAE',
    currency: 'AED',
    legalEntity: 'DigitalQatalyst FZ-LLC',
    registrationNo: 'DIC-54982',
    vatNo: 'TRN100329847100003',
    address: 'Dubai Internet City, Building 14, Office 302, Dubai, UAE',
    bcCompany: 'DQ-MENA-001',
    active: true,
    isDefault: true,
    locations: ['Dubai (HQ)', 'Abu Dhabi (Client Office)'],
  },
  {
    name: 'DigitalQatalyst East Africa',
    country: 'Kenya',
    currency: 'KES',
    legalEntity: 'DigitalQatalyst EA Limited',
    registrationNo: 'CPR/2023/89412',
    vatNo: 'P051873402B',
    address: '14 Westlands Road, Nairobi, Kenya',
    bcCompany: 'DQ-EA-002',
    active: true,
    isDefault: false,
    locations: ['Nairobi (HQ)'],
  },
  {
    name: 'DigitalQatalyst Iberia',
    country: 'Portugal',
    currency: 'EUR',
    legalEntity: 'DigitalQatalyst Lda.',
    registrationNo: 'PT-509284417',
    vatNo: 'PT512944018',
    address: 'Av. da Liberdade 110, 1250-149 Lisbon, Portugal',
    bcCompany: 'DQ-IB-003',
    active: true,
    isDefault: false,
    locations: ['Lisbon (HQ)'],
  },
]

export default function EntityLocationStructure() {
  const { showToast } = useToast()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">Entity & Location Structure</h1>
      <p className="text-sm text-text-muted mb-6">Multi-entity org structure configuration covering entities, locations, currencies, and BC mappings.</p>

      {/* Summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-status-success-surface rounded-pill">
          <Globe size={13} className="text-status-success" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-status-success-text">{entities.length}</span>
          <span className="text-xs text-text-muted">Operating Entities</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-pill">
          <Building2 size={13} className="text-dq-navy" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-dq-navy">{entityDetails.reduce((s, e) => s + e.locations.length, 0)}</span>
          <span className="text-xs text-text-muted">Locations</span>
        </div>
      </div>

      {/* Entity cards */}
      <div className="space-y-4">
        {entityDetails.map((e, i) => (
          <div
            key={e.name}
            className={`p-6 bg-white rounded-card border shadow-sm ${e.isDefault ? 'border-dq-orange' : 'border-border-subtle'}`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-text-primary">{e.name}</h2>
                  {e.isDefault && (
                    <span className="text-xs font-semibold text-dq-orange bg-orange-50 border border-dq-orange/30 rounded-pill px-2 py-0.5">Active Entity</span>
                  )}
                </div>
                <p className="text-sm text-text-muted">{e.legalEntity} · {e.country}</p>
              </div>
              <button
                onClick={() => showToast(`${e.name} settings opened.`, 'info')}
                className="px-3 py-1.5 text-xs font-semibold rounded-btn border border-border-default text-text-muted hover:bg-surface-1 transition-colors shrink-0"
              >
                Configure
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-text-muted mb-0.5">Registration Number</p>
                <p className="font-mono text-text-primary">{e.registrationNo}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">VAT / Tax Number</p>
                <p className="font-mono text-text-primary">{e.vatNo}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">Currency</p>
                <p className="font-semibold text-text-primary">{e.currency}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">BC Company Code</p>
                <p className="font-mono text-dq-navy font-semibold">{e.bcCompany}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-text-muted mb-0.5">Registered Address</p>
                <p className="text-text-secondary">{e.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-text-muted mb-0.5">Locations</p>
                <div className="flex items-center gap-2">
                  {e.locations.map((loc) => (
                    <span key={loc} className="flex items-center gap-1 text-xs font-medium text-dq-navy bg-navy-50 rounded-pill px-2 py-0.5">
                      <Building2 size={10} strokeWidth={1.5} />
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <CheckCircle size={13} className="text-status-success" strokeWidth={1.5} />
              <span className="text-xs text-status-success-text font-semibold">BC sync active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
