type ISeverity = 'error' | 'warning' | 'info'
type ITypeError = 'aberturas' | 'pesos'
export interface IError {
  name: string
  message: string
  // stack: string
  typeError: ITypeError
  errorCode: number
  severity: ISeverity
}

export const errorsCodes: {
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

  200: {
    name: 'Peso de muestra',
    message: 'El peso total de la muestra no puede ser 0.',
    typeError: 'pesos',
    errorCode: 200,
    severity: 'error',
  },
}
