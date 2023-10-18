import css from './index.module.scss'

export const Loader = () => (
  <div className={css.loader}>
    <div className={css['side-dot']} />
    <div className={css['center-dot']} />
    <div className={css['side-dot']} />
  </div>
)