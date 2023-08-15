import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface AppSliceInt {
    mode: 'learn' | 'all' | 'new only' | 'old only' | 'last new' | 'last old' 
    menu: boolean
    message: string
}

const initialState: AppSliceInt = {
    mode: 'all',
    menu: false,
    message: '',
}



export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        selectMode: (state, action: PayloadAction<AppSliceInt['mode']>) => {
            state.mode = action.payload
        },
        menuControl: (state, action: PayloadAction<boolean> ) => {
            state.menu = action.payload
        }
}
})

export default appSlice.reducer

export const {selectMode, menuControl, setMessage} = appSlice.actions

