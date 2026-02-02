import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

export default function Experience() {
  const { t } = useTranslation()
  const experience = t('experience.items', { returnObjects: true })

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
          </div>
        ))}
      </div>
    </Section>
  )
}