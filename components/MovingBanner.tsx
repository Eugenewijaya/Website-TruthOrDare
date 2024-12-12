import { motion } from 'framer-motion'

export function MovingBanner() {
  return (
    <div className="overflow-hidden bg-black py-2">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="whitespace-nowrap"
      >
        <span className="text-white text-lg">
      Abis Nyepin Gaboleh kabur njir, di kata bikin programnya tinggal kedipi doang kali.
        </span>
      </motion.div>
    </div>
  )
}

