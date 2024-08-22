import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


export const user_api = createApi({
    reducerPath: 'user_api',
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
    tagTypes: ["User"],
    endpoints: (builder) => ({



        loginUser: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        logoutUser: builder.query({
            query: () => ({
                url: ""
            }),
            invalidatesTags: ["User"]
        }),

        getUserList: builder.query({
            query: (page) => `/user/all?page=${page}`,
            providesTags: ["User"]
        }),

        
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/user/details/${id}`
            }),
            providesTags: ["User"]
        }),

        getMyProfile: builder.query({
            query: () => ({
                url: "/user/my-profile"
            }),
            providesTags: ["User"]

        }),



        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/user/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        })
    }),
});

export const {
    useLoginUserMutation,
    useLogoutUserQuery,
    useGetMyProfileQuery,
    useGetUserListQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useDeleteUserMutation

} = user_api;