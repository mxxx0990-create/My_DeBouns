import type { ISneaker } from "../pages/SnakerShop/SneakerShop"

export const sorgterFunc = (list: ISneaker[], sorter: string) => {
    return [...list].sort((a, b) => {
        if (sorter === "expensive") return b?.price - a?.price
        if (sorter === "cheap") return a?.price - b?.price
        return 0
    })
}