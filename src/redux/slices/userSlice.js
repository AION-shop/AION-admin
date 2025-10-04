import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducer: {
        login: (state, actions) => {
            state.user = actions.payload?.user
            state.token = actions.payload?.token
            state.isAuth = true
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuth = false
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer