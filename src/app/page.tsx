import TypographyH1 from '@/shared/components/typography/typography-h1'
import SelectMeshes from './_components/select-meshes'
import GranulometriaTable from './_components/table'

export default function Home() {
  return (
    <main className="mt-10 container">
      <div className="flex flex-col items-start gap-4">
        <TypographyH1>Granulometría</TypographyH1>

        <SelectMeshes />

        <GranulometriaTable />
      </div>
    </main>
  )
}
