import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Receipt, FileText, TrendingUp, ShoppingCart, UserPlus,
  RefreshCw, Link, Briefcase, FolderOpen, Upload, Check,
} from 'lucide-react'
import AIInsightCard from '../components/AIInsightCard'
import { useToast } from '../components/Toast'
import { projects, costCentres, vendors } from '../data/fixtures'

type StepType = 1 | 2 | 3

const STEP_LABELS = ['What do you need?', 'Details', 'Evidence & Submit']

const REQUEST_TYPES = {
  Finance: [
    { key: 'expense', label: 'Submit an Expense', icon: <Receipt size={20} strokeWidth={1.5} /> },
    { key: 'invoice', label: 'Invoice / Payment', icon: <FileText size={20} strokeWidth={1.5} /> },
    { key: 'budget', label: 'Budget Amendment', icon: <TrendingUp size={20} strokeWidth={1.5} /> },
  ],
  Procurement: [
    { key: 'purchase', label: 'Purchase Request', icon: <ShoppingCart size={20} strokeWidth={1.5} /> },
    { key: 'vendor', label: 'Vendor Onboarding', icon: <UserPlus size={20} strokeWidth={1.5} /> },
    { key: 'renewal', label: 'Subscription Renewal', icon: <RefreshCw size={20} strokeWidth={1.5} /> },
  ],
  'Project / Service': [
    { key: 'project-cost', label: 'Project Cost Request', icon: <Link size={20} strokeWidth={1.5} /> },
    { key: 'delivery', label: 'Delivery Support', icon: <Briefcase size={20} strokeWidth={1.5} /> },
    { key: 'workorder', label: 'Work Order Request', icon: <FolderOpen size={20} strokeWidth={1.5} /> },
  ],
}

export default function UniversalRequestIntake() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const initialType = searchParams.get('type') === 'purchase' ? 'purchase' : null
  const [step, setStep] = useState<StepType>(1)
  const [selectedType, setSelectedType] = useState<string | null>(initialType)
  const [form, setForm] = useState({
    description: '',
    vendor: '',
    amount: '',
    project: '',
    costCentre: '',
    justification: '',
  })
  const [justificationEntered, setJustificationEntered] = useState(false)

  const handleNext = () => {
    if (step === 1) {
      if (!selectedType) return
      setStep(2)
    } else if (step === 2) {
      setJustificationEntered(!!form.justification)
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as StepType)
  }

  const handleSubmit = () => {
    showToast(
      'REQ-2025-0049 submitted. Mohammed Rashid will review within 1 business day.',
      'success'
    )
    navigate('/request-tracker')
  }

  const handleDraft = () => {
    showToast('Draft saved.', 'info')
  }

  return (
    <div className="max-w-[720px]">
      <h1 className="text-2xl font-bold text-text-primary mb-1">Universal Request Intake</h1>
      <p className="text-sm text-text-muted mb-6">Create a new finance, procurement, or project request.</p>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = (idx + 1) as StepType
          const isActive = step === stepNum
          const isPast = step > stepNum
          return (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-dq-orange text-white'
                      : isPast
                      ? 'border-2 border-dq-orange bg-white text-dq-orange'
                      : 'border-2 border-border-default bg-white text-text-disabled'
                  }`}
                >
                  {isPast ? <Check size={16} strokeWidth={2} /> : stepNum}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    isActive ? 'text-dq-orange' : isPast ? 'text-dq-navy' : 'text-text-disabled'
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-16px] ${
                    isPast ? 'bg-dq-orange' : 'bg-border-default'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-6">
          {Object.entries(REQUEST_TYPES).map(([group, types]) => (
            <div key={group}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3">
                {group}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {types.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedType(t.key)}
                    className={`p-4 rounded-card text-left transition-all ${
                      selectedType === t.key
                        ? 'border-2 border-dq-orange bg-orange-50'
                        : 'border border-border-default bg-white hover:bg-surface-1'
                    }`}
                  >
                    <span className={selectedType === t.key ? 'text-dq-orange' : 'text-text-muted'}>
                      {t.icon}
                    </span>
                    <p className="text-sm font-medium text-text-primary mt-2">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* AI hint */}
          <AIInsightCard>
            Based on your profile and recent activity, this may be a Purchase Request.
          </AIInsightCard>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!selectedType}
              className="px-6 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Request Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe what you need…"
              rows={3}
              className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary placeholder-text-disabled focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Category</label>
              <input
                readOnly
                value="Procurement / Purchase Request"
                className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-muted bg-surface-1 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Vendor</label>
              <select
                value={form.vendor}
                onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary bg-white focus:outline-none"
              >
                <option value="">Select vendor…</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Amount (AED)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">AED</span>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-14 pr-4 py-2.5 rounded-input border border-border-default text-sm font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Project Link</label>
              <select
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary bg-white focus:outline-none"
              >
                <option value="">None</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.id} — {p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Cost Centre</label>
              <select
                value={form.costCentre}
                onChange={(e) => setForm({ ...form, costCentre: e.target.value })}
                className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary bg-white focus:outline-none"
              >
                <option value="">Select cost centre…</option>
                {costCentres.map((c) => (
                  <option key={c.id} value={c.id}>{c.id} — {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Approval Route</label>
              <input
                readOnly
                value="Mohammed Rashid — Finance Control Owner"
                className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-muted bg-surface-1 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Justification</label>
            <textarea
              value={form.justification}
              onChange={(e) => setForm({ ...form, justification: e.target.value })}
              placeholder="Business justification for this request…"
              rows={3}
              className="w-full px-4 py-2.5 rounded-input border border-border-default text-sm text-text-primary placeholder-text-disabled focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-text-primary mb-3">Evidence Checklist</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-status-success flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={2.5} className="text-white" />
                </div>
                <span className="text-sm text-text-primary flex-1">
                  Business justification summary <span className="text-text-muted">(Required)</span>
                </span>
                <span className="text-xs text-status-success-text font-medium">✓ Entered in Step 2</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-border-default shrink-0" />
                <span className="text-sm text-text-primary flex-1">
                  Supplier quote or price reference <span className="text-text-muted">(Required)</span>
                </span>
                <button className="text-xs text-dq-orange font-medium flex items-center gap-1 hover:underline">
                  <Upload size={12} strokeWidth={1.5} />
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* File upload zone */}
          <div
            className="border border-dashed border-border-strong rounded-card p-8 text-center bg-surface-1"
          >
            <Upload size={28} className="text-icon-muted mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-text-primary mb-1">Drag files here or click to browse</p>
            <p className="text-xs text-text-muted">PDF, XLSX, PNG, JPG — up to 20MB</p>
            <button className="mt-4 px-4 py-2 rounded-btn border border-border-default text-sm font-medium text-text-primary hover:bg-white transition-colors">
              Browse Files
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-primary hover:bg-surface-1 transition-colors"
            >
              Back
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleDraft}
                className="px-6 py-2.5 rounded-btn border border-border-default text-sm font-semibold text-text-muted hover:bg-surface-1 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-btn bg-dq-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
