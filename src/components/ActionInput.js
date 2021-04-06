import React, {useCallback, useEffect, useState} from 'react';

const ActionInput = ({user, onSubmit}) => {
    const [extended, setExtended] = useState(false);
    const [value, setValue] = useState('');

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const handleSubmit = useCallback( () => {
        if (value.length > 0) {
            onSubmit(value);
            setValue('')
        }
    }, [value, onSubmit]);

    useEffect(() => {
        if(!user) {
            setExtended(false)
        }
    }, [user]);



    const extendInput = useCallback(() => {
        setExtended(true);
    }, []);

    return (
        <div className={`action-input ${extended ? 'extended' : ''}`}>
            <input type="text" value={value} onChange={handleChange}/>
            {
                extended ?
                    <button className='btn-icon' onClick={handleSubmit}>
                        <span className='icon icon-check'/>
                    </button> :
                    <button className='btn-icon' onClick={extendInput}>
                        <span className='icon icon-plus'/>
                    </button>
            }

        </div>
    );
};

export default ActionInput;
