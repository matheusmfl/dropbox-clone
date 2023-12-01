'use client'
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import toast from "react-hot-toast"

function DropzoneComponent() {

  const [loading, setLoading] = useState(false)
  const { user } = useUser()


  function onDrop(acceptedFiles: File[]) {

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('Leitura do arquivo foi abortado')
      reader.onerror = () => console.log('Leitura do arquivo deu erro')
      reader.onload = async () => {
        await uploadPost(file);
      }
      reader.readAsArrayBuffer(file);
    })
  }

  async function uploadPost(selectedFile: File) {
    if (loading) {
      return;
    }

    if (!user) {
      return
    }


    setLoading(true)

    const toastId = toast.loading('Carregando ...')

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)


    await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef)

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl: downloadUrl
      })

    }
    )

    toast.success("Upload concluído!", {
      id: toastId
    })
    setLoading(false)


  }

  const maxSize = 20971520;


  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, fileRejections, isDragReject }) => {
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className='m-4 '>
            <div {...getRootProps()} className={cn(" cursor-pointer w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
              isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400")}>
              <input {...getInputProps()} />
              {!isDragActive && 'Clique aqui ou arraste um arquivo para fazer upload!'}
              {isDragActive && !isDragReject && 'Solte para subir o arquivo!'}
              {isDragReject && 'Tipo de arquivo não suportado, sorry!'}
              {isFileTooLarge && (
                <div className='text-danger mt-2'>
                  Arquivo muito grande
                </div>
              )}
            </div>
          </section>
        )
      }}
    </Dropzone>
  )
}

export default DropzoneComponent