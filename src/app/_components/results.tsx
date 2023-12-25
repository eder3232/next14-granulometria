import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import TypographyH3 from '@/components/typography/typography-h3'
import { useGranulometriaStore } from '../_store/store'
import TypographyH2 from '@/components/typography/typography-h2'

const Results = () => {
  const errors = useGranulometriaStore((state) => state.errors)
  const results = useGranulometriaStore((state) => state.results)
  const decimales = useGranulometriaStore((state) => state.numberDecimals)
  const isThereLossMaterial = useGranulometriaStore(
    (state) => state.isThereLossMaterial
  )

  const data = useGranulometriaStore((state) => state.data)

  let grava = 0
  let gravaCorregida = 0
  let arena = 0
  let arenaCorregida = 0
  let finos = 0
  let finosCorregidos = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i].iso > 4.75) {
      grava += data[i].weight
      gravaCorregida += results[i].pesoCorregido
    }
    if (data[i].iso < 4.75 && data[i].iso > 0.075) {
      arena += data[i].weight
      arenaCorregida += results[i].pesoCorregido
    }
    if (data[i].iso < 0.075) {
      finos += data[i].weight
      finosCorregidos += results[i].pesoCorregido
    }
  }

  let pesoTotal = grava + arena + finos
  let pesoTotalCorregido = gravaCorregida + arenaCorregida + finosCorregidos

  let porcentajeGrava = (grava / pesoTotal) * 100
  let porcentajeArena = (arena / pesoTotal) * 100
  let porcentajeFinos = (finos / pesoTotal) * 100

  return (
    <div>
      <div>
        <TypographyH3>Proporciones</TypographyH3>
        <div>
          <Table>
            <TableHeader className="[&_th]:font-bold [&_th]:text-center">
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Grava</TableHead>
                <TableHead>Arena</TableHead>
                <TableHead>Finos</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody className="[&>tr_:first-child]:bg-pink-400"> */}
            <TableBody className="[&>tr_:not(:first-child)]:text-right [&>tr_:first-child]:font-bold [&>tr_:first-child]:text-muted-foreground">
              <TableRow>
                <TableCell className="text-left">Pesos</TableCell>
                <TableCell>{grava.toFixed(decimales)}</TableCell>
                <TableCell>{arena.toFixed(decimales)}</TableCell>
                <TableCell>{finos.toFixed(decimales)}</TableCell>
              </TableRow>
              {isThereLossMaterial && (
                <TableRow>
                  <TableCell>Pesos corregidos</TableCell>
                  <TableCell>{gravaCorregida.toFixed(decimales)}</TableCell>
                  <TableCell>{arenaCorregida.toFixed(decimales)}</TableCell>
                  <TableCell>{finosCorregidos.toFixed(decimales)}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>%</TableCell>
                <TableCell>{porcentajeGrava.toFixed(decimales)}%</TableCell>
                <TableCell>{porcentajeArena.toFixed(decimales)}%</TableCell>
                <TableCell>{porcentajeFinos.toFixed(decimales)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <TypographyH3>Coeficientes</TypographyH3>
      </div>
    </div>
  )
}

export default Results
