import { ArrowDownIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

function AnimatedArrowDownIcon({ callback }: { callback: () => void }) {
  return (
    <motion.div
      style={{
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: 32,
        height: 32,
        padding: 5,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10
      }}
      transition={{
        duration: 0.25,
        easings: 'ease-in-out'
      }}
      initial={{
        top: -25
      }}
      animate={{
        top: 10
      }}
      exit={{
        top: -25
      }}
      whileHover={{
        top: 20
      }}
      onClick={callback}
    >
      <ArrowDownIcon />
    </motion.div>
  )
}

export { AnimatedArrowDownIcon }
