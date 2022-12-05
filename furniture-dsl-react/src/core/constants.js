export const TOKEN="trcjG8fhygc"
export const serverAddress = ""
export const localAddress = "localhost"
export const projectorAddress = "localhost:5500/projector-client"

export const prod = false
export const mpsServerPort = 2904

export const hostAddress = prod ? serverAddress : localAddress
export const hostHttp = `http://${hostAddress}:${mpsServerPort}`
