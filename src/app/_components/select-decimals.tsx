import { useGranulometriaStore } from '../_store/store'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SelectDecimals = () => {
  const numberDecimals = useGranulometriaStore((state) => state.numberDecimals)

  const onNumberDecimalsChange = useGranulometriaStore(
    (state) => state.onNumberDecimalsChange
  )
  return (
    <Select
      value={numberDecimals.toString()}
      onValueChange={(e) => onNumberDecimalsChange(+e)}
    >
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Número de decimales" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Número de decimales</SelectLabel>
          <SelectItem value="0">0</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectDecimals
