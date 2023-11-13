import useAsync from "./useAsync"

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

export default function useFetch(url, options = {}, dependencies = []) {
    return useAsync(async () => {
        const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options })
        if (res.ok) {
            return await res.json()
        } else {
            const json = await res.json()
            return Promise.reject(json)
        }
    }, dependencies)
}