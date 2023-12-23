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
import { cn } from '@/lib/utils'

const GranulometriaTable = () => {
  const data = useGranulometriaStore((state) => state.data)
  const onInputTableChangeString = useGranulometriaStore(
    (state) => state.onInputTableChangeString
  )

  const onInputTableChangeNumber = useGranulometriaStore(
    (state) => state.onInputTableChangeNumber
  )

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
            <TableHead className="eder-head-text">% Pasante</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => (
            <TableRow key={index} className="[&>*]:py-1 [&>*]:px-1">
              <TableCell className="text-center">
                <button
                  onClick={() => console.log('ra')}
                  disabled={index === data.length - 1}
                  className={cn('text-primary disabled:text-muted-foreground')}
                >
                  <PlusCircle className="m-auto" />
                </button>
              </TableCell>
              <TableCell className="px-1 text-center">
                <button
                  disabled={index === data.length - 1}
                  className={cn('text-primary disabled:text-muted-foreground')}
                >
                  <MinusCircle className="m-auto" />
                </button>
              </TableCell>
              <TableCell className="text-left whitespace-nowrap">
                {/* {e.astm} */}
                <Input
                  type="text"
                  defaultValue={e.astm}
                  className="w-32"
                  onBlur={(e) =>
                    onInputTableChangeString({
                      value: e.target.value,
                      index: index,
                      field: 'astm',
                    })
                  }
                />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  type="number"
                  defaultValue={e.iso}
                  className="w-32"
                  step={0.01}
                  onBlur={(e) =>
                    onInputTableChangeNumber({
                      value: e.target.valueAsNumber,
                      index: index,
                      field: 'iso',
                    })
                  }
                />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  type="number"
                  defaultValue={e.weight}
                  className="w-32"
                  step={0.1}
                  onBlur={(e) =>
                    onInputTableChangeNumber({
                      value: e.target.valueAsNumber,
                      index: index,
                      field: 'weight',
                    })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default GranulometriaTable
