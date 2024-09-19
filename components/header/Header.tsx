"use client";
import { useLocale } from "next-intl";
import { ChangeEvent, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import { GrLanguage } from "react-icons/gr";
import SideBar from "../sidebar/SideBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoMenuSharp } from "react-icons/io5";
import { setsidebarStatus } from "@/redux/slices/public/publicSlice";
import { Link } from "@/i18n/routing";

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
        Store: localActive === "ar" ? "محل" : "Store",
        search: localActive === "ar" ? "يبحث" : "Search",
        account: localActive === "ar" ? "حساب" : "Account",
        cart: localActive === "ar" ? "عربة" : "Cart",
    };

    // redux  states
    const dispatch = useAppDispatch();
    const sidebarState = useAppSelector(
        (state) => state.publicStates.sidebarStatus
    );
    const cartSate = useAppSelector((state) => state.cartStates.cart);
    // calculate items number
    const totaLIetms = cartSate.reduce((accumulater, item) => {
        return accumulater + item.quantity;
    }, 0);
    useEffect(() => {
        console.log(cartSate);
    }, [cartSate]);

    return (
        <>
            {sidebarState === "show" && <SideBar />}
            <div
                className={`flex w-full justify-center bg-white fixed h-fit  border-b-[0.01rem] border-b-[#b0b0b065]`}
            >
                <div className="flex px-4 md:px-6 lg:container justify-between gap-2 md:gap-8 w-full py-2">
                    <Link href={"/"} className="flex w-fit py-2">
                        <Image src={logo} alt="" className="l w-12" />
                    </Link>

                    <div className="flex w-full justify-end items-center gap-8 text-sm">
                        <p className="hidden lg:flex cursor-pointer">
                            {data.Store}
                        </p>
                        <p className="hidden lg:flex cursor-pointer">
                            {data.search}
                        </p>
                        <p className="hidden lg:flex cursor-pointer">
                            {data.account}
                        </p>
                        <Link href={"/cart"} className=" flex cursor-pointer">
                            {data.cart}({totaLIetms})
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <GrLanguage />
                        <select
                            onChange={onSelectChange}
                            defaultValue={localActive}
                            disabled={isPending}
                            className="h-fit border outline-none p-1 rounded-md"
                        >
                            <option value="en" className=" cursor-pointer">
                                english
                            </option>
                            <option value="ar" className=" cursor-pointer">
                                عربي
                            </option>
                        </select>
                        <IoMenuSharp
                            className="text-4xl text-gray-800  lg:hidden cursor-pointer"
                            onClick={() => dispatch(setsidebarStatus("show"))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
