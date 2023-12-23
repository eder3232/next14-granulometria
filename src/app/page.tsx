'use client'

import TypographyH1 from '@/components/typography/typography-h1'
import SelectMeshes from './_components/select-meshes'
import GranulometriaTable from './_components/table'
import LossMaterial from './_components/loss-material'
import TypographyP from '@/components/typography/typography-p'
import TypographyH3 from '@/components/typography/typography-h3'
import { Button } from '@/components/ui/button'
import Errors from './_components/errors'
import { useGranulometriaStore } from './_store/store'

export default function Home() {
  const calculate = useGranulometriaStore((state) => state.calculate)
  return (
    <main className="mt-10 container relative">
      <div className="flex flex-col items-start gap-4">
        <TypographyH1>Granulometría</TypographyH1>

        <TypographyP>Porfavor llena los siguientes datos en orden:</TypographyP>

        <div className="flex flex-col gap-y-2">
          <TypographyH3>1. Selecciona los tamices a usar:</TypographyH3>
          <SelectMeshes />
          <p>
            Estos son los tamices normados ASTM, si deseas agregar alguno
            adicional puedes hacerlo directamente en la tabla.
          </p>
        </div>

        <div>
          <TypographyH3>2. Perdida de material:</TypographyH3>
          <p>
            Si el peso total de las mallas es menor del peso inicial, es decir,
            se ha perdido material, se debe hacer una corrección al peso total
            de las mallas, de lo contrario, ignora este paso.
          </p>
          <LossMaterial />
        </div>

        <div className="flex flex-col gap-2">
          <TypographyH3>3. Pesos retenidos:</TypographyH3>
          <p>
            Llena los pesos retenidos en cada tamiz y presiona el boton
            calcular.
          </p>
          <GranulometriaTable />

          <Errors />

          <Button
            className="w-min font-bold text-lg"
            size="lg"
            onClick={() => calculate()}
          >
            Calcular
          </Button>
        </div>

        <div>
          <TypographyH3>3. Calcular:</TypographyH3>
          <p>
            Una vez que hayas llenado los datos, puedes calcular los resultados
            de la granulometría.
          </p>
        </div>

        <div>
          <TypographyH3>4. Resultados:</TypographyH3>
          <p>
            Una vez que hayas llenado los datos, puedes calcular los resultados
            de la granulometría.
          </p>
        </div>

        <div>
          <TypographyH3>5. Gráfico:</TypographyH3>
          <p>Gráfico de granulometría</p>
        </div>

        <div className="h-32" />
      </div>
    </main>
  )
}
