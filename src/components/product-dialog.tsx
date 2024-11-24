import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Product } from 'types/Type'
import { ProductForm } from './form-product'

interface IProps {
  isOpen: boolean
  product: Product
  onClose: () => void
}

export default function ProductDialog(prop: IProps) {
  return (
    <Dialog open={prop.isOpen} onOpenChange={(open) => !open && prop.onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product (ID: {prop.product?.id})</DialogTitle>
          <div>
            <ProductForm onClose={prop.onClose} product={prop.product} />
          </div>
          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
