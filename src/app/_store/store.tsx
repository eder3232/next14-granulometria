import { type StateCreator, create } from 'zustand'
import { astmMeshes } from '../_data/meshes'
import type {
  IGranulometriaData,
  IMesh,
  IReactData,
  IResults,
  IUsedMesh,
} from '../_interfaces/interfaces'
import { immer } from 'zustand/middleware/immer'

type ISeverity = 'error' | 'warning' | 'info'
type ITypeError = 'aberturas'
interface IError {
  name: string
  message: string
  // stack: string
  typeError: ITypeError
  errorCode: number
  severity: ISeverity
}

const errorsCodes: {
  [key: number]: IError
} = {
  //100 - mallas
  100: {
    name: 'Orden de aberturas',
    message: 'Las aberturas deben estar ordenadas de mayor a menor.',
    typeError: 'aberturas',
    errorCode: 100,
    severity: 'warning',
  },
  101: {
    name: 'Aberturas repetidas',
    message: 'No puede haber aberturas repetidas',
    typeError: 'aberturas',
    errorCode: 101,
    severity: 'warning',
  },
  102: {
    name: 'Peso de la primera malla',
    message:
      'Se recomienda que la primera malla debe tener peso 0 para graficar correctamente la curva granulométrica.',
    typeError: 'aberturas',
    errorCode: 101,
    severity: 'warning',
  },
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

  numberDecimals: number

  results: IResults[]
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

  onNumberDecimalsChange: (numeroDecimales: number) => void

  onInitialWeightChange: (pesoInicial: number) => void
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
      let weight =
        Math.round(((index * 2.5) / 100) * 100 * decimales) / decimales
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

const initialResults = initialData.map((mesh) => ({
  pesoCorregido: 0,
  retenido: 0,
  retenidoAcumulado: 0,
  pasante: 0,
}))

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

  results: initialResults,

  numberDecimals: 2,

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
    //TODO: I think this is useless, but I'm not sure
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
          ...errorsCodes[100],
          message:
            'Las aberturas deben estar ordenadas de mayor a menor - malla: ' +
            get().data[indexError].astm,
        })
      })
    }

    //Verificar que no haya aberturas repetidas
    let isosUnique = [...new Set(isos)]
    let aberturaRepetida = isos.find(
      (value, index) => value === isosUnique[index]
    )

    if (isos.length !== isosUnique.length) {
      set((state) => {
        state.errors.push({
          ...errorsCodes[101],
          message: 'No puede haber aberturas repetidas.',
        })
      })
    }

    // Verificar que la primera malla tenga peso 0
    let firstMesh = get().data[0]
    if (firstMesh.weight !== 0) {
      set((state) => {
        state.errors.push({
          ...errorsCodes[102],
        })
      })
    }
  },

  calculate: () => {
    get().validateData()
    if (get().errors.filter((e) => e.severity == 'error').length > 0) return

    let data = get().data
    let totalWeight = data.reduce((c, a) => c + a.weight, 0)
    let initialWeight = totalWeight

    if (get().isThereLossMaterial) {
      initialWeight = get().initialWeight
    }
    console.log(get().initialWeight)
    let results = data.map((mesh) => ({
      pesoCorregido: 0,
      retenido: 0,
      retenidoAcumulado: 0,
      pasante: 0,
    }))

    // Si hay perdida, hacer correccion al peso total de las mallas

    let pesoPerdido = initialWeight - totalWeight
    let correccionPorMalla = pesoPerdido / data.length

    results.forEach((mesh, index) => {
      mesh.pesoCorregido = data[index].weight + correccionPorMalla
    })

    let newTotalWeight = results.reduce((c, a) => c + a.pesoCorregido, 0)

    results.forEach((mesh, index) => {
      mesh.retenido = (mesh.pesoCorregido / newTotalWeight) * 100
    })

    results.forEach((mesh, index) => {
      mesh.retenidoAcumulado =
        index === 0
          ? mesh.retenido
          : mesh.retenido + results[index - 1].retenidoAcumulado
    })

    results.forEach((mesh, index) => {
      mesh.pasante = 100 - mesh.retenidoAcumulado
    })

    set((state) => {
      state.results = results
    })
  },

  onNumberDecimalsChange: (numeroDecimales) => {
    set((state) => {
      state.numberDecimals = numeroDecimales
    })
  },

  onInitialWeightChange: (pesoInicial) => {
    set((state) => {
      state.initialWeight = pesoInicial
    })
  },
})

export const useGranulometriaStore = create<
  IGranulometriaState & IGranulometriaActions
>()(immer(granulometriaStore))
