'use client'

import { Checkbox } from '@/components/ui/checkbox'
import React, { use } from 'react'
import { useGranulometriaStore } from '../_store/store'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const LossMaterial = () => {
  const isThereLossMaterial = useGranulometriaStore(
    (state) => state.isThereLossMaterial
  )

  const initialWeight = useGranulometriaStore((state) => state.initialWeight)

  const switchLossMaterial = useGranulometriaStore(
    (state) => state.switchLossMaterial
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        ¿Se ha perdido material durante el tamizado?
        <p>Si</p>
        <Checkbox
          checked={isThereLossMaterial}
          onCheckedChange={() => switchLossMaterial()}
        />
        <p>No</p>
        <Checkbox
          checked={!isThereLossMaterial}
          onCheckedChange={() => switchLossMaterial()}
        />
      </div>

      <Input
        type="number"
        className={cn('w-32', { hidden: !isThereLossMaterial })}
        placeholder="Peso total de las mallas"
        step="0.1"
        defaultValue={initialWeight}
      />
    </div>
  )
}

export default LossMaterial
