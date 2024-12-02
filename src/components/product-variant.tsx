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

export function ProductVariant(props: IProps) {
  const { variants } = props

  const sizes = useMemo(
    () => [...new Set(variants.map((variant) => variant.size))],
    [variants],
  )

  const colors = useMemo(
    () => [...new Set(variants.map((variant) => variant.color))],
    [variants],
  )

  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')

  // Remove the immediate onSizeChange call

  useEffect(() => {
    if (sizes.length > 0) {
      const initialSize = sizes[0] || ''
      setSelectedSize(initialSize)
      props.onSizeChange(initialSize)
    }
  }, [sizes, props.onSizeChange])

  useEffect(() => {
    if (colors.length > 0) {
      const initialColor = colors[0] || ''
      setSelectedColor(initialColor)
      props.onColorChange(initialColor)
    }
  }, [colors, props.onColorChange])

  const getSelectedVariant = () => {
    return variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    )
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    props.onSizeChange(size)
  }

  const selectedVariant = getSelectedVariant()

  return (
    <div>
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

      <input type="hidden" value={selectedColor} />

      <p className="mt-3">
        Còn: {selectedVariant ? selectedVariant.stock : props.stock} /{' '}
        {props.stock}
      </p>
    </div>
  )
}
