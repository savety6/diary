import { useState } from 'react';
import { InputProps } from '@ui-kitten/components'

const useInputState = (initialValue = ''): InputProps => {
    const [value, setValue] = useState<string>(initialValue);
    return { value, onChangeText: setValue };
};

export default useInputState;