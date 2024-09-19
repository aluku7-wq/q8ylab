"use client";
import { Link } from "@/i18n/routing";
import { useAppDispatch } from "@/redux/hooks";
import { setsidebarStatus } from "@/redux/slices/public/publicSlice";
import React from "react";
import { IoClose } from "react-icons/io5";
const SideBar = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="fixed w-full max-w-[30rem] h-full bg-gray-600/80 backdrop-blur-md z-20 p-6 flex-col text-white">
            <div className="flex justify-end w-full">
                <IoClose
                    className="text-2xl cursor-pointer"
                    onClick={() => dispatch(setsidebarStatus("hidden"))}
                />
            </div>
            <div className="flex flex-col text-3xl h-full justify-center gap-6 ">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Store</Link>
                <Link href={"/"}>Search</Link>
                <Link href={"/"}>Account</Link>
                <Link href={"/"}>Cart</Link>
            </div>
        </div>
    );
};

export default SideBar;
