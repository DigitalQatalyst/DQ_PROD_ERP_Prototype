import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Users, FileText } from 'lucide-react'

const serviceMetrics = [
  { service: 'Purchase Requests', total: 186, completed: 142, pending: 32, rejected: 12, avgCycleTime: 2.8, slaCompliance: 94.2, trend: 'up' },
  { service: 'Invoice Processing', total: 248, completed: 215, pending: 24, rejected: 9, avgCycleTime: 1.9, slaCompliance: 96.8, trend: 'up' },
  { service: 'Expense Reimbursement', total: 124, completed: 98, pending: 18, rejected: 8, avgCycleTime: 3.2, slaCompliance: 89.5, trend: 'down' },
  { service: 'Vendor Onboarding', total: 28, completed: 21, pending: 4, rejected: 3, avgCycleTime: 5.4, slaCompliance: 82.1, trend: 'down' },
  { service: 'Customer Onboarding', total: 15, completed: 12, pending: 2, rejected: 1, avgCycleTime: 4.8, slaCompliance: 86.7, trend: 'up' },
  { service: 'Budget Requisitions', total: 42, completed: 34, pending: 6, rejected: 2, avgCycleTime: 3.6, slaCompliance: 92.9, trend: 'up' },
  { service: 'Asset Transfers', total: 67, completed: 58, pending: 7, rejected: 2, avgCycleTime: 2.1, slaCompliance: 95.5, trend: 'up' },
  { service: 'HR Requests', total: 89, completed: 76, pending: 11, rejected: 2, avgCycleTime: 2.4, slaCompliance: 93.3, trend: 'up' },
]

const approverPerformance = [
  { approver: 'Mohammed Rashid', assigned: 48, approved: 38, rejected: 6, pending: 4, avgResponseTime: 1.8, onTime: 95.8 },
  { approver: 'Aisha Khalid', assigned: 32, approved: 26, rejected: 3, pending: 3, avgResponseTime: 2.1, onTime: 93.8 },
  { approver: 'Sara Pereira', assigned: 56, approved: 44, rejected: 8, pending: 4, avgResponseTime: 2.4, onTime: 91.1 },
  { approver: 'Fatima Bin Hammad', assigned: 41, approved: 34, rejected: 4, pending: 3, avgResponseTime: 1.9, onTime: 94.5 },
  { approver: 'Rashid Ahmed', assigned: 38, approved: 32, rejected: 2, pending: 4, avgResponseTime: 2.2, onTime: 92.1 },
]

const volumeTrends = [
  { month: 'Dec 2025', submitted: 542, completed: 498, rejected: 28 },
  { month: 'Jan 2026', submitted: 587, completed: 539, rejected: 32 },
  { month: 'Feb 2026', submitted: 612, completed: 568, rejected: 29 },
  { month: 'Mar 2026', submitted: 648, completed: 601, rejected: 31 },
  { month: 'Apr 2026', submitted: 695, completed: 638, rejected: 35 },
  { month: 'May 2026 (MTD)', submitted: 412, completed: 367, rejected: 24 },
]

export default function ServicePerformanceDashboard() {
  const totalRequests = serviceMetrics.reduce((sum, s) => sum + s.total, 0)
  const totalCompleted = serviceMetrics.reduce((sum, s) => sum + s.completed, 0)
  const totalPending = serviceMetrics.reduce((sum, s) => sum + s.pending, 0)
  const avgCycleTime = (serviceMetrics.reduce((sum, s) => sum + s.avgCycleTime * s.total, 0) / totalRequests).toFixed(1)
  const avgSLACompliance = (serviceMetrics.reduce((sum, s) => sum + s.slaCompliance * s.total, 0) / totalRequests).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Service Performance Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Service-level performance metrics and trends (Last 30 days)</p>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Total Requests</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900">{totalRequests}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-2xl font-semibold text-green-600">{totalCompleted}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-2xl font-semibold text-orange-600">{totalPending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <div className="text-sm text-gray-600">Avg Cycle Time</div>
          </div>
          <div className="text-2xl font-semibold text-gray-900">{avgCycleTime}d</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <div className="text-sm text-gray-600">SLA Compliance</div>
          </div>
          <div className="text-2xl font-semibold text-green-600">{avgSLACompliance}%</div>
        </div>
      </div>

      {/* Service Performance Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance by Service Type</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Cycle (days)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceMetrics.map((service) => (
                <tr key={service.service} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{service.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{service.pending}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{service.rejected}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      service.avgCycleTime <= 2 ? 'text-green-600' :
                      service.avgCycleTime <= 3.5 ? 'text-gray-900' : 'text-orange-600'
                    }`}>
                      {service.avgCycleTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                        <div
                          className={`h-2 rounded-full ${
                            service.slaCompliance >= 95
                              ? 'bg-green-600'
                              : service.slaCompliance >= 90
                              ? 'bg-blue-600'
                              : 'bg-orange-600'
                          }`}
                          style={{ width: `${service.slaCompliance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{service.slaCompliance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approver Performance */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Approver Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response (days)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approverPerformance.map((approver) => (
                <tr key={approver.approver} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{approver.approver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approver.assigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{approver.approved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{approver.rejected}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{approver.pending}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approver.avgResponseTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      approver.onTime >= 95 ? 'text-green-600' :
                      approver.onTime >= 90 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {approver.onTime}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volume Trends */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Volume Trends (6 Months)</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {volumeTrends.map((trend) => (
              <div key={trend.month} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">{trend.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{ width: `${(trend.completed / trend.submitted) * 100}%` }}
                      />
                      <div
                        className="absolute top-0 h-full bg-red-500"
                        style={{ 
                          left: `${(trend.completed / trend.submitted) * 100}%`,
                          width: `${(trend.rejected / trend.submitted) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-900">
                        <span className="font-semibold">{trend.submitted}</span> submitted
                      </span>
                      <span className="text-green-600">
                        <span className="font-semibold">{trend.completed}</span> completed
                      </span>
                      <span className="text-red-600">
                        <span className="font-semibold">{trend.rejected}</span> rejected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
