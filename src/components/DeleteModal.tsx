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
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"


export function DeleteModal() {

  const { user } = useUser()

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) =>
    [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId

    ])


  async function deleteFile() {
    if (!user || !fileId) return

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

    try {
      deleteObject(fileRef).then(async () => {

        deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
          console.log("deleted")
        })
      }).finally(() => {
        setIsDeleteModalOpen(false)
      })
    }
    catch (err) {
      console.log(err)
      setIsDeleteModalOpen(false)
    }

    setIsDeleteModalOpen(false)

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

          <Button type="submit" size={'sm'} className="px-3 flex-1" variant={"destructive"} onClick={() => deleteFile()}>
            <span className="sr-only">
              Deletar
            </span>
            <span>
              Deletar
            </span>
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
