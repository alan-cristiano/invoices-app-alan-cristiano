import { lusitana } from "@/fonts";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

export default function AppLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <ChartBarSquareIcon className="h-12 w-12" />
            <p className="text-[44px] ">App</p>
        </div>
    );
}
