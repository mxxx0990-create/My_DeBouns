import { useEffect, useState } from "react";



function useDebouns_L2<T>(value: T, time: number) {

    const [getDebouns, setGetDebouns] = useState<T>(value);

    useEffect(() => {

        const timer = setTimeout(() => {
            setGetDebouns(value)
        }, time)

        return () => {
            clearTimeout(timer)
        }
    }, [value, time])

    return getDebouns
}

export default useDebouns_L2