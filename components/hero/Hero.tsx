"use client";
import React from "react";
import Image1 from "@/assets/images/image1.png";
import Image from "next/image";
import { useLocale } from "next-intl";
const Hero = () => {
    const english = {
        h1: "Shop for Top Brands Online and In store",
        button: "Shop now",
    };
    const arabic = {
        h1: "تسوق لأفضل العلامات التجارية عبر الإنترنت وفي المتجر",
        button: "تسوق الآن",
    };

    const localActive = useLocale();
    const text = localActive === "ar" ? arabic : english;
    return (
        <div className="w-full flex justify-center  bg-[#f9fafb] border-b-[0.01rem] border-b-[#b0b0b065] pt-[10rem] ">
            <div className="w-full  flex p-4 md:p-6 lg:container  items-center  gap-10  flex-col-reverse lg:flex-row">
                <div className="flex flex-col gap-8 items-center lg:items-start py-10">
                    <h2 className="text-2xl text-center lg:text-left md:text-3xl font-semibold text-gray-700">
                        {text.h1}
                    </h2>
                    <button className="outline-none bg-black text-white rounded-md w-[20rem] p-4">
                        {text.button}
                    </button>
                </div>
                <div className="flex justify-center w-full">
                    <Image
                        src={Image1}
                        alt=""
                        className="w-[15rem] md:w-[25rem]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
