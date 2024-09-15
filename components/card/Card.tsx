import { useLocale } from "next-intl";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const Card = ({
    data,
}: {
    data: {
        enName: string;
        image: string;
        enPrice: string;
        enNetPrice: string;
        arName: string;
        arPrice: string;
        arNetPrice: string;
        id: string;
    };
}) => {
    const localActive = useLocale();
    const item = {
        title: localActive === "ar" ? data.arName : data.enName,
        image: data.image,
        netPrice: localActive === "ar" ? data.arNetPrice : data.enNetPrice,
        price: localActive === "ar" ? data.arPrice : data.enPrice,
        id: data.id,
    };
    const currency = localActive === "ar" ? "ك" : "KWD";

    return (
        <Link href={`/products/${item.id}`} className="flex flex-col gap-4">
            <div className="flex bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065] rounded-md">
                <Image
                    src={`/images/${item.image}`}
                    alt=""
                    width={800}
                    height={800}
                    className="w-[40rem]"
                />
            </div>
            <div className="flex text-sm justify-between ">
                <div className="flex">
                    <p>{item.title}</p>
                </div>
                <div className="flex gap-1 text-gray-400">
                    <p>{currency}.</p>
                    <p>{item.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
