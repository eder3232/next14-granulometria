export interface IMesh {
  astm: string
  iso: number
  serie: 'fina' | 'gruesa'
  isUsual: boolean
}

export interface IUsedMesh extends IMesh {
  isUsed: boolean
}
