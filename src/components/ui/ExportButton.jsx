import jsPDF from 'jspdf'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiDocumentArrowDown } from 'react-icons/hi2'
import { buttonStyles } from '@styles/classes'

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const { t } = useTranslation()

  const handleExportPDF = () => {
    setIsExporting(true)

    try {
      const header = t('header', { returnObjects: true })
      const sections = t('sections', { returnObjects: true })
      const about = t('about.description')
      const skills = t('skills.list', { returnObjects: true })
      const experience = t('experience.items', { returnObjects: true })
      const education = t('education.items', { returnObjects: true })

      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const marginX = 14
      const marginTop = 14
      const marginBottom = 14
      const contentWidth = pageWidth - marginX * 2
      const maxY = pageHeight - marginBottom
      const lineHeight = 5.6
      let cursorY = marginTop

      const ensureSpace = (neededHeight = lineHeight) => {
        if (cursorY + neededHeight > maxY) {
          pdf.addPage()
          cursorY = marginTop
        }
      }

      const addTextBlock = (
        text,
        fontSize = 11,
        isBold = false,
        color = '#111827',
        indent = 0,
        blockLineHeight = lineHeight
      ) => {
        const safeText = String(text || '').trim()
        if (!safeText) {
          return
        }

        pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
        pdf.setFontSize(fontSize)
        pdf.setTextColor(color)

        const width = Math.max(contentWidth - indent, 20)
        const lines = pdf.splitTextToSize(safeText, width)
        ensureSpace(lines.length * blockLineHeight)
        pdf.text(lines, marginX + indent, cursorY)
        cursorY += lines.length * blockLineHeight
      }

      const addSpacer = (height = 2.5) => {
        cursorY += height
      }

      const addSectionTitle = (title) => {
        ensureSpace(12)
        if (cursorY > marginTop + 20) {
          addSpacer(3)
        }
        addTextBlock(title, 12.5, true, '#0f172a')
        addSpacer(2)
      }

      addTextBlock(header?.name, 20, true, '#0f172a')
      addTextBlock(header?.role, 12, false, '#334155')
      addSpacer(2.4)

      const contacts = [
        header?.location,
        header?.email,
        header?.phone,
        header?.residence,
      ]
        .filter(Boolean)
        .join(' | ')
      addTextBlock(contacts, 10, false, '#475569', 0, 5.2)

      addSpacer(3.5)
      pdf.setDrawColor(148, 163, 184)
      pdf.line(marginX, cursorY, pageWidth - marginX, cursorY)
      addSpacer(4)

      addSectionTitle(sections?.about)
      addTextBlock(about)

      addSectionTitle(sections?.skills)
      const skillsText = Array.isArray(skills)
        ? skills.map(String).join(' • ')
        : ''
      addTextBlock(skillsText)

      addSectionTitle(sections?.experience)
      if (Array.isArray(experience)) {
        experience.forEach((job) => {
          addTextBlock(`${job.role || ''} - ${job.company || ''}`, 11, true, '#0f172a')
          addTextBlock(job.period, 10, false, '#64748b', 0, 5)
          addTextBlock(job.description, 11, false, '#111827', 0, 5.4)

          if (job.details) {
            const detailLines = String(job.details).split('\n').filter(Boolean)
            detailLines.forEach((line) => {
              addTextBlock(`• ${line}`, 10.2, false, '#1f2937', 2.2, 5)
            })
          }

          addSpacer(2.2)
        })
      }

      addSectionTitle(sections?.education)
      if (Array.isArray(education)) {
        education.forEach((item) => {
          addTextBlock(item.title, 11, true, '#0f172a')
          addTextBlock(item.institute, 11, false, '#111827', 0, 5.4)
          addTextBlock(item.period, 10, false, '#64748b', 0, 5)
          addSpacer(2.2)
        })
      }

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
      className={buttonStyles.primaryAction}
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
