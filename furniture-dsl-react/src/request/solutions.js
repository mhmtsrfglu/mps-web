import requestInstance from "."

const getSolutions = async () => {
    return await requestInstance.get("/solutions")
}


export {
    getSolutions
}