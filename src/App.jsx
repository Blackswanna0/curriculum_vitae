import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Container from './components/layout/Container'
import Header from './components/cv/Header'
import About from './components/cv/About'
import Skills from './components/cv/Skills'
import Experience from './components/cv/Experience'
import Education from './components/cv/Education'
import ThemeToggle from './components/ui/ThemeToggle'
import LanguageToggle from './components/ui/LanguageToggle'
import ExportButton from './components/ui/ExportButton'

function App() {
  const theme = useSelector(state => state.theme.mode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 sm:py-10 transition-colors">
      <Container>
        <div className="flex justify-between items-center mb-4 no-print">
          <ExportButton />
          <div className="flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="cv-container">
          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
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