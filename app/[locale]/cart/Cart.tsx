"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "@/redux/slices/cart/cartSlice";

const Cart = () => {
    const dispatch = useAppDispatch();
    const CartState = useAppSelector((state) => state.cartStates.cart);
    const localActive = useLocale();
    const currency = localActive === "ar" ? "ك" : "KWD";

    // calculate cart total cost
    const totaLcost = CartState.reduce((accumulater, item) => {
        return accumulater + parseInt(item.enNetPrice) * item.quantity;
    }, 0);

    return (
        <div className="flex justify-center text-gray-800 w-full  ">
            <div className="flex p-6 lg:container pt-[10rem] justify-between flex-col lg:flex-row w-full">
                <div className="flex w-full lg:w-2/3 flex-col ">
                    {/* sign in section */}
                    <div className="flex w-full justify-between border-b-[0.01rem] border-b-[#b0b0b065] items-center flex-col lg:flex-row ">
                        <div className="flex flex-col gap-3 py-6">
                            <h3 className="font-semibold text-lg">
                                Already have an account?
                            </h3>
                            <p className="text-sm">
                                Sign in for a better experience.
                            </p>
                        </div>
                        <button className="bg-[#f9fafb] border-[0.01rem] border-[#b0b0b065] rounded-md p-2 h-fit w-full lg:w-fit">
                            Sign in
                        </button>
                    </div>

                    {/* cart section */}
                    <div className="flex flex-col gap-6 py-6">
                        <h3 className="text-3xl font-semibold">Cart</h3>
                        <div className="flex flex-col gap-6 ">
                            <div className="flex pb-4 font-bold border-b-[0.01rem] border-b-[#b0b0b065]">
                                <div className="flex w-[40%]">
                                    <p>Item</p>
                                </div>
                                <div className="flex  w-[35%]">
                                    <p>Quantity</p>
                                </div>
                                <div className="hidden lg:flex  lg:w-[15%]">
                                    <p> Price</p>
                                </div>
                                <div className="flex w-[20%] lg:w-[10%] justify-end">
                                    <p>Total</p>
                                </div>
                            </div>
                            {CartState.map((item) => {
                                const product = {
                                    quantity: item.quantity,
                                    title:
                                        localActive === "ar"
                                            ? item.arName
                                            : item.enName,
                                    image: item.image,
                                    netPrice:
                                        localActive === "ar"
                                            ? item.arNetPrice
                                            : item.enNetPrice,
                                    price:
                                        localActive === "ar"
                                            ? item.arPrice
                                            : item.enPrice,
                                    id: item.id,
                                    category:
                                        localActive === "ar"
                                            ? item.arCategory
                                            : item.enCategory,
                                    description:
                                        localActive === "ar"
                                            ? item.arDescription
                                            : item.enDescrition,
                                };
                                return (
                                    <div
                                        className="flex pb-4  border-b-[0.01rem] border-b-[#b0b0b065] items-center text-sm"
                                        key={item.id}
                                    >
                                        <div className="flex w-[40%] lg:items-center gap-2 text-textColor flex-col md:flex-row">
                                            <div className="flex bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065] rounded-md w-[5rem] h-[5rem] items-center justify-center ">
                                                <Image
                                                    src={`/images/${item.image}`}
                                                    alt=""
                                                    width={800}
                                                    height={800}
                                                    className="h-fit"
                                                />
                                            </div>{" "}
                                            <p className="w-[80%]">
                                                {product.title}
                                            </p>
                                        </div>
                                        <div className="flex w-[35%] items-center gap-4">
                                            <RiDeleteBin6Line
                                                className="text-2xl cursor-pointer"
                                                onClick={() =>
                                                    dispatch(
                                                        removeFromCart(item)
                                                    )
                                                }
                                            />
                                            <div className="flex items-center">
                                                <p>{product.quantity}</p>
                                                <div className="flex flex-col gap-2">
                                                    <div
                                                        className="flex w-6 h-6 rounded-full items-center justify-center text-sm  bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065]  cursor-pointer"
                                                        onClick={() =>
                                                            dispatch(
                                                                increaseQuantity(
                                                                    item
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <MdAdd />
                                                    </div>
                                                    <div
                                                        className="flex w-6 h-6 rounded-full items-center justify-center text-sm  bg-[#f9fafb] border-[0.01rem] border-b-[#b0b0b065]  cursor-pointer"
                                                        onClick={() => {
                                                            if (
                                                                product.quantity >
                                                                1
                                                            ) {
                                                                dispatch(
                                                                    decreaseQuantity(
                                                                        item
                                                                    )
                                                                );
                                                            } else {
                                                                dispatch(
                                                                    removeFromCart(
                                                                        item
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <FiMinus />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden lg:flex lg:w-[15%]">
                                            <p className="flex gap-1 text-gray-400">
                                                <span>{currency}.</span>

                                                {product.netPrice}
                                            </p>
                                        </div>
                                        <div className="flex w-[20%] lg:w-[10%] justify-end">
                                            <p className="flex gap-1">
                                                <span>{currency}.</span>
                                                {product.quantity *
                                                    parseInt(item.enNetPrice)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/4 gap-6 flex-col">
                    <h3 className="text-3xl font-semibold">Summary</h3>
                    <div className="flex flex-col border-y-[0.01rem] border-y-[#b0b0b065] py-4 gap-6 text-sm text-gray-400">
                        <div className="flex justify-between ">
                            <p>Subtotal</p>
                            <p className="flex gap-1">
                                <span>{currency}.</span>
                                {totaLcost}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p className="flex gap-1">
                                <span>{currency}.</span>0
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Taxes</p>
                            <p className="flex gap-1">
                                <span>{currency}.</span>0
                            </p>
                        </div>
                    </div>
                    <div className="flex border-b-[0.01rem] border-b-[#b0b0b065] pb-4 gap-6 text-sm text-gray-400">
                        <div className="flex justify-between w-full">
                            <p>Total</p>
                            <p className="text-gray-800 font-semibold text-md flex gap-1">
                                <span>{currency}.</span> {totaLcost}
                            </p>
                        </div>
                    </div>
                    <button className="outline-none bg-black text-white rounded-md w-full p-3">
                        go to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
