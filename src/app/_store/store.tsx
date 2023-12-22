import { type StateCreator, create } from 'zustand'
import { astmMeshes } from '../_data/meshes'
import { IMesh, IUsedMesh } from '../_interfaces/interfaces'
import { immer } from 'zustand/middleware/immer'

interface IGranulometriaData {
  astm: string
  iso: number
  weight: number
}

type IGranulometriaState = {
  meshesData: IMesh[]
  usedMeshes: IUsedMesh[]

  data: IGranulometriaData[]
}

type IGranulometriaActions = {
  addMesh: ({ astm, iso }: { astm: string; iso: number }) => void
  switchMeshAsUsed: (astm: string) => void
}

const initialUsedMeshes = astmMeshes.map((e) => ({ ...e, isUsed: e.isUsual }))
const initialData = initialUsedMeshes.map((mesh, index) => {
  let decimales = 2
  let weight = Math.round(Math.random() * 100 * decimales) / decimales
  if (index === 0) weight = 0

  return {
    astm: mesh.astm,
    iso: mesh.iso,
    weight: 0,
  }
})

const granulometriaStore: StateCreator<
  IGranulometriaState & IGranulometriaActions,
  [['zustand/immer', never]]
> = (set, get) => ({
  meshesData: astmMeshes,
  usedMeshes: structuredClone(initialUsedMeshes),
  // .filter((mesh) => mesh.isUsual)

  data: structuredClone(initialData),
  switchMeshAsUsed(astm) {
    set((state) => {
      const index = state.usedMeshes.findIndex((e) => e.astm === astm)
      state.usedMeshes[index].isUsed = !state.usedMeshes[index].isUsed
    })
  },

  addMesh: ({ astm, iso }) => {
    let gruesaFina: 'fina' | 'gruesa' = iso < 8 ? 'fina' : 'gruesa'
  },
})

export const useGranulometriaStore = create<
  IGranulometriaState & IGranulometriaActions
>()(immer(granulometriaStore))
