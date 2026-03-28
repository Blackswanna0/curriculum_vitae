import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleTheme } from '@features/theme/themeSlice'
import { buttonStyles } from '@styles/classes'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.theme.mode)
  const { t } = useTranslation()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={buttonStyles.secondaryPill}
    >
      {mode === 'dark' ? `🌙 ${t('buttons.dark')}` : `☀️ ${t('buttons.light')}`}
    </button>
  )
}