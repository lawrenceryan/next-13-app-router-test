'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { SideNav } from '@/layouts/dashboard/side-nav'
import { TopNav } from '@/layouts/dashboard/top-nav'
import { SessionProvider } from 'next-auth/react'

const SIDE_NAV_WIDTH = 280

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}))

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
})

export default function Layout(props) {
  const { children } = props
  const pathname = usePathname()
  const [openNav, setOpenNav] = useState(false)

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false)
    }
  }, [openNav])

  useEffect(
    () => {
      handlePathnameChange()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  )

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <SessionProvider>{children}</SessionProvider>
        </LayoutContainer>
      </LayoutRoot>
    </>
  )
}
