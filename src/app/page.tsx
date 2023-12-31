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
import { useLayoutEffect } from 'react'
import SelectDecimals from './_components/select-decimals'
import Results from './_components/results'
import TypographyH2 from '@/components/typography/typography-h2'

export default function Home() {
  const calculate = useGranulometriaStore((state) => state.calculate)

  const errors = useGranulometriaStore((state) => state.errors)

  useLayoutEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="mt-10 container relative">
      <div className="flex flex-col items-start gap-4">
        <TypographyH1>Granulometría</TypographyH1>

        <TypographyP>Porfavor llena los siguientes datos en orden:</TypographyP>

        <div className="flex flex-col gap-y-2">
          <TypographyH2>1. Selecciona los tamices a usar:</TypographyH2>
          <SelectMeshes />
          <p>
            Estos son los tamices normados ASTM, si deseas agregar alguno
            adicional puedes hacerlo directamente en la tabla.
          </p>
        </div>

        <div>
          <TypographyH2>2. Perdida de material:</TypographyH2>
          <p>
            Si el peso total de las mallas es menor del peso inicial, es decir,
            se ha perdido material, se debe hacer una corrección al peso total
            de las mallas, de lo contrario, ignora este paso.
          </p>
          <LossMaterial />
        </div>

        <div className="flex flex-col gap-2">
          <TypographyH2>3. Pesos retenidos:</TypographyH2>
          <p>
            Llena los pesos retenidos en cada tamiz y presiona el boton
            calcular.
          </p>

          <div>
            <p>Puedes cambiar el número de decimales mostrados aqui: </p>
            <SelectDecimals />
          </div>

          <GranulometriaTable />

          <Errors />

          <Button
            className="w-min font-bold text-lg"
            size="lg"
            onClick={() => calculate()}
            disabled={errors.filter((e) => e.severity == 'error').length > 0}
          >
            Calcular
          </Button>
        </div>

        {errors.filter((e) => e.severity == 'error').length === 0 && (
          <>
            <div>
              <TypographyH3>4. Resultados:</TypographyH3>

              <Results />
            </div>

            <div>
              <TypographyH3>5. Gráfico:</TypographyH3>
              <p>Gráfico de granulometría</p>
            </div>
          </>
        )}

        <div className="h-32" />
      </div>
    </main>
  )
}
