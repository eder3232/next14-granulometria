import { type StateCreator, create } from 'zustand'
import { astmMeshes } from '../_data/meshes'
import type {
  IGranulometriaData,
  IMesh,
  IReactData,
  IUsedMesh,
} from '../_interfaces/interfaces'
import { immer } from 'zustand/middleware/immer'

interface IError {
  name: string
  message: string
  // stack: string
  typeError: string
  errorCode: number
  severity: 'error' | 'warning' | 'info'
}

const errorsCodes = {
  //100 - mallas
  100: 'Aberturas desordenadas',
  101: 'Aberturas repetidas',
}

type IGranulometriaState = {
  meshesData: IMesh[]
  usedMeshes: IUsedMesh[]

  data: IGranulometriaData[]

  isThereLossMaterial: boolean
  initialWeight: number

  computed: {
    totalWeight: number
  }

  errors: IError[]
}

type stringFields = 'astm'
type numberFields = 'iso' | 'weight'

type IGranulometriaActions = {
  addMesh: ({ astm, iso }: { astm: string; iso: number }) => void
  switchMeshAsUsed: (astm: string) => void
  switchLossMaterial: () => void

  readData: (reactData: IReactData[]) => void
  validateData: () => void
  calculate: () => void
  onInputTableChangeString: ({
    value,
    index,
    field,
  }: {
    value: string
    index: number
    field: stringFields
  }) => void

  onInputTableChangeNumber: ({
    value,
    index,
    field,
  }: {
    value: number
    index: number
    field: numberFields
  }) => void
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

const initialData: IGranulometriaData[] = [
  ...initialUsedMeshes
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
    }),
  {
    astm: 'Fondo',
    iso: 0,
    weight: 0,
  },
]

const initialInitialWeight = initialData.reduce((c, a) => c + a.weight, 0)

const granulometriaStore: StateCreator<
  IGranulometriaState & IGranulometriaActions,
  [['zustand/immer', never]]
> = (set, get) => ({
  meshesData: astmMeshes,
  usedMeshes: structuredClone(initialUsedMeshes),
  // .filter((mesh) => mesh.isUsual)
  data: structuredClone(initialData),

  initialWeight: initialInitialWeight,

  isThereLossMaterial: false,

  errors: [],

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

  onInputTableChangeString: ({ value, index, field }) => {
    set((state) => {
      state.data[index][field] = value
    })
  },

  onInputTableChangeNumber: ({ value, index, field }) => {
    set((state) => {
      state.data[index][field] = value
    })
  },

  addMesh: ({ astm, iso }) => {
    let gruesaFina: 'fina' | 'gruesa' = iso < 8 ? 'fina' : 'gruesa'
  },

  computed: {
    get totalWeight(): number {
      return get().data.reduce((c, a) => c + a.weight, 0)
    },
  },

  readData: (reactData) => {
    set((state) => {
      state.data = reactData.map((e) => ({
        astm: e.astm,
        iso: e.iso,
        weight: e.weight,
      }))
    })
  },

  validateData: () => {
    //Verificar que el orden de las aberturas se de mayor a menor
    let isos = get().data.map((e) => e.iso)
    let isosSorted = isos.sort((a, b) => a - b)
    let indexError = isos.findIndex((e, index) => e !== isosSorted[index])

    if (
      isos.length !== isosSorted.length ||
      isos.every((value, index) => value !== isosSorted[index])
    ) {
      set((state) => {
        console.log('error ctmre!')
        state.errors.push({
          name: 'Orden de aberturas',
          message:
            'Las aberturas deben estar ordenadas de mayor a menor - malla: ' +
            get().data[indexError].astm,
          typeError: errorsCodes[100],
          errorCode: 100,
          severity: 'warning',
        })
      })
    }

    //Verificar que no haya aberturas repetidas
    let isosUnique = [...new Set(isos)]
    if (isos.length !== isosUnique.length) {
      set((state) => {
        state.errors.push({
          name: 'Aberturas repetidas',
          message: 'No puede haber aberturas repetidas',
          typeError: errorsCodes[101],
          errorCode: 101,
          severity: 'error',
        })
      })
    }
  },

  calculate: () => {
    console.log('asdf')
    get().validateData()
  },
})

export const useGranulometriaStore = create<
  IGranulometriaState & IGranulometriaActions
>()(immer(granulometriaStore))
