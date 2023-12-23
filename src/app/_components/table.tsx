'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { use } from 'react'
import { useGranulometriaStore } from '../_store/store'
import { Button } from '@/components/ui/button'
import { MinusCircle, PlusCircle } from 'lucide-react'

const GranulometriaTable = () => {
  const data = useGranulometriaStore((state) => state.data)
  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible lg:max-w-min">
      <Table className="w-auto table-auto bg-muted relative rounded-lg p-4 overflow-auto ">
        {/* <TableCaption>Granulometría</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-12 text-primary">
              <PlusCircle />
            </TableHead>
            <TableHead className="text-center w-12 text-primary">
              <MinusCircle />
            </TableHead>
            <TableHead className="text-center w-24 font-bold">Tamiz</TableHead>
            <TableHead className="text-center w-24 font-bold">
              Abertura
            </TableHead>
            <TableHead className="text-center w-24 font-bold">
              Peso corregido
            </TableHead>
            <TableHead className="text-center w-24 font-bold">
              % Retenido
            </TableHead>
            <TableHead className="text-center w-24 font-bold">
              % Retenido Acumulado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => (
            <TableRow key={index}>
              <TableCell className="py-2 text-center">
                <Button
                  className="font-bold"
                  size="sm"
                  // onClick={() => edges_onAddNewRow(index)}
                >
                  +
                </Button>
              </TableCell>
              <TableCell className="py-2 text-center">
                <Button
                  className="font-bold"
                  size="sm"
                  // onClick={() => edges_onAddNewRow(index)}
                >
                  -
                </Button>
              </TableCell>
              <TableCell>{e.astm}</TableCell>
              <TableCell>{e.iso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default GranulometriaTable
