import TypographyH3 from '@/components/typography/typography-h3'
import { useGranulometriaStore } from '../_store/store'
import TypographyH2 from '@/components/typography/typography-h2'

const Results = () => {
  const results = useGranulometriaStore((state) => state.results)

  return (
    <div>
      <TypographyH2>Resultados:</TypographyH2>

      <div>
        <p>Grava:</p>
        <p>Arena:</p>
        <p>Finos:</p>
      </div>

      <div>
        <TypographyH3>Coeficientes</TypographyH3>
      </div>
    </div>
  )
}

export default Results
