
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ADD_PRODUCTS_URL, DELETE_PRODUCTS_URL, FETCH_PRODUCTS_URL, LOGIN_URL, UPDATE_PRODUCTS_URL } from "../utils/api";

export const userLogin = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {

            const response = await axios.post(LOGIN_URL, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchProducts = createAsyncThunk("user/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(FETCH_PRODUCTS_URL);
        return response.data.products;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);

export const deleteProduct = createAsyncThunk("user/deleteProduct", async (productId, { rejectWithValue }) => {

    try {
        const res = await axios.delete(DELETE_PRODUCTS_URL + productId);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
}
);

export const updateProduct = createAsyncThunk("user/updateProduct", async (updatedData, { rejectWithValue }) => {

    const url = `${UPDATE_PRODUCTS_URL}${updatedData.id}`;
    try {

        const response = await axios.patch(url, { ...updatedData }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
}
);



export const addProduct = createAsyncThunk("user/addProduct", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(ADD_PRODUCTS_URL, data)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message || "An unknown error occurred")
        }
    }
})


const initialState = {
    user: sessionStorage.getItem("user") !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : null,
    accessToken: sessionStorage.getItem('accessToken') !== 'undefined' ? sessionStorage.getItem('accessToken') : null,
    products: sessionStorage.getItem('products') !== 'undefined' ? JSON.parse(sessionStorage.getItem('products')) : [],
    status: "idle", // idle | loading | success | error,
    error: null,
    productsFetched: true,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProductFetch: (state) => {
            state.productsFetched = !state.productsFetched
        },
        setError: (state) => {
            state.error = null
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        },
        setProducts: (state, { payload }) => {
            state.products = payload
        },
        clearUserSlice: (state,) => {
            state.products = []
            state.user = null
            state.accessToken = null
            state.productsFetched = true

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
                sessionStorage.setItem("user", JSON.stringify(action.payload));
                sessionStorage.setItem("accessToken", action.payload.accessToken);
                state.status = "success";
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                sessionStorage.setItem("products", JSON.stringify(action.payload));
                state.status = "success";
                state.productsFetched = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const filteredProducts = state.products.filter(product => product.id !== action.payload.id)
                state.products = filteredProducts;
                sessionStorage.setItem("products", JSON.stringify(filteredProducts));
                state.status = "success";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                console.log(updatedProduct);

                state.products = state.products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                sessionStorage.setItem("products", JSON.stringify(state.products));
                state.status = "success";
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                const updatedProducts = [action.payload, ...state.products];
                state.products = updatedProducts;
                sessionStorage.setItem("products", JSON.stringify(updatedProducts));
                state.status = "success";
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })

    }
})

export const { setProductFetch, setError, setStatus, setProducts, clearUserSlice } = userSlice.actions

export default userSlice.reducer