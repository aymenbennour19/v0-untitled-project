"use client"

import { motion } from "framer-motion"
import { BarChart3, PieChart, TrendingUp, AlertTriangle } from "lucide-react"

export default function DashboardFallback() {
  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Maintenance Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-700">Equipment Status</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="text-xl font-bold text-green-600">3</div>
              <div className="text-xs text-green-700">Operational</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded text-center">
              <div className="text-xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-yellow-700">Needs Attention</div>
            </div>
            <div className="bg-red-50 p-2 rounded text-center">
              <div className="text-xl font-bold text-red-600">1</div>
              <div className="text-xs text-red-700">Critical</div>
            </div>
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="text-xl font-bold text-blue-600">80.8%</div>
              <div className="text-xs text-blue-700">Efficiency</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-purple-100 rounded-full mr-3">
              <PieChart className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-700">Cost Analysis</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="text-lg font-bold text-purple-600">$12,450</div>
              <div className="text-xs text-purple-700">Maintenance Costs</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="text-lg font-bold text-purple-600">$8,700</div>
              <div className="text-xs text-purple-700">Projected Savings</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="text-lg font-bold text-purple-600">170%</div>
              <div className="text-xs text-purple-700">ROI</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-700">Maintenance Trends</h4>
          </div>
          <div className="h-40 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center text-gray-500">
              <p>Trend visualization would appear here</p>
              <p className="text-sm text-gray-400">Data from Power BI dashboard</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 bg-red-100 rounded-full mr-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-700">Maintenance Alerts</h4>
          </div>
          <div className="space-y-2 mt-2">
            <div className="p-2 bg-yellow-50 rounded text-sm text-yellow-800 border-l-2 border-yellow-400">
              Hydraulic Press B requires maintenance within 7 days
            </div>
            <div className="p-2 bg-red-50 rounded text-sm text-red-800 border-l-2 border-red-400">
              Cooling System D requires immediate attention
            </div>
            <div className="p-2 bg-blue-50 rounded text-sm text-blue-800 border-l-2 border-blue-400">
              Scheduled maintenance for Assembly Robot C on June 10
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
