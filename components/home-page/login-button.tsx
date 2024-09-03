import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LoginButton() {
    return (
        <Link
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            href="/login"
        >
            <span>Log in </span>
            <ArrowLeftEndOnRectangleIcon className="w-5 md:w-6" />
        </Link>
    );
}
