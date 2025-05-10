"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type: string
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed bottom-4 right-4 bg-gray-800 border border-lime-500 text-white p-4 rounded-lg shadow-lg flex items-center max-w-md"
    >
      <CheckCircle className="text-lime-500 mr-3 flex-shrink-0" />
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white">
        <X size={18} />
      </button>
    </motion.div>
  )
}

export default function ReportDownloadToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([])

  const addToast = (message: string, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    addToast,
    ToastContainer: () => (
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    ),
  }
}
