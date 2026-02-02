import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiDocumentArrowDown } from 'react-icons/hi2'

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const { t } = useTranslation()

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      // Get the CV container
      const element = document.querySelector('.cv-container')
      
      if (!element) {
        console.error('CV container not found')
        return
      }

      // Clone the element to avoid modifying the visible page
      const clone = element.cloneNode(true)
      
      // Style the clone for off-screen rendering with light mode
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = element.offsetWidth + 'px'
      
      // Append clone to body temporarily
      document.body.appendChild(clone)
      
      // Force light mode colors on the clone
      clone.style.backgroundColor = '#f9fafb'
      clone.style.color = '#111827'
      
      // Override dark mode classes in the clone
      const darkElements = clone.querySelectorAll('[class*="dark:"]')
      darkElements.forEach(el => {
        // Force light mode background colors
        if (el.className.includes('dark:bg-gray-900')) {
          el.style.backgroundColor = '#f9fafb'
        }
        if (el.className.includes('dark:bg-gray-800')) {
          el.style.backgroundColor = '#ffffff'
        }
        if (el.className.includes('dark:bg-gray-700')) {
          el.style.backgroundColor = '#e5e7eb'
        }
        if (el.className.includes('dark:bg-gray-600')) {
          el.style.backgroundColor = '#d1d5db'
        }
        
        // Force light mode text colors
        if (el.className.includes('dark:text-gray-100')) {
          el.style.color = '#111827'
        }
        if (el.className.includes('dark:text-gray-200')) {
          el.style.color = '#1f2937'
        }
        if (el.className.includes('dark:text-gray-300')) {
          el.style.color = '#374151'
        }
        if (el.className.includes('dark:text-gray-400')) {
          el.style.color = '#6b7280'
        }
      })
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100))

      // Generate canvas from the clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      // Remove the clone immediately after capture
      document.body.removeChild(clone)

      // Calculate PDF dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png')

      // Add image to PDF (handle multiple pages if needed)
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Download PDF
      pdf.save('CV_Anna_Rossi.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg
                 bg-blue-500 hover:bg-blue-600 text-white
                 disabled:bg-gray-400 disabled:cursor-not-allowed
                 transition no-print"
    >
      {isExporting ? (
        <>
          <span className="animate-spin">⏳</span>
          {t('buttons.exporting')}
        </>
      ) : (
        <>
          <HiDocumentArrowDown className="text-xl" />
          {t('buttons.exportPDF')}
        </>
      )}
    </button>
  )
}
