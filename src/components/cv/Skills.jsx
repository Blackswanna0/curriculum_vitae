import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

export default function Skills() {
  const { t } = useTranslation()
  const skills = t('skills.list', { returnObjects: true })

  return (
    <Section title={t('sections.skills')}>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs sm:text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  )
}