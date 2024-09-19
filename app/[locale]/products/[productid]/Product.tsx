"use client";
import React from "react";
import { data } from "@/assets/data";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { IoAddSharp } from "react-icons/io5";
import Card from "@/components/card/Card";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cart/cartSlice";

const Product = ({ id }: { id: string }) => {
    // redux
    const dispatch = useAppDispatch();
    const localActive = useLocale();
    const product = data.find(
        (item: {
            enName: string;
            image: string;
            enPrice: string;
            enNetPrice: string;
            arName: string;
            arPrice: string;
            arNetPrice: string;
            id: string;
        }) => item.id === id
    );
    if (!product) {
        return notFound();
    }
    const relatedProducts = data.filter(
        (item: {
            enName: string;
            image: string;
            enPrice: string;
            enNetPrice: string;
            arName: string;
            arPrice: string;
            arNetPrice: string;
            id: string;
            enCategory: string;
        }) => item.enCategory === product?.enCategory && item.id !== product.id
    );

    const item = {
        title: localActive === "ar" ? product.arName : product.enName,
        image: product.image,
        netPrice:
            localActive === "ar" ? product.arNetPrice : product.enNetPrice,
        price: localActive === "ar" ? product.arPrice : product.enPrice,
        id: product.id,
        category:
            localActive === "ar" ? product.arCategory : product.enCategory,
        description:
            localActive === "ar" ? product.arDescription : product.enDescrition,
    };
    const currency = localActive === "ar" ? "ك" : "KWD";
    const infor =
        localActive === "ar" ? "معلومات المنتج" : "Product Information";
    const returns =
        localActive === "ar" ? "الشحن والإرجاع" : "Shipping & Returns";
    const color = localActive === "ar" ? "حدد اللون" : "Select Color";
    const black = localActive === "ar" ? "أسود" : "Black";
    const white = localActive === "ar" ? "أبيض" : "White";
    const cart = localActive === "ar" ? "أضف إلى السلة" : "Add to cart";
    const relatedTitle =
        localActive === "ar" ? "المنتجات ذات الصلة" : "Related Products";
    const relatedDesc =
        localActive === "ar"
            ? "قد ترغب أيضًا في التحقق من هذه المنتجات"
            : "You might also want to check out these products";

    return (
        <div className="flex w-full flex-col items-center text-gray-700 pt-16 lg:pt-32">
            <div className="flex p-4 md:p-6 lg:container gap-16 flex-col lg:flex-row">
                <div className="flex flex-col gap-4 w-full lg:w-[80%] lg:pr-8 pt-[8%]">
                    <p className="text-gray-500 text-sm">{item?.category}</p>
                    <h3 className="text-3xl font-semibold">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                    <div className="flex flex-col">
                        <div className="flex justify-between border-y-[1px] border-y-[#b0b0b065] items-center py-4">
                            <p>{infor}</p>
                            <IoAddSharp className="text-xl" />
                        </div>
                        <div className="flex justify-between border-b-[1px] border-b-[#b0b0b065] items-center py-4">
                            <p>{returns}</p>
                            <IoAddSharp className="text-xl" />
                        </div>
                    </div>
                </div>
                <div className="flex bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065] rounded-md w-ful lg:w-[140%]">
                    <Image
                        src={`/images/${item.image}`}
                        alt=""
                        width={800}
                        height={800}
                        className="w-[40rem]"
                    />
                </div>
                <div className="flex w-full  lg:w-[80%] flex-col mt-[7%] gap-2 ">
                    <p>{color}</p>
                    <div className="flex border-b-[0.01rem] border-b-[#b0b0b065] py-4 gap-2">
                        <button className="flex bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065] rounded-md w-full lg:w[8rem] justify-center py-2">
                            {black}
                        </button>
                        <button className="flex bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065] rounded-md w-full lg:w[8rem] justify-center py-2">
                            {white}
                        </button>
                    </div>
                    <div className="flex flex-col  gap-4 w-full">
                        <h1 className="font-semibold text-2xl">
                            {currency}
                            {item.netPrice}
                        </h1>
                        <button
                            className="w-full lg:w-10rem py-3 bg-black text-white rounded-md"
                            onClick={() =>
                                dispatch(addToCart({ ...product, quantity: 1 }))
                            }
                        >
                            {cart}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex p-4 md:p-6 lg:container  flex-col gap-8 py-10 ">
                <div className="flex justify-center">
                    <p>{relatedTitle}</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-3xl ">{relatedDesc}</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pb-16">
                    {relatedProducts.map(
                        (
                            item: {
                                enName: string;
                                image: string;
                                enPrice: string;
                                enNetPrice: string;
                                arName: string;
                                arPrice: string;
                                arNetPrice: string;
                                id: string;
                                enCategory: string;
                            },
                            index: number
                        ) => {
                            return <Card data={item} key={index} />;
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
