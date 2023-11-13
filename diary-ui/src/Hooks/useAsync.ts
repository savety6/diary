import { useCallback, useEffect, useState } from "react"

type AsyncState<T> = {
  loading: boolean;
  error?: Error;
  value?: T;
}

export default function useAsync<T>(callback: () => Promise<T>, dependencies: any[] = []): AsyncState<T> {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [value, setValue] = useState<T>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}