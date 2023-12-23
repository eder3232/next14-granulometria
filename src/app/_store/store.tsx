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

  isThereLossMaterial: boolean
}

type IGranulometriaActions = {
  addMesh: ({ astm, iso }: { astm: string; iso: number }) => void
  switchMeshAsUsed: (astm: string) => void
  switchLossMaterial: () => void
}

const initialMeshes = [
  '3/4"',
  '3/8"',
  'No. 4',
  'No. 6',
  'No. 8',
  ,
  // 'No. 10'
  'No. 20',
  'No. 40',
  'No. 50',
  'No. 100',
  'No. 200',
]
const initialUsedMeshes = astmMeshes.map((e) => ({
  ...e,
  isUsed: initialMeshes.includes(e.astm),
}))
const initialData = initialUsedMeshes
  .filter((e) => e.isUsed)
  .map((mesh, index) => {
    let decimales = 2
    let weight = Math.round(Math.random() * 100 * decimales) / decimales
    if (index === 0) weight = 0

    return {
      astm: mesh.astm,
      iso: mesh.iso,
      weight: weight,
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

  isThereLossMaterial: false,

  switchMeshAsUsed(astm) {
    set((state) => {
      const index = state.usedMeshes.findIndex((e) => e.astm === astm)
      state.usedMeshes[index].isUsed = !state.usedMeshes[index].isUsed
    })
  },
  switchLossMaterial() {
    set((state) => {
      state.isThereLossMaterial = !state.isThereLossMaterial
    })
  },

  addMesh: ({ astm, iso }) => {
    let gruesaFina: 'fina' | 'gruesa' = iso < 8 ? 'fina' : 'gruesa'
  },
})

export const useGranulometriaStore = create<
  IGranulometriaState & IGranulometriaActions
>()(immer(granulometriaStore))
