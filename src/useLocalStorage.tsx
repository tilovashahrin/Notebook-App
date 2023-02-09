import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            }
            return initialValue
        }
        return JSON.parse(jsonValue)
    })

    //save our data in localStorage every time our value or key changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    //returning an array thats always type T and type of the setValue
    return [value, setValue] as [T, typeof setValue]
}