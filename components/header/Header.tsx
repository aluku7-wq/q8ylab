"use client";
import { useLocale } from "next-intl";
import { ChangeEvent, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import { GrLanguage } from "react-icons/gr";

const Header = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();

    const localActive = useLocale();
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;

        // Create a regex to replace only the locale part of the path
        const updatedPath = pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`);

        startTransition(() => {
            router.push(updatedPath);
        });
    };

    const data = {
        search: localActive === "ar" ? "يبحث" : "Search",
        account: localActive === "ar" ? "حساب" : "Account",
        cart: localActive === "ar" ? "عربة" : "Cart",
    };

    useEffect(() => {
        console.log("Locale:", localActive);
    }, [localActive]);
    return (
        <div
            className={`flex w-full justify-center bg-white fixed h-fit  border-b-[0.01rem] border-b-[#b0b0b065]`}
        >
            <div className="flex px-4 md:px-6 lg:container justify-between gap-2 md:gap-8 w-full py-2">
                <div className="flex w-12 py-2">
                    <Image src={logo} alt="" className="w-full" />
                </div>

                <div className="flex w-full justify-end items-center gap-8 text-sm">
                    <p className="hidden lg:flex">{data.search}</p>
                    <p className="hidden lg:flex">{data.account}</p>
                    <p>{data.cart}(0)</p>
                </div>
                <div className="flex items-center gap-2">
                    <GrLanguage />
                    <select
                        onChange={onSelectChange}
                        defaultValue={localActive}
                        disabled={isPending}
                        className="h-fit border outline-none p-1"
                    >
                        <option value="en" className="">
                            english
                        </option>
                        <option value="ar">عربي</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Header;
