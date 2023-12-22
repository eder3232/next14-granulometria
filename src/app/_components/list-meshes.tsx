'use client'
import { useGranulometriaStore } from '../_store/store'
import { Checkbox } from '@/shadcn/ui/checkbox'

const ListMeshes = () => {
  const usedMeshes = useGranulometriaStore((state) => state.usedMeshes)
  const markMeshAsUsed = useGranulometriaStore(
    (state) => state.switchMeshAsUsed
  )
  return (
    <div className="h-full overflow-auto">
      {usedMeshes.map((mesh, index) => (
        <div
          key={index}
          className="flex gap-2 items-center odd:bg-primary/10 p-2 rounded"
        >
          <Checkbox
            checked={mesh.isUsed}
            onCheckedChange={() => markMeshAsUsed(mesh.astm)}
          />
          {mesh.astm}
        </div>
      ))}
    </div>
  )
}

export default ListMeshes