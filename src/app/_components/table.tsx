'use client'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useGranulometriaStore } from '../_store/store'

const GranulometriaTable = () => {
  const data = useGranulometriaStore((state) => state.data)
  return (
    <div className="max-w-full overflow-x-auto overflow-y-visible lg:max-w-min">
      <Table className="w-auto table-auto bg-muted relative rounded-lg p-4 overflow-auto ">
        {/* <TableCaption>Granulometría</TableCaption> */}
        <TableHeader className="py-8">
          <TableRow className="[&>*]:text-center [&>.eder-head-text]:font-bold [&>.eder-head-text]:text-xl">
            <TableHead className="text-primary">
              <PlusCircle className="m-auto" />
            </TableHead>
            <TableHead className="text-primary">
              <MinusCircle className="m-auto" />
            </TableHead>
            <TableHead className="eder-head-text">Tamiz</TableHead>
            <TableHead className="eder-head-text">Abertura</TableHead>
            <TableHead className="eder-head-text">Peso</TableHead>
            <TableHead className="eder-head-text">Peso corregido</TableHead>
            <TableHead className="eder-head-text">% Retenido</TableHead>
            <TableHead className="text-center eder-head-text">
              % Retenido Acumulado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => (
            <TableRow key={index} className="[&>*]:py-1 [&>*]:px-1">
              <TableCell className="text-center">
                <button onClick={() => console.log('ra')}>
                  <PlusCircle className="m-auto text-primary" />
                </button>
              </TableCell>
              <TableCell className="px-1 text-center">
                <button>
                  <MinusCircle className="text-primary m-auto" />
                </button>
              </TableCell>
              <TableCell className="text-left whitespace-nowrap">
                {/* {e.astm} */}
                <Input type="text" defaultValue={e.astm} className="w-32" />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  type="number"
                  defaultValue={e.iso}
                  className="w-32"
                  step={0.01}
                />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  type="number"
                  defaultValue={e.weight}
                  className="w-32"
                  step={0.1}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default GranulometriaTable
