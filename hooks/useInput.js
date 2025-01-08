import {useState} from "react";

const useInput = (defaultValue, formatter)=> {
    const [value, setValue] = useState(defaultValue)
    const onChange = e => {
        const {value} = {...e.target}

        if (formatter === 'id') {
            setValue(value.replace(/[^a-zA-Z0-9]/g, ''));
        } else {
            setValue(value);
        }
    }

    return {value,onChange}
}

export default useInput