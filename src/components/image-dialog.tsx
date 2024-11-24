'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ProductImage } from '../../types/Type'
import Image from 'next/image'
import { API_URL } from '@/configs/apiConfig'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import useProduct from '@/hooks/use-product'
import { useToast } from '@/hooks/use-toast'

interface IProps {
  images: ProductImage[]
  productId: number
}

export default function ImageDialog({ images, productId }: IProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(false) // Trạng thái mở của dialog
  const token = localStorage.getItem('token')
  const { toast } = useToast()
  const { reloadProduct } = useProduct()

  const id = images?.[0]?.id ?? productId

  const method = images && images.length > 0 ? 'PUT' : 'POST'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile) {
      alert('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('files', selectedFile)

    try {
      const response = await fetch(`${API_URL}/products/uploads/${id}`, {
        method: `${method}`,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        reloadProduct()
        toast({
          title: 'Thành công!',
          description: `Upload ảnh thành công`,
        })

        // Đóng dialog sau khi upload thành công
        setIsOpen(false)
      } else {
        const errorData = await response.json()
        toast({
          title: 'Thất bại!',
          description: `Upload ảnh thất bại: ${errorData}`,
        })
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="rounded-2xl">
        <Image
          src={`${API_URL}/products/images/${images[0]?.imageUrl}`}
          width={200}
          height={200}
          alt="Image"
          onClick={() => setIsOpen(true)} // Mở dialog khi click vào ảnh
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Images (ID: {images[0]?.id})</DialogTitle>
          <DialogDescription key={images[0]?.id} />
          <div className="w-full">
            <Image
              src={`${API_URL}/products/images/${images[0]?.imageUrl}`}
              width={200}
              height={200}
              alt="Image"
              className="w-full"
            />
          </div>
          <div>
            <h1 className="mt-3 text-center font-semibold">
              Chọn ảnh thay thế
            </h1>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
              <Input name="file" type="file" onChange={handleFileChange} />
              <Button type="submit" className="btn btn-primary mt-2">
                Upload Image
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
