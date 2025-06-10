import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addProduct, fetchProducts, setError, setProductFetch } from "../feature/userSlice";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";

export function Dashboard() {
    // const { loading, data, error } = useFetch()
    const { status, user, error, products, productsFetched } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const modalClsBtnRef = useRef()

    const [newProducData, setNewProductData] = useState({
        title: "", //string
        description: "", //string
        price: "", //number
        discountPercentage: "", //number
        rating: "", //number
        stock: "", //number
        brand: "", //string
        category: "" //string
        // thumbnail(string - URL)
        // images(array of strings - URLs)
    })

    function changeHandler(e) {
        const { name, value } = e.target

        setNewProductData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (productsFetched) {
            console.log('Fetching products...');
            dispatch(fetchProducts())
        }

        if (products?.length !== 0) {
            dispatch(setError())
        }

        if (status === "success") {
            modalClsBtnRef.current.click()
        }
    }, [productsFetched, status])

    async function addNewProductHandler() {
        const normalizedData = {
            ...newProducData,
            rating: Number(newProducData.rating),
            discountPercentage: Number(newProducData.discountPercentage),
            price: Number(newProducData.price),
            stock: Number(newProducData.stock),
            thumbnail: `https://placehold.co/800x600?text=${newProducData.title}`,
            images: [`https://placehold.co/800x600?text=${newProducData.title}`],
        }
        try {
            const res = await dispatch(addProduct(normalizedData)).unwrap()
            toast.success("Product added successfully")
        } catch (error) {
            console.log("Product add:", error);
            const errorMessage = error?.message || "Unable to add product. Please try again.";
            toast.error(errorMessage);
        }
    }


    return (
        <>
            <section className="container mt-4">
                <div className="border d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mx-auto">Product List</h2>
                    {/* <button className="btn btn-sm btn-warning fw-semibold">Add Product</button> */}
                </div>
            </section>
            <section className="container">
                {status === "loading" && <div className="text-center my-auto py-5">Loading...</div>}
                {error && <div className="text-danger text-center">{error.message}</div>}

                {status !== "loading" && !error && products?.length > 0 && (
                    <div>
                        <p
                            className="btn btn-sm btn-warning fw-semibold float-end mx-3"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                        >
                            Add Product

                        </p>
                        <div className="row w-100 mx-auto">
                            {products.map((product) => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <Link to={`/product-details/${product.id}`} className="text-decoration-none">
                                            <img src={product.thumbnail}
                                                alt={`${product.title} image`}
                                                className="card-img-top img-fluid"
                                                style={{ height: "200px", objectFit: "contain" }}
                                            />
                                        </Link>
                                        <div className="card-body border-top">
                                            <h5 className="card-title hoverable-title">
                                                <Link to={`/product-details/${product.id}`} className="text-decoration-none">
                                                    {product.title}
                                                </Link>
                                            </h5>
                                            <p className="card-text">{product.description}</p>
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                                <div className="d-flex align-items-center gap-2">
                                                    <StarRatings
                                                        rating={product?.rating}
                                                        starDimension="12px"
                                                        starSpacing="4px"

                                                        starRatedColor="#8b5826"
                                                    />
                                                    <div className="" style={{ fontSize: "15px" }}>{product?.rating}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/*new product modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        required
                                        name="title"
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="col-form-label">Price:</label>
                                    <input
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        required
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discountPercentage" className="col-form-label">Discount percentage:</label>
                                    <input
                                        className="form-control"
                                        id="discountPercentage"
                                        required
                                        name="discountPercentage"
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="col-form-label">Rating:</label>
                                    <input
                                        className="form-control"
                                        id="rating"
                                        name="rating"
                                        required
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stock" className="col-form-label">Stock:</label>
                                    <input
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        required
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="col-form-label">Brand:</label>
                                    <input
                                        className="form-control"
                                        id="brand"
                                        name="brand"
                                        required
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="col-form-label">Category:</label>
                                    <input
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        required
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Description:</label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        required
                                        name="description"
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                data-bs-dismiss="modal"
                                ref={modalClsBtnRef}
                            >
                                Cancel

                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={addNewProductHandler}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}