'use client'
import { useGranulometriaStore } from '../_store/store'

const Errors = () => {
  const errors = useGranulometriaStore((state) => state.errors)
  return (
    <div>
      {errors.map((e, index) => (
        <p key={index}>{e.message}</p>
      ))}
    </div>
  )
}

export default Errors
