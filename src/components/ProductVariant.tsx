import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState } from 'react'

interface IVariant {
  size: string
  color: string
  stock: number
}

interface IProps {
  variants: IVariant[]
  onSizeChange: (size: string) => void
  onColorChange: (color: string) => void
}

export default function ProductVariant(prop: IProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const { variants } = prop

  const sizes = [...new Set(variants.map((variant) => variant.size))]
  const colors = [...new Set(variants.map((variant) => variant.color))]

  // Hàm tìm kiếm `stock` tương ứng
  const getStock = () => {
    const variant = variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    )
    return variant ? variant.stock : 0
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    prop.onSizeChange(size) // Gọi hàm từ props để cập nhật kích thước
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    prop.onColorChange(color) // Gọi hàm từ props để cập nhật màu sắc
  }

  return (
    <div>
      {/* Chọn Kích Thước */}
      <RadioGroup
        value={selectedSize}
        onValueChange={handleSizeChange}
        className="flex flex-col"
      >
        <p>Kích thước</p>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <RadioGroupItem
                value={size}
                checked={selectedSize === size}
                id={`size-${size}`}
              />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Chọn Màu Sắc */}
      <RadioGroup
        value={selectedColor}
        onValueChange={handleColorChange}
        className="flex flex-col"
      >
        <p className="mt-3">Màu sắc</p>
        <div className="flex gap-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <RadioGroupItem
                value={color}
                id={`color-${color}`}
                checked={selectedColor === color}
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Hiển thị số lượng tồn kho */}
      <p className="mt-3">Còn: {getStock()}</p>
    </div>
  )
}
