import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";
import axios from "../axios";
import { Endpoint } from "../enums/Endpoints";
import { FormModel } from "../models/formModel";
import { Storage } from "../enums/Storage";
import { Settings } from "../models/settingModel";

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
        const {data} = await axios.post<{user: UserModel}>(Endpoint.USERS, form)
        localStorage.setItem(Storage.USER_ID, data.user.id.toString())
        return data.user
    }
)

export const login = createAsyncThunk<UserModel, FormModel>(
    'currentUser/login',
    async (form) => {
        const query = Object.entries(form).map(input => (`${input[0]}=${input[1]}`)).join('&') 
        const {data} = await axios.get<{user: UserModel}>(`${Endpoint.USERS}/login?${query}`)
        if(data.user){
            localStorage.setItem(Storage.USER_ID, data.user.id.toString())
        }
        
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
        },
        changeSetting: (state, action: PayloadAction<{name: keyof Settings, value: number}>) => {
            if(state.user && (action.payload.name === 'lastWords' || action.payload.name === 'pause')){
                state.user.settings[action.payload.name] = action.payload.value
            }
        },
        toggleSetting: (state, action: PayloadAction<{name: keyof Settings, value: boolean}>) => {
            if(state.user && action.payload.name === 'timer'){
                state.user.settings[action.payload.name] = !action.payload.value
            }
        }
    },
    extraReducers: (build) => {
        build
            .addCase(createUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export default currenUserSlice.reducer

export const {logOut, changeSetting, toggleSetting} = currenUserSlice.actions


