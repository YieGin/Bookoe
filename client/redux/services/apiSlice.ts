import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ 
    baseUrl: `https://bookoegin-d820f894692b.herokuapp.com/api`,
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    { url: '/jwt/refresh/', method: 'POST' },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    api.dispatch(setAuth());
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (reviewData) => ({
                url: '/ecommerce/reviews/create/',
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: ['Reviews'],
        }),
        getProductReviews: builder.query({
            query: (productId) => `/ecommerce/products/${productId}/reviews/`,
            providesTags: (result, error, productId) => [{ type: 'Reviews', id: productId }],
        }),
    }),
});
// Export hooks for queries/mutations
export const { 
    useCreateReviewMutation,
    useGetProductReviewsQuery
} = apiSlice;
