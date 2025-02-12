import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CancelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function CancelDialog({ open, onOpenChange, onConfirm }: CancelDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none w-[320px] p-6 space-y-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl">Deseja cancelar?</DialogTitle>
          <DialogDescription className="text-gray-500">Os dados inseridos não serão salvos</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-20">
            Não
          </Button>
          <Button className="bg-primary hover:bg-primary/90 w-20" onClick={onConfirm}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

