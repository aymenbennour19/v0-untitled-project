"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Wrench, Cog } from "lucide-react"

export default function MaintenanceImage() {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden h-full flex flex-col"
      whileHover={{
        boxShadow: "0 10px 25px -5px rgba(132, 204, 22, 0.3)",
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="relative bg-gradient-to-r from-lime-500 to-lime-400 p-6 flex-1 flex flex-col justify-center items-center">
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
            className="relative w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/images/maintenance-manager.png"
              alt="Maintenance Manager"
              width={400}
              height={400}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-2xl font-bold text-white">Maintenance Manager</h3>
        <p className="text-gray-400 text-sm mt-1">System Monitoring Dashboard</p>

        <motion.button
          className="mt-4 w-full py-2 px-4 bg-lime-500 text-gray-900 font-medium rounded-md flex items-center justify-center"
          whileHover={{ backgroundColor: "#a3e635" }}
          whileTap={{ scale: 0.95 }}
        >
          <Wrench className="mr-2" size={18} />
          View Maintenance Status
        </motion.button>
      </div>
    </motion.div>
  )
}
