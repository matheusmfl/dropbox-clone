import Link from "next/link";
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-xl md:text-5xl font-bold">
            Bem vindo ao Dropbox. <br /> <br />
            Colabore com segurança em seu conteúdo a qualquer hora, de qualquer lugar
          </h1>

          <p className="pb-20">
            Com o Dropbox, você obtém um pacote completo de ferramentas projetadas para ajudar você a criar, compartilhar, gerenciar e acompanhar conteúdo com mais eficiência. Além disso, armazenamento em nuvem comprovado que você pode confiar.
          </p>

          <Link href={'/dashboard'} className="flex cursor-pointer bg-blue-500 p-5 w-fit">
            Comece agora!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay muted className="rounded-lg">
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4" />
            Your Browser does not support the video tag
          </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Atenção</p>
      <p className="text-center font-light p-2">
        Esse projeto foi feito apenas como propósito de estudo, Nós não queremos comercializar utilizando o nome
        da empresa Dropdown, este projeto não possui intenção de ser usado em escala. <br />
        Esse clone foi desenvolvido por Matheus Fonteles - DEV Fullstack e Jaderson Cavalcante - UX/UI Designer <br />
        Foi utilizado Tecnologias como Firebase, Firestore, NextJS 14, ShadCn, Drag and drop, Clerk, Figma, Photoshop e etc. <br />
      </p>
    </main>
  )
}
