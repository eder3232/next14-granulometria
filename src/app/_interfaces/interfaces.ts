export interface IMesh {
  astm: string
  iso: number
  serie: 'fina' | 'gruesa'
  isUsual: boolean
}

export interface IUsedMesh extends IMesh {
  isUsed: boolean
}
export interface IGranulometriaData {
  astm: string
  iso: number
  weight: number
}
export interface IReactData {
  astm: string
  iso: number
  weight: number
}

export interface IResults {
  pesoCorregido: number
  retenido: number
  retenidoAcumulado: number
  pasante: number
}
