import React from "react";
import Product from "./Product";

const page = ({ params }: { params: { productid: string } }) => {
    return <Product id={params.productid} />;
};

export default page;
