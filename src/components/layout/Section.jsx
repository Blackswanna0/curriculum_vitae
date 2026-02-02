export default function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4
                     border-b border-gray-200 dark:border-gray-700 pb-1">
        {title}
      </h2>
      {children}
    </section>
  )
}