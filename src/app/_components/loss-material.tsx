'use client'

import { Checkbox } from '@/shadcn/ui/checkbox'
import React, { use } from 'react'
import { useGranulometriaStore } from '../_store/store'

const LossMaterial = () => {
  const isThereLossMaterial = useGranulometriaStore(
    (state) => state.isThereLossMaterial
  )

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
    </div>
  )
}

export default LossMaterial
