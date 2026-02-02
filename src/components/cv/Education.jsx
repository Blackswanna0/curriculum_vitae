import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

export default function Education() {
  const { t } = useTranslation()
  const education = t('education.items', { returnObjects: true })

  return (
    <Section title={t('sections.education')}>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="font-semibold">{edu.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {edu.institute} · {edu.period}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}