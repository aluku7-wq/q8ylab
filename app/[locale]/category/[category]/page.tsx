"use client";
import React from "react";
import Catergory from "./Catergory";

const page = ({ params }: { params: { category: string } }) => {
    console.log("params", params.category);

    return <Catergory category={params.category} />;
};

export default page;
