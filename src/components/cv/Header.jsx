import { useTranslation } from 'react-i18next'
import profilePic from '/profile_pic.jpeg'
import { textStyles } from '@styles/classes'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-6">
          <img 
            src={profilePic}
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover object-top border-4 border-gray-200 dark:border-gray-700"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {t('header.name')}
            </h1>
            <p className={textStyles.headerRole}>
              {t('header.role')}
            </p>
          </div>
        </div>

        <div className={textStyles.headerContacts}>
          <p>{t('header.location')}</p>
          <p>{t('header.email')}</p>
          <p>{t('header.phone')}</p>
          <p>{t('header.residence')}</p>
        </div>
      </div>
    </header>
  )
}