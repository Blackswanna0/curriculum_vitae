import { useTranslation } from 'react-i18next'
import Section from '@layout/Section'
import { spacingStyles, textStyles } from '@styles/classes'

export default function Education() {
  const { t } = useTranslation()
  const education = t('education.items', { returnObjects: true })

  return (
    <Section title={t('sections.education')}>
      <div className={spacingStyles.stackMd}>
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="font-semibold">{edu.title}</h3>
            <p className={textStyles.meta}>
              {edu.institute} · {edu.period}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}