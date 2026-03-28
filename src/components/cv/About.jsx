import { useTranslation } from 'react-i18next'
import Section from '@layout/Section'
import { textStyles } from '@styles/classes'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section title={t('sections.about')}>
      <p className={textStyles.body}>
        {t('about.description')}
      </p>
    </Section>
  )
}