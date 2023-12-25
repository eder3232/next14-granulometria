import { dataAstmMeshes } from '../_data/meshes'
import { IGranulometriaData } from '../_interfaces/interfaces'

export const initialMeshes = [
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
export const initialUsedMeshes = dataAstmMeshes.map((e) => ({
  ...e,
  isUsed: initialMeshes.includes(e.astm),
}))

export const initialData: IGranulometriaData[] = [
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

export const initialResults = initialData.map((mesh) => ({
  pesoCorregido: 0,
  retenido: 0,
  retenidoAcumulado: 0,
  pasante: 0,
}))

export const initialInitialWeight = initialData.reduce(
  (c, a) => c + a.weight,
  0
)
