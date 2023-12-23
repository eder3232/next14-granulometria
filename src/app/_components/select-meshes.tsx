import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ListMeshes from './list-meshes'

const SelectMeshes = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-min">Seleccionar mallas</Button>
      </DialogTrigger>
      <DialogContent className="h-96">
        <DialogHeader>
          <DialogTitle>Mallas ASTM</DialogTitle>
          <DialogDescription>
            Selecciona las mallas que deseas agregar:
          </DialogDescription>
        </DialogHeader>
        <ListMeshes />
      </DialogContent>
    </Dialog>
  )
}

export default SelectMeshes
