import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Menu() {
  return (
    <motion.nav
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '0.5rem',
        position: 'absolute',
        top: '2rem',
        backgroundColor: '#fff',
        borderRadius: '0.5rem'
      }}
      transition={{
        duration: 0.25,
        easings: 'ease-in-out'
      }}
      initial={{
        top: -100
      }}
      animate={{
        top: 25
      }}
      exit={{
        top: -100
      }}
    >
      <div className="menu__column">
        <Link to="/1">Лабораторная работа №1</Link>
        <Link to="/2">Лабораторная работа №2</Link>
        <Link to="/3">Лабораторная работа №3</Link>
      </div>
      <div className="menu__column">
        <Link to="/4">Лабораторная работа №4</Link>
        <Link to="/5">Лабораторная работа №5</Link>
        <Link to="/6">Лабораторная работа №6</Link>
      </div>
      <div className="menu__column">
        <Link to="/7">Лабораторная работа №7</Link>
        <Link to="/8">Лабораторная работа №8</Link>
        <Link to="/9">Лабораторная работа №9</Link>
      </div>
    </motion.nav>
  )
}

export { Menu }
