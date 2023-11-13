import { useEffect, useRef, DependencyList, EffectCallback } from "react"

export default function useUpdateEffect(callback: EffectCallback, dependencies: DependencyList) {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        return callback()
    }, dependencies)
}