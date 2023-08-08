import { MetadataModel } from "./metadataModel"

export interface WordModel {
    readonly id: number
    foreignText: string
    translatedText: string
    meta: MetadataModel
    direction: boolean
}

