'use client'
import { cn } from '@/lib/utils'
import { useGranulometriaStore } from '../_store/store'

const Errors = () => {
  const errors = useGranulometriaStore((state) => state.computed.errors)
  return (
    <div>
      {errors.map((e, index) => (
        <div
          className={cn('p-4 border', {
            'bg-warning': e.severity === 'warning',
          })}
          key={index}
        >
          {e.message}
        </div>
      ))}
    </div>
  )
}

export default Errors
