import { useTranslation } from 'react-i18next'

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
      className="flex items-center gap-2 text-sm px-3 py-1 rounded-full
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100
                 hover:bg-gray-300 dark:hover:bg-gray-600
                 transition"
    >
      {i18n.language === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}
    </button>
  )
}
