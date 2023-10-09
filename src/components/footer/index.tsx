import css from './index.module.scss'

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <span>MindFit&nbsp;&copy;</span>
      <a href="https://github.com/Ernian/mindFit" target='_blank'>GitHub</a>
    </footer>
  )
}