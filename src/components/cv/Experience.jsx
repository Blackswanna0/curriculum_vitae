import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

export default function Experience() {
  const { t } = useTranslation()
  const experience = t('experience.items', { returnObjects: true })
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <Section title={t('sections.experience')}>
      <div className="space-y-6">
        {experience.map((job, index) => (
          <div key={index}>
            <h3 className="font-semibold">
              {job.role} – {job.company}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {job.period}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {job.description}
            </p>
            {job.details && (
              <>
                {expandedIndex === index && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                    {job.details}
                  </p>
                )}
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                >
                  {expandedIndex === index
                    ? t('experience.readLess')
                    : t('experience.readMore')}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}