import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const product_api = createApi({
    reducerPath: 'product_api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {


            const token = localStorage.getItem("token");
            // getState().auth.token ||
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");

            return headers;
        }
    }),
    tagTypes:["Product"],
    endpoints: (builder) => ({





        getProductList: builder.query({
            query: (page) => `/product/all?page${page}`,
            providesTags:["Product"]
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/product/details/${id}`
            }),
            providesTags:["Product"]
        }),

        addNewProduct: builder.mutation({
            query: (data) => ({
                url: "product/add-new",
                method: "POST",
                body: data
            }),
            invalidatesTags:["Product"]
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/product/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags:["Product"]
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["Product"]
        })
    }),
});

export const {

    useGetProductListQuery,
    useGetProductDetailsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation

} = product_api;