import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section title={t('sections.about')}>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {t('about.description')}
      </p>
    </Section>
  )
}