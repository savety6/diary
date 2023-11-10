import { useState } from 'react';

export default function useToggle(initialValue: boolean) {
    const [value, setValue] = useState(initialValue);
    
    function toggleValue(value: any) {
        setValue(currentValue =>
            typeof currentValue === 'boolean' ? !currentValue : initialValue

        )
    }
    
    return [value, toggleValue];
    }