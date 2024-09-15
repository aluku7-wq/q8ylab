"use client";
import React, { useEffect, useState } from "react";
import { data } from "@/assets/data";
import Card from "@/components/card/Card";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

const Catergory = ({ category }: { category: string }) => {
    const [cat, setcat] = useState("");
    useEffect(() => {
        if (category === "Latest-Drops") {
            setcat("Latest Drops");
        }
        if (category === "Sale") {
            setcat("Sale");
        }
        if (category === "Weekly-picks") {
            setcat("Weekly Picks");
        }
    }, []);
    const latestDrops = data.filter(
        (item: any) => item.enCategory === "Latest Drops"
    );
    const localActive = useLocale();
    const sale = localActive === "ar" ? "أُوكَازيُون" : "Sale";
    const LatestDrops = localActive === "ar" ? "أحدث القطرات" : "Latest Drops";
    const weeklyTitle =
        localActive === "ar" ? "اللقطات الأسبوعية" : "Weekly Picks";

    const title =
        cat === "Latest Drops"
            ? LatestDrops
            : cat === "Sale"
            ? sale
            : weeklyTitle;

    return (
        <div className="flex flex-col items-center pt-[10rem] text-gray-700">
            <div className="flex p-4 md:p-6 lg:container flex-col gap-8">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {latestDrops.map((item: any, index: number) => {
                        return <Card data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Catergory;
