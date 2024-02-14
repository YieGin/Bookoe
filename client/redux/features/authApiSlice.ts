import { apiSlice } from "../services/apiSlice";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
}

interface SocialAuthArgs {
    provider: string;
    state: string;
    code: string;
}

interface CreateUserResponse {
    success: boolean;
    user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUser: builder.query<User, void>({
            query: () => '/users/me/'
        }),
        
        socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
            query: ({ provider, state, code }) => ({
              url: `/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // This might need to be 'application/x-www-form-urlencoded'
                'Accept': 'application/json',
              },
              body: JSON.stringify({ state, code }), // This might need to be URL-encoded instead of JSON
            })
          }),          

        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: { email, password }
            })
        }),

        register: builder.mutation({
            query: ({ first_name, last_name, email, password, re_password }) => ({
                url: '/users/',
                method: 'POST',
                body: { first_name, last_name, email, password, re_password }
            })
        }),

        verify: builder.mutation({
            query: () => ({
                url: '/jwt/verify/',
                method: 'POST',
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
            })
        }),

        activation: builder.mutation({
            query: ({ uid, token }) => ({
                url: '/users/activation/',
                method: 'POST',
                body: { uid, token }
            })
        }),

        resetPassword: builder.mutation({
            query: ( email ) => ({
                url: '/users/reset_password/',
                method: 'POST',
                body: { email }
            })
        }),

        resetPasswordConfirm: builder.mutation({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: '/users/reset_password_confirm/',
                method: 'POST',
                body: { uid, token, new_password, re_new_password }
            })
        }),

        updateUser: builder.mutation({
            query: ({ id, ...patchData }) => ({
                url: `/users/${id}/`,
                method: 'PATCH',
                body: patchData,
                credentials: 'include',
            }),
        }),

    })
})

export const { 
    useRetrieveUserQuery,
    useSocialAuthenticateMutation,
    useLoginMutation,
    useRegisterMutation,
    useVerifyMutation,
    useLogoutMutation,
    useActivationMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation,
    useUpdateUserMutation,
} = authApiSlice