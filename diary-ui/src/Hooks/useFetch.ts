import { useState } from 'react';
import useAsync from "./useAsync"

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

export default function useFetch(url, options = {}) {
    const [trigger, setTrigger] = useState<boolean>(null);
    const fetchApi = useAsync(async () => {
        if (trigger == null) return;

        const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options })
        if (res.ok) {
            return await res.json()
        } else {
            const json = await res.json()
            return Promise.reject(json)
        }
    }, [trigger]);

    const execute = (callback?) => {
        setTrigger((p)=>!p);
        callback && callback();
    };

    return { execute, ...fetchApi };
}