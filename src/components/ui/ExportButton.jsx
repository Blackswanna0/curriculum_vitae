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
      // Temporarily disable all stylesheets to prevent oklch parsing
      const stylesheets = Array.from(document.styleSheets)
      const disabledSheets = []
      
      stylesheets.forEach(sheet => {
        try {
          // Try to access cssRules to check if we can disable it
          if (sheet.cssRules) {
            sheet.disabled = true
            disabledSheets.push(sheet)
          }
        } catch (e) {
          // Skip stylesheets we can't access (CORS)
        }
      })

      // Get the CV container
      const element = document.querySelector('.cv-container')
      
      if (!element) {
        console.error('CV container not found')
        // Re-enable stylesheets
        disabledSheets.forEach(sheet => sheet.disabled = false)
        return
      }

      // Clone the element to avoid modifying the visible page
      const clone = element.cloneNode(true)
      
      // Re-enable stylesheets immediately
      disabledSheets.forEach(sheet => sheet.disabled = false)
      
      // Style the clone for off-screen rendering with light mode
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = element.offsetWidth + 'px'
      
      // Append clone to body temporarily
      document.body.appendChild(clone)
      
      // Force light mode colors on the clone with simple hex colors
      clone.style.backgroundColor = '#f9fafb'
      clone.style.color = '#111827'
      clone.style.padding = '2rem'
      clone.style.fontFamily = 'system-ui, -apple-system, sans-serif'
      
      // Apply basic styling to all elements with hex colors only
      const allElements = clone.querySelectorAll('*')
      allElements.forEach(el => {
        // Basic text styling
        el.style.color = '#111827'
        
        // Headers
        if (el.tagName === 'H1') {
          el.style.fontSize = '2rem'
          el.style.fontWeight = '700'
          el.style.marginBottom = '0.5rem'
        }
        if (el.tagName === 'H2') {
          el.style.fontSize = '1.5rem'
          el.style.fontWeight = '600'
          el.style.marginBottom = '1rem'
        }
        if (el.tagName === 'H3') {
          el.style.fontSize = '1.125rem'
          el.style.fontWeight = '600'
          el.style.marginBottom = '0.5rem'
        }
        
        // Paragraphs
        if (el.tagName === 'P') {
          el.style.marginBottom = '0.5rem'
          el.style.lineHeight = '1.5'
        }
        
        // Sections with spacing
        if (el.className.includes('Section') || el.tagName === 'SECTION') {
          el.style.marginBottom = '2rem'
        }
        
        // Badge-like elements
        if (el.className.includes('Badge') || el.style.display === 'inline-block') {
          el.style.backgroundColor = '#e5e7eb'
          el.style.padding = '0.25rem 0.75rem'
          el.style.borderRadius = '0.375rem'
          el.style.fontSize = '0.875rem'
        }
        
        // Buttons and interactive elements - hide them
        if (el.tagName === 'BUTTON' || el.className.includes('no-print')) {
          el.style.display = 'none'
        }
      })
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200))

      // Generate canvas from the clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        foreignObjectRendering: false,
        allowTaint: true
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
