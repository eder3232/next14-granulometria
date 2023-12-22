import { Button } from '@/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import ListMeshes from './list-meshes'

const SelectMeshes = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Seleccionar mallas</Button>
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
