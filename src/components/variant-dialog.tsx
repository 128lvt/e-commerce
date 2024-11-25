import { VariantForm } from '@/app/(admin)/admin/san-pham/size-color/[id]/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ProductVariant } from 'types/Type'

interface IProps {
  isOpen: boolean
  variant: ProductVariant
  onClose: () => void
}
export default function VariantDialog(prop: IProps) {
  return (
    <Dialog open={prop.isOpen} onOpenChange={(open) => !open && prop.onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật kích thước, màu sắc</DialogTitle>
          <DialogDescription />
          <VariantForm
            productId={prop?.variant?.p_id}
            variantId={prop?.variant?.id}
            variant={prop?.variant}
            onClose={prop.onClose}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
