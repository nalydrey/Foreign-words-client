import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import {  confuseDirectionAndWords, getWords, reverseDirection, updateCounters } from '../../slices/wordsSlice'
import { CountDisplay } from '../UI/CountDisplay'
import { ButtonMain} from '../UI/ButtonMain'
import { CheckIcon, ForwardIcon, NoSymbolIcon, PlayIcon } from '@heroicons/react/20/solid'


interface PlayState {
    currentIndex: number
    round: number
    isPlay: boolean
    currentTimer: number | null
    isShowAnsver: boolean
    isPause: boolean
}

const initialState: PlayState = {
    currentTimer: null,
    currentIndex: 0,
    round: 0,
    isPlay: false,
    isShowAnsver: false,
    isPause: false
}


export const Game = () => {

    const dispatch = useAppDispatch()
    const words = useAppSelector(state => state.words.container)
    const app = useAppSelector(state => state.app)
    const currentUser = useAppSelector(state => state.currentUser.user)


    const [state, setState] = useState<PlayState>(initialState)

    const [wrongWords, setWrongWords] = useState<number[]>([])
    const [properlyWords, setProperlyWords] = useState<number[]>([])

    
    const {
        currentIndex,
        currentTimer,
        isPlay,
        isShowAnsver,
        isPause,
        round
    } = state

    const currentWord = isPlay ? currentIndex + 1 : 0

    const nextWord = () => {
        let newIndex = 0
        if(currentIndex < words.length-1){
            newIndex = currentIndex + 1
            setState({...state, isPause: false, currentIndex: newIndex, isShowAnsver: false})
        }
        else{
            setState({...state, isPause: false, currentIndex: newIndex, isShowAnsver: false, round: round+1})
        }
    }

    const addToWrongOrToProperlyArray = (isProperly: boolean) => {
        const currentWordId = words[currentIndex].id
        if(isProperly){
            setWrongWords(wrongWords.filter(wordId => wordId !== currentWordId))
            if(!properlyWords.includes(currentWordId)){
                setProperlyWords([...properlyWords, currentWordId])
            }
        }
        else{
            setProperlyWords(properlyWords.filter(wordId => wordId !== currentWordId))
            if(!wrongWords.includes(currentWordId)){
                setWrongWords([...wrongWords, currentWordId])
            }
        }
    }

    useEffect (()=> {
        switch(app.mode){
            case 'all': {
                dispatch(getWords(''))
                break
            }
            case 'new only': {
                dispatch(getWords('meta.isNew=true'))
                break
            }
            case 'old only': {
                dispatch(getWords('meta.isNew=false'))
                break
            }
            case 'learn': {
                dispatch(getWords('meta.needsToLearn=true&_take=10'))
                break
            }
            case 'last new': {
                dispatch(getWords(`meta.isNew=true&_take=${currentUser?.settings.lastWords}`))
                break
            }
            case 'last old': {
                dispatch(getWords(`meta.isNew=false&_take=${currentUser?.settings.lastWords}`))
                break
            }
        }
        setState(initialState)
    },[app.mode]) 
    
    useEffect (()=> {
        dispatch(confuseDirectionAndWords(words))
    },[round, words.length]) 
    
    useEffect (()=> {
        if(round > 0 && app.mode !== 'learn'){
            dispatch(updateCounters({properlyMeta: properlyWords, wrongMeta: wrongWords}))
        }
    },[round]) 


    useEffect (()=> {
        if(currentUser && currentUser.settings.timer && isPlay && app.mode !== 'learn'){
            const timerId = setTimeout(()=>{

                dispatch(reverseDirection({id: words[currentIndex].id}))
                
                setState({...state, isPause: true, isShowAnsver: true, currentTimer: null})
                
                addToWrongOrToProperlyArray(false)

                clearTimeout(timerId)
            }, currentUser.settings.pause * 1000)
            setState({...state, currentTimer: timerId})
        }

    },[isPlay, currentIndex]) 





    const handlerShow = () => {
        currentTimer && clearTimeout(currentTimer)
        setState({...state, isShowAnsver: true})
        dispatch(reverseDirection({id: words[currentIndex].id}))
    }

    const handlerAnsver = (isProperly: boolean) => {
        nextWord()
        addToWrongOrToProperlyArray(isProperly)
    }
 
    const handlerNext = () => {
        nextWord()
    }
    
    const handlerStart = () => {
        setState({...state, isPlay: true})
    }



    


  return (
    <div className='container mx-auto'>
        <div className='mb-52 mt-5 flex justify-center gap-20'>
            <CountDisplay 
                title = 'Words'
                counter = {words.length}
             />
            <CountDisplay 
                title = 'Current Word'
                counter = {currentWord}
             />
            <CountDisplay 
                title = 'Round'
                counter = {round}
             />
        </div>
        <div className='flex justify-center'>
        <div className='border border-white w-[400px] h-96 rounded-2xl bg-gray-700/50 backdrop-blur-sm flex flex-col shadow-deep'>
            <div className='grow'>
                <span 
                    className='text-4xl text-gray-300 text-center flex h-full justify-center items-center'
                >
                    {isPlay ? !!words.length &&  words[currentIndex][words[currentIndex].direction ? 'foreignText': 'translatedText' ] : 'Start?'}
                </span>
            </div>
            <div>
            </div>
                <div className=' p-3 flex justify-center items-center gap-5'>
                   <ButtonMain
                        isVisible = {!isPlay}
                        endIcon= {<PlayIcon className=' fill-green-500'/>}
                        title='Start'
                        onClick={handlerStart}
                    />
                    <ButtonMain
                        isVisible = {isPlay && !isShowAnsver}
                        endIcon= {<PlayIcon className='fill-green-500'/>}
                        title='Show'
                        onClick={handlerShow}
                    />
                    <ButtonMain
                        isVisible = {isPause || isShowAnsver && app.mode === 'learn'}
                        endIcon= {<ForwardIcon className='fill-sky-500'/>}
                        title='Next'
                        onClick={handlerNext}
                    />
                    <ButtonMain
                        isVisible = {app.mode !== 'learn' && isPlay && isShowAnsver && !isPause}
                        startIcon= {<CheckIcon className='fill-green-500'/>}
                        title='Properly'
                        onClick={() => handlerAnsver(true)}
                    />
                    <ButtonMain
                        isVisible = {app.mode !== 'learn' && isPlay && isShowAnsver && !isPause}
                        startIcon= {<NoSymbolIcon className='fill-red-500'/>}
                        title='Wrong'
                        onClick={() => handlerAnsver(false)}
                    />
                </div>
            </div>
        </div>
        {/* <Popup
            isShow = {isShowPopup}
            onYes={handlerYes}
            onNo={handlerNo}
        /> */}
    </div>
  )
}
