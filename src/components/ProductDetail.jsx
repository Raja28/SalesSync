import {  useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { BsBookmarkStar } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosDoneAll } from "react-icons/io";
import { UpdateDeleteBtn } from "./UpdateDeleteBtn";
import { ProductReview } from "./ProductReview";

export function ProductDetail() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { products, status } = useSelector((state) => state.user)
    const { productId } = useParams()

    useEffect(() => {
        setSelectedProduct(products.find(product => product.id === Number(productId)))
    }, [productId, products])

    return (
        <div className="container mt-4">
            {
                selectedProduct && <div>
                    <div className="d-flex gap-3 flex-md-nowrap flex-wrap">
                        <div className="w-100 border  rounded-4" style={{ maxHeight: "30rem" }}>
                            <img src={selectedProduct.images[0]} alt=""
                                className="w-100 h-100 object-fit-contain img-fluid rounded-4"
                            />
                        </div>
                        <div className="w-100 border rounded-4 p-4">
                            <div>
                                <h3 className="">{selectedProduct?.brand?.split("").join(" ")}</h3>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="">
                                        <StarRatings
                                            rating={selectedProduct?.rating}
                                            starDimension="15px"
                                            starSpacing="4px"
                                            starRatedColor="#dfa71d"
                                        // starRatedColor="#8b5826"
                                        />
                                        <p className="my-2"></p>
                                    </div>
                                    <span className="fw-semibold" style={{}}>{selectedProduct?.rating}</span>
                                </div>

                                <div className="mt-3">
                                    <h3 className="" style={{ fontSize: "2.5rem" }}>{selectedProduct.title}</h3>
                                    <p className="text-secondary fw-semibold">Category: {selectedProduct.category}</p>
                                    <p className="" style={{ fontSize: "2rem" }}> ${selectedProduct.price}
                                        <sup className="mx-2 text-danger">(-{selectedProduct.discountPercentage}%)</sup>
                                    </p>
                                </div>
                                {/* <hr /> */}
                                <div>
                                    <p className="fw-semibold">
                                        {
                                            selectedProduct.description || "No description"
                                        }
                                    </p>
                                </div>

                                <div className="">
                                    <div className="mb-2 d-flex align-items-center gap-3 fw-semibold">
                                        <span>< BsBookmarkStar /></span>
                                        <span>{selectedProduct.warrantyInformation || "No warranty information"}</span>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center gap-3 fw-semibold">
                                        <span><LiaShippingFastSolid /></span>
                                        <span>{selectedProduct.shippingInformation || "No shipping information"}</span>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center gap-3 fw-semibold">
                                        <span>< IoIosDoneAll style={{scale: "1.5"}} /></span>
                                        <span>{selectedProduct.availabilityStatus || "No availability status"}</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="px-2 my-2 ">
                        <UpdateDeleteBtn selectedProduct={selectedProduct} />
                    </div>
                    <ProductReview reviews={selectedProduct?.reviews || []} />
                </div>
            }
        </div>
    );
}