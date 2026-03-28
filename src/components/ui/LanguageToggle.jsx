import { useTranslation } from 'react-i18next'
import { buttonStyles } from '@styles/classes'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className={buttonStyles.secondaryPill}
    >
      {i18n.language === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}
    </button>
  )
}
