'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"


export function DeleteModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) =>
    [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId

    ])


  async function deleteFile() {

  }
  return (
    <Dialog
      open={isDeleteModalOpen as any}
      onOpenChange={(isOpen) => {

        setIsDeleteModalOpen(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Você tem certeza que deseja deletar?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">

          <Button size={'sm'} className="px-3 flex-1" variant={'ghost'} onClick={() => setIsDeleteModalOpen(false)}>
            <span className="sr-only">
              Cancelar
            </span>
            <span>
              Cancelar
            </span>
          </Button>

          <Button type="submit" size={'sm'} className="px-3 flex-1" onClick={() => deleteFile()}>
            <span className="sr-only">
              Deletar
            </span>
            <span>
              Deletar
            </span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
