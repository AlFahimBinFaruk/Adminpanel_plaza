import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const order_api = createApi({
    reducerPath: 'order_api',
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
    endpoints: (builder) => ({





        getOrderList: builder.query({
            query: () => '/order/all'
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/order/details/${id}`
            })
        }),

       

        updateOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/order/update/${id}`,
                method: "PUT",
                body: data
            })
        }),

        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/delete/${id}`,
                method: "DELETE"
            })
        })
    }),
});

export const {

    useGetOrderListQuery,
    useGetOrderDetailsQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation

} = order_api;