import { PayloadAction, PrepareAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";
import axios from "../axios";
import { Endpoint } from "../enums/Endpoints";
import { FormModel } from "../models/formModel";
import { Storage } from "../enums/Storage";

interface UserSlice {
    user: UserModel | null,
    isLoading: boolean
}

const initialState: UserSlice = {
    user: null,
    isLoading: false
}

export const createUser = createAsyncThunk<UserModel, FormModel>(
    'currentUser/createUser',
    async (form) => {
        const {data} = await axios.post<UserModel>(Endpoint.USERS, form)
        localStorage.setItem(Storage.USER_ID, data.id.toString())
        return data
    }
)

export const login = createAsyncThunk<UserModel, FormModel>(
    'currentUser/login',
    async (form) => {
        const query = Object.entries(form).map(input => (`${input[0]}=${input[1]}`)).join('&') 
        const {data} = await axios.get<{user: UserModel}>(`${Endpoint.USERS}/login?${query}`)
        localStorage.setItem(Storage.USER_ID, data.user.id.toString())
        return data.user
    }
)

export const getMe = createAsyncThunk<UserModel, number>(
    'currentUser/getMe',
    async (id) => {
        const {data} = await axios.get<{user: UserModel}>(`${Endpoint.USERS}/user/${id}`)
        return data.user
    }
)


export const currenUserSlice = createSlice ({
    name: 'currentUser',
    initialState,
    reducers: {
        logOut: {
            reducer: (state) => {
                state.user= null
            },
            prepare: () => {
                localStorage.removeItem(Storage.USER_ID)
                return {
                    payload: null
                }
            }
        }
    },
    extraReducers: (build) => {
        build
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export default currenUserSlice.reducer

export const {logOut} = currenUserSlice.actions

