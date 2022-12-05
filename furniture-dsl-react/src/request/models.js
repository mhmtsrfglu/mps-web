import { hostAddress } from "../core/constants"
import axios from "axios";
import requestInstance from './index'

const getModels = async (modelName) => {
    return await requestInstance.get("/models/" + modelName)
}

const getModelData = async (modelName,regularId) => {
    return await requestInstance.get(`/models/${modelName}/${regularId}`)
}

const registerModelPage = async (uuid,referenceName,regularId) => {
    return await axios.get(`http://${hostAddress}:63320/node?ref=${encodeURIComponent(`r:${uuid}(${referenceName})/${regularId}`)}`)
}


export {
    getModels,
    getModelData,
    registerModelPage
}