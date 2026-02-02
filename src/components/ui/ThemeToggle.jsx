import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleTheme } from '../../features/theme/themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.theme.mode)
  const { t } = useTranslation()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex items-center gap-2 text-sm px-3 py-1 rounded-full
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100
                 hover:bg-gray-300 dark:hover:bg-gray-600
                 transition"
    >
      {mode === 'dark' ? `🌙 ${t('buttons.dark')}` : `☀️ ${t('buttons.light')}`}
    </button>
  )
}