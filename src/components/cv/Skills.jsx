import { useTranslation } from 'react-i18next'
import Section from '@layout/Section'
import { spacingStyles, surfaceStyles } from '@styles/classes'

export default function Skills() {
  const { t } = useTranslation()
  const skills = t('skills.list', { returnObjects: true })

  return (
    <Section title={t('sections.skills')}>
      <div className={spacingStyles.wrapRow}>
        {skills.map(skill => (
          <span
            key={skill}
            className={surfaceStyles.skillBadge}
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  )
}