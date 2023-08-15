import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'
import { WordModel } from '../models/wordModel'
import { Endpoint } from '../enums/Endpoints'
import { shuffle } from '../functions/shuffle'
import { WritableDraft } from 'immer/dist/internal.js'
import { MetadataModel } from '../models/metadataModel'
import { RootState } from '../store/store'

interface CounterState {
  container: WordModel[]
  categories: string[]
  isLoading: boolean
}


interface MetaResp {
    properlyMeta: number[],
    wrongMeta: number[]
}

interface WordResp {
    foreignText: string
    translatedText: string
    category: string
}


const initialState: CounterState = {
  container: [],
  categories: ['person'],
  isLoading: false
}


export const updateCounters = createAsyncThunk(
    'words/updateCounters',
    async (meta: MetaResp) => {
        const {data} = await axios.put<{word: WordModel}>(Endpoint.META, meta )
        console.log(data);
        
    }
)

export const changeStatus = createAsyncThunk<{id: number, metadata: MetadataModel}, {id: number, isNew?: boolean, needsToLearn?: boolean}>(
    'words/changeStatus',
    async ({id, isNew, needsToLearn}) => {
        const {data} = await axios.put<{metadata: MetadataModel}>(`${Endpoint.META}/${id}`, {isNew, needsToLearn} )
        console.log(data);
        
        return {id, metadata: data.metadata}
    }
)

export const createWord = createAsyncThunk(
    'words/createWord',
    async ({userId, word}:{userId: number, word:WordResp}) => {
        const {data} = await axios.post<{word: WordModel}>(Endpoint.WORDS, {userId, ...word})
        return {word: data.word}
    }
)

export const editWord = createAsyncThunk(
    'words/editWord',
    async ({id, word}:{id: number, word:WordResp}) => {
        const {data} = await axios.put<{word: WordModel}>(`${Endpoint.WORDS}/${id}`, word)
        return {word: data.word}
    }
)

export const getWords = createAsyncThunk<{words: WordModel[], category: string[]}, string, {state: RootState}>(
    'words/getWords',
    async (query, {getState}) => {
        const state = getState()
        const userId = state.currentUser.user?.id
        if(userId){
            const {data} = await axios.get<{words: WordModel[], category: string[]}>(`${Endpoint.WORDS}/my/${userId}?${query}`)
            console.log(data);
            
            return {words: data.words, category: data.category}
        }
        else {
            return {words: [], category: []}
        }
    }
)

export const deleteWord = createAsyncThunk(
    'words/deleteWord',
    async (id: number) => {
        await axios.delete<{word: WordModel[]}>(`${Endpoint.WORDS}/${id}`)
        return {id}
    }
)

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    confuseDirectionAndWords: (state, action: PayloadAction<WordModel[]>) => {
        const idArr = action.payload.map(elem => elem.id) 
        const arr = shuffle(idArr)
        state.container = arr.map(elem => {
            const newElem = state.container.find(word => word.id === elem) as WritableDraft<WordModel>
            const random = Math.random()
            newElem.direction = random  <= 0.5 ? true : false
            return newElem
        })
        console.log(state.container);
        
    },
    reverseDirection: (state, action: PayloadAction<{id: number}>) => {
        const elem = state.container.find(word => word.id === action.payload.id)
        if(elem){
            elem.direction = !elem.direction
        }
    },
    addCategory: (state, action: PayloadAction<string>) => {
       state.categories = [action.payload, ...state.categories]
    },
  },
  extraReducers:(builder)=>{
    builder
        .addCase(createWord.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createWord.fulfilled, (state, action) => {
            state.container = [action.payload.word, ...state.container]
            state.isLoading = false
        })
        .addCase(getWords.fulfilled, (state, action) => {
            state.categories = action.payload.category
            state.container = action.payload.words.map(word => {
                word.direction = false
                return word
            })
        })
        .addCase(deleteWord.fulfilled, (state, action) => {
            state.container = state.container.filter(word => word.id !== action.payload.id)
        })
        .addCase(changeStatus.fulfilled, (state, action) => {
            let word = state.container.find(word => word.id === action.payload.id)
            if(word){
                word.meta = action.payload.metadata
            }
        })
        .addCase(editWord.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editWord.fulfilled, (state, action) => {
            state.isLoading = false
            state.container = state.container.map(word => {
                if(word.id === action.payload.word.id){
                   return action.payload.word
                }
                return word
            })

        })
  }
})

export const { confuseDirectionAndWords, reverseDirection, addCategory } = wordsSlice.actions

export default wordsSlice.reducer