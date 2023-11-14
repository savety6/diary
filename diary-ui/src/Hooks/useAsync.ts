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

    const callbackMemoized = useCallback(async () => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        try {
            const result = await callback()
            setValue(result)
        } catch (e) {
            setError(new Error(e.error))
        } finally {
            setLoading(false)
        }
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}