import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";
import axios from "../axios";
import { Endpoint } from "../enums/Endpoints";
import { FormModel } from "../models/formModel";
import { Storage } from "../enums/Storage";
import { Settings } from "../models/settingModel";
import { setMessage } from "./appSlice";

interface UserSlice {
    user: UserModel | null,
    isLoading: boolean
}

const initialState: UserSlice = {
    user: null,
    isLoading: false
}

export const createUser = createAsyncThunk<UserModel | null, FormModel>(
    'currentUser/createUser',
    async (form, {dispatch}) => {
        const {data} = await axios.post<{user: UserModel}>(Endpoint.USERS, form)
        console.log(null);
        
        if(data.user){
            localStorage.setItem(Storage.USER_ID, data.user.id.toString())
            dispatch(setMessage('Success!!! '))
            
        }
        else{
            dispatch(setMessage('The user with the same name already exist'))
        }
        return data.user
    }
)

export const login = createAsyncThunk<UserModel, FormModel>(
    'currentUser/login',
    async (form, {dispatch}) => {
        const query = Object.entries(form).map(input => (`${input[0]}=${input[1]}`)).join('&') 
        const {data} = await axios.get<{user: UserModel}>(`${Endpoint.USERS}/login?${query}`)
        if(data.user){
            localStorage.setItem(Storage.USER_ID, data.user.id.toString())
            dispatch(setMessage(`Welcome ${data.user.nikName}`))
        }
        else{
            dispatch(setMessage("User with the same name and password doesn't exist"))
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

export const setSettings = createAsyncThunk<boolean, Settings>(
    'currentUser/setSettings',
    async (settings) => {
        const {data} = await axios.put<{isUpdated: boolean}>(`${Endpoint.USERS}/settings/${settings.id}`, settings)
        return data.isUpdated
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
            if(state.user && (action.payload.name === 'repeatBy' || action.payload.name === 'pause' || action.payload.name === 'learnBy')){
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
            .addCase(setSettings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setSettings.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export default currenUserSlice.reducer

export const {logOut, changeSetting, toggleSetting} = currenUserSlice.actions


