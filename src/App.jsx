import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Container from '@layout/Container'
import Header from '@cv/Header'
import About from '@cv/About'
import Skills from '@cv/Skills'
import Experience from '@cv/Experience'
import Education from '@cv/Education'
import ThemeToggle from '@ui/ThemeToggle'
import LanguageToggle from '@ui/LanguageToggle'
import ExportButton from '@ui/ExportButton'
import { appStyles } from '@styles/classes'

function App() {
  const theme = useSelector(state => state.theme.mode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className={appStyles.pageShell}>
      <Container>
        <div className={appStyles.topBar}>
          <ExportButton />
          <div className={appStyles.controlsGroup}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="cv-container">
          <Header />

          <div className={appStyles.cvGrid}>
            <div className={appStyles.mainColumn}>
              <About />
              <Experience />
            </div>
            <div>
              <Skills />
              <Education />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default App