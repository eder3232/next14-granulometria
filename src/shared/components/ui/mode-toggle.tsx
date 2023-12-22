'use client'
import { Button } from '@/shadcn/ui/button'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const ModeToggle = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex items-center">
      {theme === 'dark' && (
        <Button variant="outline" size="icon" onClick={() => setTheme('light')}>
          <Image src="/sun.png" alt="light mode" width={32} height={32} />
        </Button>
      )}

      {theme === 'light' && (
        <Button variant="outline" size="icon" onClick={() => setTheme('dark')}>
          <Image src="/half-moon.png" alt="light mode" width={32} height={32} />
        </Button>
      )}
    </div>
  )
}

export default ModeToggle
