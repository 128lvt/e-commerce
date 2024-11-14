import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState } from 'react'
import type { ProductVariant } from '../../types/Type'

interface IProps {
  variants: ProductVariant[]
  onSizeChange: (size: string) => void
  onColorChange: (color: string) => void
}

export function ProductVariant(prop: IProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const { variants } = prop

  const sizes = [...new Set(variants.map((variant) => variant.size))]
  const colors = [...new Set(variants.map((variant) => variant.color))]

  // Hàm tìm kiếm `variant` được chọn
  const getSelectedVariant = () => {
    const variant = variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    )
    return variant
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    prop.onSizeChange(size) // Cập nhật kích thước trong component cha
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    prop.onColorChange(color) // Cập nhật màu sắc trong component cha
  }

  const selectedVariant = getSelectedVariant()

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
                value={size ?? ''}
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
                value={color ?? ''}
                id={`color-${color}`}
                checked={selectedColor === color}
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Hiển thị số lượng tồn kho và ID của variant */}
      <p className="mt-3">Còn: {selectedVariant ? selectedVariant.stock : 0}</p>
    </div>
  )
}
