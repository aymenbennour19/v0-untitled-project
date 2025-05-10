"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function PowerBIDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for the iframe
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-lime-400" />
          </motion.div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
          <motion.div
            className="w-48 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden"
            initial={{ width: "48px" }}
            animate={{ width: "192px" }}
          >
            <motion.div
              className="h-full bg-lime-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <iframe
          title="maintenance"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/reportEmbed?reportId=d7168a17-c69e-4aa5-890a-44ea0915a262&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
          frameBorder="0"
          allowFullScreen={true}
          className="rounded-md"
        />
      </motion.div>
    </div>
  )
}
