import React from 'react';

const SingleTask = ({todo, handleComplete}) => {
    return (
        <li key={todo.id} className='task-card'>
            {
                todo.state === 0 ?
                    <div className='status-badge pending'><span className='icon icon-pending'/>Pending</div> :
                    <div className='status-badge complete'><span className='icon icon-check'/>Complete</div>
            }
            <p className='task-text'>{todo.name}</p>
            <button
                className='btn primary'
                disabled={todo.state}
                onClick={() => handleComplete(todo.id)}
            >
                Mark as done
            </button>
        </li>
    );
};

export default SingleTask;
