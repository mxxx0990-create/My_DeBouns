import { useEffect, useState } from "react";




function useDebounce<T>(value: T, time: number) {

    const [getDebouns, setGetDebouns] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setGetDebouns(value)
        }, time);

        return () => {
            clearTimeout(timer)
        }
    }, [value, time])

   return getDebouns
}

export default useDebounce