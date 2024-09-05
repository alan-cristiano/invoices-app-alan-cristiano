import { lusitana } from "@/fonts";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

export default function AppLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-col items-start leading-none text-white`}
        >
            <ChartBarSquareIcon className="md:block hidden h-12 w-12" />
            <p className="text-[44px] ">InvApp</p>
        </div>
    );
}
