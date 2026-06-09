import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import { useState } from 'react'

const slaMetrics = [
  { category: 'Purchase Requests', total: 145, onTrack: 98, atRisk: 32, breached: 15, avgTime: '4.2d', slaTarget: '5d', compliance: 89.7 },
  { category: 'Finance Requests', total: 89, onTrack: 67, atRisk: 15, breached: 7, avgTime: '3.8d', slaTarget: '4d', compliance: 92.1 },
  { category: 'HR Requests', total: 112, onTrack: 78, atRisk: 24, breached: 10, avgTime: '5.1d', slaTarget: '6d', compliance: 91.1 },
  { category: 'Vendor Setup', total: 34, onTrack: 22, atRisk: 8, breached: 4, avgTime: '7.5d', slaTarget: '10d', compliance: 88.2 },
  { category: 'Invoice Processing', total: 267, onTrack: 198, atRisk: 45, breached: 24, avgTime: '2.9d', slaTarget: '3d', compliance: 91.0 },
  { category: 'Asset Management', total: 56, onTrack: 41, atRisk: 11, breached: 4, avgTime: '4.6d', slaTarget: '5d', compliance: 92.9 },
  { category: 'Project Economics', total: 43, onTrack: 31, atRisk: 9, breached: 3, avgTime: '6.2d', slaTarget: '7d', compliance: 93.0 }
]

export default function SLADashboard() {
  const { showToast } = useToast()
  const [filter, setFilter] = useState<'all' | 'breached' | 'atRisk'>('all')

  const totalItems = slaMetrics.reduce((sum, m) => sum + m.total, 0)
  const totalBreached = slaMetrics.reduce((sum, m) => sum + m.breached, 0)
  const totalAtRisk = slaMetrics.reduce((sum, m) => sum + m.atRisk, 0)
  const avgCompliance = (slaMetrics.reduce((sum, m) => sum + m.compliance, 0) / slaMetrics.length).toFixed(1)

  const filtered = slaMetrics.filter(m => {
    if (filter === 'breached') return m.breached > 0
    if (filter === 'atRisk') return m.atRisk > 0
    return true
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">SLA Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">SLA performance metrics across all service categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Active Items</div>
          <div className="text-2xl font-semibold text-gray-900 mt-1">{totalItems}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">SLA Breached</div>
          <div className="text-2xl font-semibold text-red-600 mt-1">{totalBreached}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">At Risk</div>
          <div className="text-2xl font-semibold text-orange-600 mt-1">{totalAtRisk}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Avg Compliance</div>
          <div className="text-2xl font-semibold text-green-600 mt-1">{avgCompliance}%</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
        >
          All Categories
        </button>
        <button
          onClick={() => setFilter('breached')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'breached' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
        >
          Breached Only
        </button>
        <button
          onClick={() => setFilter('atRisk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'atRisk' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
        >
          At Risk
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Track</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">At Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breached</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((metric) => (
                <tr key={metric.category} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">{metric.onTrack}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-600">{metric.atRisk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">{metric.breached}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.avgTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{metric.slaTarget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div 
                          className={`h-2 rounded-full ${metric.compliance >= 90 ? 'bg-green-600' : metric.compliance >= 80 ? 'bg-orange-600' : 'bg-red-600'}`}
                          style={{ width: `${metric.compliance}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{metric.compliance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {metric.compliance >= 90 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Viewing ${metric.category} details...`)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Details
                    </button>
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
