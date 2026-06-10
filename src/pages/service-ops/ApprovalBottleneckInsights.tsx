import { AlertTriangle, Clock, TrendingUp, User, Zap, Target } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

const bottlenecks = [
  { 
    approver: 'Sara Pereira', 
    avgResponseTime: 4.2, 
    pendingCount: 8, 
    overdueCount: 3, 
    at30Days: 56,
    at7Days: 12,
    bottleneckScore: 8.4,
    severity: 'High',
    insights: 'Peak workload Wed-Fri. 62% delays occur after 4pm. Suggest: delegation or workload redistribution.'
  },
  { 
    approver: 'Yasmin Al-Mansoori', 
    avgResponseTime: 3.8, 
    pendingCount: 6, 
    overdueCount: 2,
    at30Days: 38,
    at7Days: 9, 
    bottleneckScore: 7.2,
    severity: 'Medium',
    insights: 'Longer response times for vendor onboarding vs purchase requests. Consider specialist assignment.'
  },
  { 
    approver: 'Rashid Ahmed', 
    avgResponseTime: 3.4, 
    pendingCount: 7, 
    overdueCount: 2,
    at30Days: 38,
    at7Days: 10,
    bottleneckScore: 6.8,
    severity: 'Medium',
    insights: 'Delays correlate with inventory reconciliation periods. Suggest: temporary backup approver.'
  },
  { 
    approver: 'Mohammed Rashid', 
    avgResponseTime: 2.8, 
    pendingCount: 4, 
    overdueCount: 1,
    at30Days: 48,
    at7Days: 8,
    bottleneckScore: 4.5,
    severity: 'Low',
    insights: 'High-value requests take 2x longer. Within acceptable thresholds.'
  },
]

const serviceBottlenecks = [
  { service: 'Vendor Onboarding', avgCycleTime: 5.4, targetCycleTime: 3.0, delayRate: 42.8, topDelayReason: 'Missing compliance documents (68%)', recommendation: 'Implement pre-submission checklist' },
  { service: 'Expense Reimbursement', avgCycleTime: 3.2, targetCycleTime: 2.0, delayRate: 38.7, topDelayReason: 'Receipt quality issues (54%)', recommendation: 'Add receipt validation at upload' },
  { service: 'Customer Onboarding', avgCycleTime: 4.8, targetCycleTime: 3.5, delayRate: 33.3, topDelayReason: 'Missing VAT/tax documents (61%)', recommendation: 'Auto-reminder for required evidence' },
  { service: 'Budget Requisitions', avgCycleTime: 3.6, targetCycleTime: 2.5, delayRate: 28.6, topDelayReason: 'Insufficient business case (47%)', recommendation: 'Guided submission with templates' },
]

const timeAnalysis = [
  { stage: 'Submission to Assignment', avgHours: 2.4, targetHours: 1.0, performance: 'Below Target' },
  { stage: 'Assignment to First Review', avgHours: 18.2, targetHours: 12.0, performance: 'Below Target' },
  { stage: 'First Review to Decision', avgHours: 8.6, targetHours: 8.0, performance: 'On Target' },
  { stage: 'Decision to BC Sync', avgHours: 4.2, targetHours: 2.0, performance: 'Below Target' },
]

const aiRecommendations = [
  { priority: 'Critical', recommendation: 'Redistribute 40% of Sara Pereira\'s pending approvals to Fatima Bin Hammad', impact: 'Reduce avg response time by 1.8 days' },
  { priority: 'High', recommendation: 'Implement automated evidence validation for top 3 services', impact: 'Reduce rejection rate by ~25%' },
  { priority: 'High', recommendation: 'Add delegation rules: auto-delegate after 48h for pending approvals', impact: 'Eliminate 85% of SLA breaches' },
  { priority: 'Medium', recommendation: 'Enable smart routing: assign vendor requests directly to Yasmin Al-Mansoori', impact: 'Save 2.4h per request in assignment time' },
]

export default function ApprovalBottleneckInsights() {
  const { showToast } = useToast()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Approval Bottleneck Insights</h1>
        <p className="text-sm text-gray-600 mt-1">AI-powered analysis of approval delays and bottlenecks (Last 30 days)</p>
      </div>

      {/* AI Recommendations Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-purple-600 shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">AI-Generated Recommendations</h2>
            <div className="space-y-3">
              {aiRecommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${
                          rec.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{rec.recommendation}</p>
                      <p className="text-xs text-gray-600">
                        <Target className="h-3 w-3 inline mr-1" />
                        Expected impact: {rec.impact}
                      </p>
                    </div>
                    <button
                      onClick={() => showToast('Recommendation details opened', 'info')}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Approver Bottlenecks */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Approver Bottleneck Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response (days)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload (30d)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bottleneck Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Insights</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bottlenecks.map((bottleneck) => (
                <tr key={bottleneck.approver} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{bottleneck.approver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {bottleneck.avgResponseTime > 3.5 && <TrendingUp className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-medium ${
                        bottleneck.avgResponseTime > 3.5 ? 'text-red-600' :
                        bottleneck.avgResponseTime > 2.5 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {bottleneck.avgResponseTime}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      bottleneck.pendingCount >= 8 ? 'text-red-600' :
                      bottleneck.pendingCount >= 5 ? 'text-orange-600' : 'text-gray-900'
                    }`}>
                      {bottleneck.pendingCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {bottleneck.overdueCount > 0 && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      <span className={`text-sm font-medium ${
                        bottleneck.overdueCount > 0 ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {bottleneck.overdueCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bottleneck.at30Days}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                        <div
                          className={`h-2 rounded-full ${
                            bottleneck.bottleneckScore >= 8 ? 'bg-red-600' :
                            bottleneck.bottleneckScore >= 6 ? 'bg-orange-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${(bottleneck.bottleneckScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{bottleneck.bottleneckScore}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <p className="line-clamp-2">{bottleneck.insights}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Type Bottlenecks */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Service Type Bottleneck Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Cycle Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Delay Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceBottlenecks.map((service) => (
                <tr key={service.service} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      service.avgCycleTime > service.targetCycleTime * 1.5 ? 'text-red-600' :
                      service.avgCycleTime > service.targetCycleTime ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {service.avgCycleTime}d
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.targetCycleTime}d</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      service.delayRate >= 40 ? 'text-red-600' :
                      service.delayRate >= 30 ? 'text-orange-600' : 'text-gray-900'
                    }`}>
                      {service.delayRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p className="line-clamp-1">{service.topDelayReason}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p className="line-clamp-2">{service.recommendation}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workflow Stage Analysis */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Workflow Stage Time Analysis</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timeAnalysis.map((stage) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-56">
                  <div className="text-sm font-medium text-gray-900">{stage.stage}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stage.avgHours}h avg (target: {stage.targetHours}h)
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full ${
                        stage.performance === 'Below Target' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((stage.avgHours / (stage.targetHours * 2)) * 100, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-700">{stage.performance}</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  {stage.avgHours > stage.targetHours ? (
                    <span className="text-sm font-medium text-orange-600">
                      +{(stage.avgHours - stage.targetHours).toFixed(1)}h
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">
                      <Clock className="h-4 w-4 inline" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
