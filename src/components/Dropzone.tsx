'use client'
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

function DropzoneComponent() {

  const [loading, setLoading] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()


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

    //do what needs to be done...

    setLoading(false)


  }

  const maxSize = 2097152;


  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={acceptedFiles => console.log(acceptedFiles)}>
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