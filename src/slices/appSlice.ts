import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface AppSliceInt {
    mode: 'learn' | 'all' | 'new only' | 'old only' | 'last new' | 'last old' 
    limit: number
    pause: number
}

const initialState: AppSliceInt = {
    mode: 'all',
    limit: 2,
    pause: 4,
}



export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        selectMode: (state, action: PayloadAction<AppSliceInt['mode']>) => {
            state.mode = action.payload
        }
}
})

export default appSlice.reducer

export const {selectMode} = appSlice.actions

