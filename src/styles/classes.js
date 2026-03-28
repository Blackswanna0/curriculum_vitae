export const appStyles = {
  pageShell:
    'min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 sm:py-10 transition-colors',
  topBar: 'flex justify-between items-center mb-4 no-print',
  controlsGroup: 'flex gap-2',
  cvGrid: 'grid grid-cols-1 lg:grid-cols-3 gap-10',
  mainColumn: 'lg:col-span-2',
}

export const layoutStyles = {
  container: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'mb-10',
  sectionTitle:
    'text-xl sm:text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-1',
}

export const buttonStyles = {
  secondaryPill:
    'flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition',
  primaryAction:
    'flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition no-print',
  textLink:
    'mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none',
}

export const textStyles = {
  body: 'text-gray-700 dark:text-gray-300 leading-relaxed',
  meta: 'text-sm text-gray-500 dark:text-gray-400',
  description: 'mt-2 text-gray-700 dark:text-gray-300',
  details: 'mt-2 text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line',
  headerRole: 'text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-1',
  headerContacts: 'text-sm text-gray-500 dark:text-gray-400 md:text-right',
}

export const surfaceStyles = {
  skillBadge:
    'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs sm:text-sm',
}

export const spacingStyles = {
  stackMd: 'space-y-4',
  stackLg: 'space-y-6',
  wrapRow: 'flex flex-wrap gap-2',
}