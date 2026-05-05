import { useEffect, useState } from "react";



function useDebouns<T>(value: T, time: number) {

    const [getValue, setGetValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setGetValue(value)
            

            return () => (
                clearTimeout(timer)
            )
    }, time)
    }, [value, time])

    return getValue
}

export default useDebouns