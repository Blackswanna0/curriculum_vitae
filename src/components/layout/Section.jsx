import PropTypes from 'prop-types'
import { layoutStyles } from '@styles/classes'

export default function Section({ title, children }) {
  return (
    <section className={layoutStyles.section}>
      <h2 className={layoutStyles.sectionTitle}>
        {title}
      </h2>
      {children}
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
}