import AppLogo from "@/components/app-logo";
import LoginButton from "@/components/home-page/login-button";
import { lusitana } from "@/fonts";
import Image from "next/image";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <AppLogo />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <p
                        className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
                    >
                        <strong>Seja bem vindo</strong> ao InvApp - seu App para
                        gerenciamento de Invoices
                    </p>
                    <LoginButton />
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    <Image
                        src="/home-image.jpg"
                        width={800}
                        height={760}
                        alt="Imagem de gráficos e tabelas"
                        className="block rounded-lg"
                    />
                </div>
            </div>
        </main>
    );
}
