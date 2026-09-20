import { cx } from '@libs/vendor'
import { AnimatePresence } from 'framer-motion'
import { WorkCard } from '@views/work/components/WorkCard'

export function WorkGridDuo({ items, className }) {
  return (
    <div className={cx('grid-container', className)}>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <WorkCard key={item._id} {...item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function WorkGridTrio({ items, className }) {
  return (
    <div className={cx('grid-container', className)}>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <WorkCard key={item._id} {...item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}