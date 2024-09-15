"use client";
import React from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
const Footer = () => {
    return (
        <div className="border-t-[0.01rem] border-t-[#b0b0b065]] flex justify-center text-gray-700">
            <div className="flex p-4 md:p-6 lg:container flex-col">
                <div className="flex w-12 py-2">
                    <Image src={logo} alt="" className="w-full" />
                </div>
                <div className="flex justify-center">
                    <p>© 2024 Medusa Store. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
