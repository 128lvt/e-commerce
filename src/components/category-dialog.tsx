import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Category } from 'types/Type'
import { CategoryForm } from './form-category'

interface IProps {
  isOpen: boolean
  category: Category
  onClose: () => void
}

export default function CategoryDialog(prop: IProps) {
  return (
    <Dialog open={prop.isOpen} onOpenChange={(open) => !open && prop.onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category (ID: {prop.category?.id})</DialogTitle>
          <div>
            <CategoryForm onClose={prop.onClose} category={prop.category} />
          </div>
          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
