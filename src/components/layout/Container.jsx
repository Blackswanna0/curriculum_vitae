import { layoutStyles } from '@styles/classes'

export default function Container({ children }) {
  return (
    <div className={layoutStyles.container}>
      {children}
    </div>
  )
}