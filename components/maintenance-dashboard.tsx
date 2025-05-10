"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, FilePieChart, FileSpreadsheet } from "lucide-react"
import PowerBIDashboard from "./power-bi-dashboard"
import MaintenanceImage from "./maintenance-image"

export default function MaintenanceDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (reportType: string) => {
    setDownloading(reportType)

    // Simulate download delay
    setTimeout(() => {
      setDownloading(null)
      // Create a fake download
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain;charset=utf-8,")
      element.setAttribute(
        "download",
        `maintenance_report_${reportType}_${new Date().toISOString().split("T")[0]}.${reportType === "excel" ? "xlsx" : reportType === "pdf" ? "pdf" : "csv"}`,
      )
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Maintenance Management System
        </motion.h1>
        <motion.div
          className="w-20 h-1 bg-lime-400 mx-auto mt-4"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </header>

      <motion.div
        className="flex flex-wrap md:flex-nowrap gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-full md:w-1/3 lg:w-1/4 flex flex-col"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MaintenanceImage />
        </motion.div>

        <motion.div
          className="w-full md:w-2/3 lg:w-3/4 bg-gray-800 rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-4 bg-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Maintenance Analytics</h2>
            <div className="flex space-x-2">
              {[
                { type: "pdf", icon: <FileText size={16} />, label: "PDF" },
                { type: "excel", icon: <FileSpreadsheet size={16} />, label: "Excel" },
                { type: "csv", icon: <FilePieChart size={16} />, label: "CSV" },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  className={`px-3 py-2 rounded-md flex items-center space-x-1 ${
                    downloading === item.type ? "bg-lime-600 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(item.type)}
                  disabled={downloading !== null}
                >
                  {downloading === item.type ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Download size={16} />
                    </motion.div>
                  ) : (
                    item.icon
                  )}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="p-4 h-[600px]">
            <PowerBIDashboard />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
