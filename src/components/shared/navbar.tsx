import Image from 'next/image'
import ModeToggle from './mode-toggle'

const Navbar = () => {
  return (
    <div className="h-12 flex items-center justify-center border-b bg-background/95 backdrop-blur">
      <div className="container justify-between flex">
        {/* logo */}
        <div className="flex gap-2 items-center">
          <Image src="/bocchi_right.png" alt="logo" height={30} width={30} />
          <div className="text-xl font-bold text-primary">eder3232</div>
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
