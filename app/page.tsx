"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Download, FileText, FileSpreadsheet, FilePieChart, Wrench, Cog, Loader2, CheckCircle, X } from "lucide-react"

export default function MaintenanceDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [downloading, setDownloading] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([])
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading time for the iframe
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const addToast = (message: string, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setIsLoading(false)
  }

  const handleDownload = (reportType: string) => {
    setDownloading(reportType)

    // Simulate OCR data extraction from dashboard
    const extractedData = {
      equipmentStats: [
        {
          name: "Conveyor Belt A",
          status: "Operational",
          lastMaintenance: "2023-04-15",
          nextScheduled: "2023-07-15",
          efficiency: "98%",
        },
        {
          name: "Hydraulic Press B",
          status: "Needs Attention",
          lastMaintenance: "2023-03-22",
          nextScheduled: "2023-06-22",
          efficiency: "76%",
        },
        {
          name: "Assembly Robot C",
          status: "Operational",
          lastMaintenance: "2023-05-10",
          nextScheduled: "2023-08-10",
          efficiency: "94%",
        },
        {
          name: "Cooling System D",
          status: "Critical",
          lastMaintenance: "2023-01-30",
          nextScheduled: "2023-04-30",
          efficiency: "45%",
        },
        {
          name: "Electric Motor E",
          status: "Operational",
          lastMaintenance: "2023-05-22",
          nextScheduled: "2023-08-22",
          efficiency: "91%",
        },
      ],
      maintenanceSummary: {
        totalEquipment: 5,
        operational: 3,
        needsAttention: 1,
        critical: 1,
        averageEfficiency: "80.8%",
      },
      costAnalysis: {
        maintenanceCosts: "$12,450",
        projectedSavings: "$8,700",
        roi: "170%",
      },
      alerts: [
        "Hydraulic Press B requires maintenance within 7 days",
        "Cooling System D requires immediate attention",
        "Scheduled maintenance for Assembly Robot C on June 10",
      ],
    }

    // Simulate download delay with OCR processing time
    setTimeout(() => {
      setDownloading(null)

      if (reportType === "pdf") {
        // Create a more detailed PDF-like document with "extracted" data
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
          <html>
            <head>
              <title>Maintenance Report (Dashboard Data Extract)</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #069951; }
                h2 { color: #069951; margin-top: 30px; }
                .header { border-bottom: 2px solid #069951; padding-bottom: 10px; margin-bottom: 20px; }
                .date { color: #666; margin-bottom: 30px; }
                .data-source { background-color: #f0f9f4; border-left: 4px solid #069951; padding: 10px; margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .status-operational { color: #069951; font-weight: bold; }
                .status-attention { color: #f59e0b; font-weight: bold; }
                .status-critical { color: #ef4444; font-weight: bold; }
                .summary-box { background-color: #f0f9f4; border: 1px solid #069951; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                .summary-item { background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .summary-value { font-size: 24px; font-weight: bold; color: #069951; }
                .summary-label { font-size: 14px; color: #666; }
                .alert-list { background-color: #fff0f0; border: 1px solid #ffcdd2; padding: 10px; border-radius: 5px; }
                .alert-item { padding: 5px 0; border-bottom: 1px solid #eee; }
                .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Maintenance Management System Report</h1>
              </div>
              <div class="date">Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
              
              <div class="data-source">
                <strong>Data Source:</strong> This report contains data extracted from the Maintenance Management Dashboard using automated data recognition.
              </div>
              
              <h2>Equipment Status Summary</h2>
              <div class="summary-box">
                <div class="summary-grid">
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.maintenanceSummary.totalEquipment}</div>
                    <div class="summary-label">Total Equipment</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.maintenanceSummary.operational}</div>
                    <div class="summary-label">Operational</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.maintenanceSummary.averageEfficiency}</div>
                    <div class="summary-label">Average Efficiency</div>
                  </div>
                </div>
              </div>
              
              <h2>Equipment Details</h2>
              <table>
                <tr>
                  <th>Equipment</th>
                  <th>Status</th>
                  <th>Last Maintenance</th>
                  <th>Next Scheduled</th>
                  <th>Efficiency</th>
                </tr>
                ${extractedData.equipmentStats
                  .map(
                    (equipment) => `
                  <tr>
                    <td>${equipment.name}</td>
                    <td class="${
                      equipment.status === "Operational"
                        ? "status-operational"
                        : equipment.status === "Needs Attention"
                          ? "status-attention"
                          : "status-critical"
                    }">${equipment.status}</td>
                    <td>${equipment.lastMaintenance}</td>
                    <td>${equipment.nextScheduled}</td>
                    <td>${equipment.efficiency}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </table>
              
              <h2>Cost Analysis</h2>
              <div class="summary-box">
                <div class="summary-grid">
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.costAnalysis.maintenanceCosts}</div>
                    <div class="summary-label">Maintenance Costs</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.costAnalysis.projectedSavings}</div>
                    <div class="summary-label">Projected Savings</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-value">${extractedData.costAnalysis.roi}</div>
                    <div class="summary-label">ROI</div>
                  </div>
                </div>
              </div>
              
              <h2>Maintenance Alerts</h2>
              <div class="alert-list">
                ${extractedData.alerts
                  .map(
                    (alert) => `
                  <div class="alert-item">${alert}</div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="footer">
                <p>This report is automatically generated from the Maintenance Management System by extracting data from the dashboard.</p>
                <p>© ${new Date().getFullYear()} Maintenance Management System. All rights reserved.</p>
              </div>
            </body>
          </html>
        `)
          printWindow.document.close()
          printWindow.print()
        }
      } else {
        // Create a fake download for Excel and CSV with more realistic filenames
        const element = document.createElement("a")
        const fileExtension = reportType === "excel" ? "xlsx" : "csv"
        const fileName = `maintenance_dashboard_extract_${new Date().toISOString().split("T")[0]}.${fileExtension}`

        // For more realistic simulation, create actual CSV content for CSV downloads
        if (reportType === "csv") {
          const csvContent = `Equipment,Status,Last Maintenance,Next Scheduled,Efficiency
${extractedData.equipmentStats.map((e) => `${e.name},${e.status},${e.lastMaintenance},${e.nextScheduled},${e.efficiency}`).join("\n")}

Maintenance Summary
Total Equipment,${extractedData.maintenanceSummary.totalEquipment}
Operational,${extractedData.maintenanceSummary.operational}
Needs Attention,${extractedData.maintenanceSummary.needsAttention}
Critical,${extractedData.maintenanceSummary.critical}
Average Efficiency,${extractedData.maintenanceSummary.averageEfficiency}`

          element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent))
        } else {
          element.setAttribute("href", "data:text/plain;charset=utf-8,")
        }

        element.setAttribute("download", fileName)
        element.style.display = "none"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      }

      // Show success toast
      addToast(`${reportType.toUpperCase()} report with dashboard data extracted successfully!`)
    }, 3000) // Longer delay to simulate OCR processing
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Maintenance Management System
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-lime-500 mx-auto mt-4"
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
          {/* Maintenance Image Section */}
          <motion.div
            className="w-full md:w-1/3 lg:w-1/3 flex flex-col"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden h-full flex flex-col"
              whileHover={{
                boxShadow: "0 0 15px 5px rgba(6, 153, 81, 0.5), 0 0 30px 10px rgba(6, 153, 81, 0.3)",
                scale: 1.02,
              }}
              animate={{
                boxShadow: [
                  "0 0 5px 1px rgba(6, 153, 81, 0.3)",
                  "0 0 10px 3px rgba(6, 153, 81, 0.4)",
                  "0 0 5px 1px rgba(6, 153, 81, 0.3)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
                scale: { type: "spring", stiffness: 300, damping: 15 },
              }}
            >
              <div className="relative bg-gradient-to-r from-[#069951] to-lime-400 p-6 flex-1 flex flex-col justify-center items-center">
                <motion.div
                  className="absolute top-5 right-5 w-20 h-20 text-lime-300 opacity-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Cog size={80} />
                </motion.div>

                <motion.div
                  className="absolute bottom-5 left-5 w-16 h-16 text-lime-300 opacity-20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Cog size={64} />
                </motion.div>

                <div className="relative z-10 flex justify-center items-center flex-1">
                  <motion.div
                    className="relative w-full max-w-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src="/images/maintenance-manager.png"
                      alt="Maintenance Manager"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="p-4 text-center border-t-2 border-[#069951]">
                <h3 className="text-2xl font-bold text-gray-800">Maintenance Manager</h3>
                <p className="text-gray-600 text-sm mt-1">System Monitoring Dashboard</p>

                <motion.button
                  className="mt-4 w-full py-2 px-4 bg-[#BEED20] text-gray-900 font-medium rounded-md flex items-center justify-center"
                  whileHover={{ backgroundColor: "#a5d118" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Wrench className="mr-2" size={18} />
                  View Maintenance Status
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Section */}
          <motion.div
            className="w-full md:w-2/3 lg:w-2/3 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{
              boxShadow: "0 0 15px 5px rgba(6, 153, 81, 0.5), 0 0 30px 10px rgba(6, 153, 81, 0.3)",
            }}
            animate={{
              boxShadow: [
                "0 0 5px 1px rgba(6, 153, 81, 0.3)",
                "0 0 10px 3px rgba(6, 153, 81, 0.4)",
                "0 0 5px 1px rgba(6, 153, 81, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
              scale: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <div className="p-4 bg-gradient-to-r from-[#069951] to-lime-400 flex justify-between items-center">
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
                      downloading === item.type
                        ? "bg-[#BEED20] text-gray-900"
                        : "bg-white/80 text-gray-700 hover:bg-white"
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

            {/* Power BI Dashboard */}
            <div className="p-4 h-[600px] bg-white">
              <div className="relative w-full h-full">
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoading ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="h-12 w-12 text-[#069951]" />
                    </motion.div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                    <motion.div
                      className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden"
                      initial={{ width: "48px" }}
                      animate={{ width: "192px" }}
                    >
                      <motion.div
                        className="h-full bg-[#BEED20]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Direct embed of Power BI dashboard */}
                <div className="w-full h-full">
                  <iframe
                    title="maintenance"
                    width="100%"
                    height="100%"
                    src="https://app.powerbi.com/reportEmbed?reportId=d7168a17-c69e-4aa5-890a-44ea0915a262&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
                    frameBorder="0"
                    allowFullScreen={true}
                    className="rounded-md border border-gray-200"
                    onLoad={handleIframeLoad}
                    style={{ display: isLoading ? "none" : "block" }}
                  />
                </div>

                {/* Fallback content in case iframe doesn't load */}
                {!isLoading && !iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
                    <div className="text-center p-8 max-w-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Dashboard Preview</h3>
                      <p className="text-gray-600 mb-6">
                        The Power BI dashboard may not be displaying due to authentication requirements or connection
                        issues.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg text-left mb-6">
                        <h4 className="font-bold text-gray-700 mb-2">Equipment Status</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-green-100 p-2 rounded">
                            <span className="text-green-700 font-bold">3</span> Operational
                          </div>
                          <div className="bg-yellow-100 p-2 rounded">
                            <span className="text-yellow-700 font-bold">1</span> Needs Attention
                          </div>
                          <div className="bg-red-100 p-2 rounded">
                            <span className="text-red-700 font-bold">1</span> Critical
                          </div>
                          <div className="bg-blue-100 p-2 rounded">
                            <span className="text-blue-700 font-bold">80.8%</span> Efficiency
                          </div>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 bg-[#BEED20] text-gray-900 rounded-md font-medium"
                        onClick={() =>
                          window.open(
                            "https://app.powerbi.com/reportEmbed?reportId=d7168a17-c69e-4aa5-890a-44ea0915a262&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730",
                            "_blank",
                          )
                        }
                      >
                        Open Dashboard in New Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="mb-2 bg-white border border-[#BEED20] text-gray-800 p-4 rounded-lg shadow-lg flex items-center max-w-md"
            >
              <CheckCircle className="text-[#069951] mr-3 flex-shrink-0" />
              <p className="flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-400 hover:text-gray-800">
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}
