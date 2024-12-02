import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState, useEffect } from 'react'
import type { ProductVariant } from '../../types/Type'
import { useMemo } from 'react'

interface IProps {
  variants: ProductVariant[]
  onSizeChange: (size: string) => void
  onColorChange: (color: string) => void
  stock: number
}

export function ProductVariant(prop: IProps) {
  const { variants } = prop

  const sizes = [...new Set(variants.map((variant) => variant.size))]
  const colors = useMemo(
    () => [...new Set(variants.map((variant) => variant.color))],
    [variants],
  )

  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0] || '')
      prop.onColorChange(colors[0] || '')
      prop.onSizeChange(sizes[0] || '')
    }
  }, [colors, prop, prop.onColorChange, prop.onSizeChange, sizes])

  const getSelectedVariant = () => {
    return variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    )
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    prop.onSizeChange(size)
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
              <RadioGroupItem value={size || ''} id={`size-${size}`} />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Màu sắc ẩn */}
      <input type="hidden" value={selectedColor} />

      {/* Hiển thị số lượng tồn kho và ID của variant */}
      <p className="mt-3">
        Còn: {selectedVariant ? selectedVariant.stock : prop.stock} /{' '}
        {prop.stock}
      </p>
    </div>
  )
}
