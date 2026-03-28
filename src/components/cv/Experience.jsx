import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from '@layout/Section'
import { buttonStyles, spacingStyles, textStyles } from '@styles/classes'

export default function Experience() {
  const { t } = useTranslation()
  const experience = t('experience.items', { returnObjects: true })
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <Section title={t('sections.experience')}>
      <div className={spacingStyles.stackLg}>
        {experience.map((job, index) => (
          <div key={`${job.role}-${index}`}>
            <h3 className="font-semibold">
              {job.role} – {job.company}
            </h3>
            <p className={textStyles.meta}>
              {job.period}
            </p>
            <p className={textStyles.description}>
              {job.description}
            </p>
            {job.details && (
              <>
                {expandedIndex === index && (
                  <p className={textStyles.details}>
                    {job.details}
                  </p>
                )}
                <button
                  onClick={() => toggleExpand(index)}
                  className={buttonStyles.textLink}
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