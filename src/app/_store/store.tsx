import { create, type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type {
  IGranulometriaData,
  IReactData,
  IResults,
  IUsedMesh,
} from '../_interfaces/interfaces'
import { IError, errorsCodes } from './errors'
import {
  initialData,
  initialInitialWeight,
  initialResults,
  initialUsedMeshes,
} from './initialState'

type IGranulometriaState = {
  // *Estado de la aplición
  // *Input
  usedMeshes: IUsedMesh[]
  data: IGranulometriaData[]
  isThereLossMaterial: boolean
  initialWeight: number
  numberDecimals: number
  // *Computed
  computed: {
    totalWeight: number
    errors: IError[]
    appState: 'initial' | 'loading' | 'loaded' | 'error'
  }

  errors: IError[]
  results: IResults[]
}

type stringFields = 'astm'
type numberFields = 'iso' | 'weight'

type IGranulometriaActions = {
  //inputControllers
  switchMeshAsUsed: (astm: string) => void
  switchLossMaterial: () => void
  onNumberDecimalsChange: (numeroDecimales: number) => void
  onInitialWeightChange: (pesoInicial: number) => void

  addMesh: ({ astm, iso }: { astm: string; iso: number }) => void

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

  //logic
  calculate: () => void
}

const granulometriaStore: StateCreator<
  IGranulometriaState & IGranulometriaActions,
  [['zustand/immer', never]]
> = (set, get) => ({
  // *Atributos

  // **Estado de la aplición
  usedMeshes: structuredClone(initialUsedMeshes),
  data: structuredClone(initialData),
  initialWeight: initialInitialWeight,
  isThereLossMaterial: false,

  errors: [],

  results: initialResults,

  numberDecimals: 2,

  computed: {
    get totalWeight(): number {
      return get().data.reduce((c, a) => c + a.weight, 0)
    },
    get errors() {
      const newErrors: IError[] = []

      // Verificar que el orden de las aberturas se de mayor a menor

      let isos = get().data.map((e) => e.iso)
      let isosSorted = isos.sort((a, b) => a - b)
      let indexError = isos.findIndex((e, index) => e !== isosSorted[index])

      if (
        isos.length !== isosSorted.length ||
        isos.every((value, index) => value !== isosSorted[index])
      ) {
        newErrors.push({
          ...errorsCodes[100],
          message:
            'Las aberturas deben estar ordenadas de mayor a menor - malla: ' +
            get().data[indexError].astm,
        })
      }

      // Verificar que no haya aberturas repetidas

      let isosUnique = [...new Set(isos)]
      let aberturaRepetida = isos.find(
        (value, index) => value === isosUnique[index]
      )

      if (isos.length !== isosUnique.length) {
        newErrors.push({
          ...errorsCodes[101],
          message:
            'No puede haber aberturas repetidas, error en malla: ' +
            aberturaRepetida,
        })
      }

      // Verificar que la primera malla tenga peso 0

      let firstMesh = get().data[0]
      if (firstMesh.weight !== 0) {
        newErrors.push({
          ...errorsCodes[102],
          message:
            'La primera malla debe tener peso 0, error en malla: ' +
            firstMesh.astm,
        })
      }

      // Verificar que el peso total sea mayor a 0

      let totalWeight = get().data.reduce((c, a) => c + a.weight, 0)
      if (totalWeight === 0) {
        newErrors.push({
          ...errorsCodes[200],
        })
      }
      return newErrors
    },
    appState: 'initial',
  },

  // Métodos:

  switchMeshAsUsed(astm) {
    set((state) => {
      const index = state.usedMeshes.findIndex((e) => e.astm === astm)
      state.usedMeshes[index].isUsed = !state.usedMeshes[index].isUsed

      if (state.usedMeshes[index].isUsed) {
        state.data.push({
          astm: state.usedMeshes[index].astm,
          iso: state.usedMeshes[index].iso,
          weight: 0,
        })

        state.results.push({
          pesoCorregido: 0,
          retenido: 0,
          retenidoAcumulado: 0,
          pasante: 0,
        })
      } else {
        const indexData = state.data.findIndex((e) => e.astm === astm)
        state.data.splice(indexData, 1)

        // const indexResults = state.results.findIndex((e) => e.astm === astm)
      }
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

  calculate: () => {
    if (get().computed.errors.filter((e) => e.severity == 'error').length > 0)
      return

    let data = get().data
    let totalWeight = data.reduce((c, a) => c + a.weight, 0)
    let initialWeight = totalWeight

    if (get().isThereLossMaterial) {
      initialWeight = get().initialWeight
    }

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
