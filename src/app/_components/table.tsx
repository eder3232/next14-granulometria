'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table'
import { use } from 'react'
import { useGranulometriaStore } from '../_store/store'

const GranulometriaTable = () => {
  const data = useGranulometriaStore((state) => state.data)
  return (
    <Table className="w-auto table-auto">
      {/* <TableCaption>Granulometría</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-16">Add</TableHead>
          <TableHead className="text-center w-16">Remove</TableHead>
          <TableHead className="text-center w-16">Tamiz</TableHead>
          <TableHead className="text-center w-16">Abertura</TableHead>
          <TableHead className="text-center w-16">Peso corregido</TableHead>
          <TableHead className="text-center w-16">% Retenido</TableHead>
          <TableHead className="text-center w-16">
            % Retenido Acumulado
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((e, index) => (
          <TableRow key={index}></TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default GranulometriaTable
