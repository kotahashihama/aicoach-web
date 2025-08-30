import { ExplanationProps } from '../../../shared/types'
import * as styles from './Explanation.css'

export const Explanation = ({ explanation, level }: ExplanationProps) => {
  return (
    <div className={styles.explanation}>
      <section className={styles.explanationSection}>
        <h2 className={styles.sectionTitle}>概要</h2>
        <p className={styles.summary}>{explanation.summary}</p>
      </section>

      {explanation.constructs.length > 0 && (
        <section className={styles.explanationSection}>
          <h2 className={styles.sectionTitle}>主要な構文・API</h2>
          <ul className={styles.constructsList}>
            {explanation.constructs.map((construct, index) => (
              <li key={index} className={styles.constructsListItem}>
                {construct}
              </li>
            ))}
          </ul>
        </section>
      )}

      {explanation.pitfalls.length > 0 && (
        <section className={styles.explanationSection}>
          <h2 className={styles.sectionTitle}>注意点・落とし穴</h2>
          <ul className={styles.pitfallsList}>
            {explanation.pitfalls.map((pitfall, index) => (
              <li key={index} className={styles.pitfallsListItem}>
                {pitfall}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(level === 'intermediate' || level === 'advanced') &&
        explanation.alternative && (
          <section className={styles.explanationSection}>
            <h2 className={styles.sectionTitle}>別解・改善案</h2>
            <pre className={styles.alternativeCode}>
              <code className={styles.codeBlock}>
                {explanation.alternative}
              </code>
            </pre>
          </section>
        )}
    </div>
  )
}
