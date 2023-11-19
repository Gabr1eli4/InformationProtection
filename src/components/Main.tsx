import { Title } from './TitleSection'
import { Menu } from './Menu'
import { AnimatedArrowDownIcon } from '../icons/ArrowDownIcon'
import { AnimatePresence } from 'framer-motion'
import { MouseEvent, useState, useRef, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function Main() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const mainRef = useRef<HTMLDivElement | null>(null)

  const openMenu = () => {
    setIsMenuVisible(true)
  }

  const closeMenu = (event: MouseEvent) => {
    if (
      mainRef.current &&
      !mainRef.current.contains(event.currentTarget as Node)
    ) {
      setIsMenuVisible(false)
    }
  }

  useEffect(() => {
    const body = document.body
    body.addEventListener('mouseup', closeMenu as unknown as EventListener)
    return () => {
      body.removeEventListener('mouseup', closeMenu as unknown as EventListener)
    }
  }, [])

  return (
    <main ref={mainRef} className="main" onClick={closeMenu}>
      <AnimatePresence>
        {!isMenuVisible && (
          <AnimatedArrowDownIcon
            key={'AnimatedArrowDownIcon'}
            callback={openMenu}
          />
        )}
        {isMenuVisible && <Menu key={'Menu'} />}
      </AnimatePresence>
      <Title content="Защита информации" />
      <Outlet />
    </main>
  )
}

export { Main }
