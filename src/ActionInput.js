import React, {useCallback, useEffect, useState} from 'react';

const ActionInput = ({todoName, handleChange, handleAddTodo, id}) => {
    const [extended, setExtended] = useState(false)

    useEffect(() => {
        return () => {
            setExtended(false)
        };
    }, []);


    const extendInput = useCallback(() => {
        setExtended(true);
    }, []);

    return (
        <div className={`action-input ${extended ? 'extended' : ''}`}>
            <input type="text" value={todoName} onChange={handleChange}/>
            {
                extended ?
                    <button className='btn-icon' onClick={() => handleAddTodo(id)}>
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
