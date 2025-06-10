import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProduct, updateProduct,  } from "../feature/userSlice"
import toast from "react-hot-toast"
import { use, useEffect, useRef, useState } from "react"

export function UpdateDeleteBtn({ selectedProduct }) {
    const { status, products } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [newUpdateData, setNewUpdateData] = useState({
        title: selectedProduct.title, //string
        description: selectedProduct.description, //string
        price: selectedProduct.price, //number
        discountPercentage: selectedProduct.discountPercentage, //number
        rating: selectedProduct.rating, //number
        stock: selectedProduct.stock, //number
        brand: selectedProduct.brand, //string
        category: selectedProduct.category //string
        // thumbnail(string - URL)
        // images(array of strings - URLs)
    })
    const modalClsBtnRef = useRef()

    useEffect(() => {
        if (status === "success") {
            modalClsBtnRef.current.click()
        }
    }, [status])

    async function deleteProductHandler(productId) {
        try {
            const res = await dispatch(deleteProduct(productId)).unwrap()
            console.log(res);

            if (res.isDeleted) {
                toast.success("Product deleted successfully")
                navigate("/dashboard")
            }
        } catch (error) {
            console.error("Product delete:", error);
            const errorMessage = error?.message || "Unable to delete product. Please try again.";
            toast.error(errorMessage);
        }
    }

    function changeHandler(e) {
        const { name, value } = e.target

        setNewUpdateData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function updateProductHandler() {
        const updatedData = {
            id: selectedProduct.id,
            title: newUpdateData.title,
            description: newUpdateData.description,
            category: newUpdateData.category,
            brand: newUpdateData.brand,
            rating: Number(newUpdateData.rating),
            discountPercentage: Number(newUpdateData.discountPercentage),
            price: Number(newUpdateData.price),
            stock: Number(newUpdateData.stock),
            // thumbnail: `https://placehold.co/800x600?text=${newUpdateData.title}`,
            // images: [`https://placehold.co/800x600?text=${newUpdateData.title}`],
        }
        try {
            const res = await dispatch(updateProduct(updatedData)).unwrap()
            cons
            toast.success("Product updated successfully")
            modalClsBtnRef.current.click()
        } catch (error) {
            console.log("Product updated:", error);
            const errorMessage = error?.message || "Unable to updated product. Please try again.";
            toast.error(errorMessage);
        }
    }





    return (
        <>
            <section className="my-4 d-flex  justify-content-between gap-4 flex-sm-nowrap flex-wrap">
                <div className="w-100 d-flex gap-3 px-4">
                    <button
                        disabled={status === "loading"}
                        className="btn btn-warning w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo"
                    >
                        Update
                    </button>
                    <button
                        disabled={status === "loading"}
                        onClick={() => deleteProductHandler(selectedProduct.id)}
                        className="btn btn-danger w-100">
                        Delete
                    </button>
                </div>
                <div className="w-100">
                    {/* <hr className="m-0" /> */}
                    <p className="text-center fw-semibold">{selectedProduct.returnPolicy || "No return policy"}</p>
                </div>
            </section>

            {/*new product modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update product</h1>
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
                                        value={newUpdateData.title}
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
                                        value={newUpdateData.price}
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
                                        min="0"
                                        max="100"
                                        required
                                        value={newUpdateData.discountPercentage}
                                        name="discountPercentage"
                                        onChange={changeHandler}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="col-form-label">Rating:</label>
                                    <input
                                        className="form-control"
                                        min="0"
                                        max="5"
                                        id="rating"
                                        name="rating"
                                        required
                                        value={newUpdateData.rating}
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
                                        value={newUpdateData.stock}
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
                                        value={newUpdateData.brand}
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
                                        value={newUpdateData.category}
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
                                        value={newUpdateData.description}
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
                                onClick={updateProductHandler}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}