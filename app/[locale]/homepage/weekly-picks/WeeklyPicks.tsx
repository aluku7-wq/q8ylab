"use client";
import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { data } from "@/assets/data";
import Card from "@/components/card/Card";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
const WeeklyPick = () => {
    const localActive = useLocale();
    const title = localActive === "ar" ? "اللقطات الأسبوعية" : "Weekly Picks";
    const link = localActive === "ar" ? "عرض الكل" : "View all";
    const latestDrops = data.filter(
        (item: any) => item.enCategory === "Weekly Picks"
    );
    return (
        <div className="flex justify-center w-full text-gray-700">
            <div className="flex flex-col p-4 md:p-6 lg:container gap-6">
                <div className="flex w-full justify-between">
                    <p className="text-lg">{title}</p>
                    <Link
                        href={`/category/Weekly-picks`}
                        className="flex text-blue-500 gap-2"
                    >
                        <p>{link}</p>
                        <LuArrowUpRight className="text-xl" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {latestDrops.map((item: any, index: number) => {
                        return <Card data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeeklyPick;
