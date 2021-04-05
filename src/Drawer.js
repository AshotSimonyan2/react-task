import React, {useCallback, useEffect, useState} from 'react';
import {addTodo, getUserTodos, updateTodo, updateUser} from "./firebase";
import SingleTask from "./SingleTask";
import ActionInput from "./ActionInput";

const Drawer = ({user,removeSelectedUser}) => {
    const [todos, setTodos] = useState([]);
    const [todoName, setTodoName] = useState('');

    useEffect(() => {
        getUserTodos(user.id, (todos) => {
            const arr = [];
            todos.forEach(todo => {
                arr.push({
                    id: todo.id,
                    ...todo.data()
                });
            });
            setTodos(arr);
        });
    }, [user.id]);

    const handleComplete = useCallback((id) => {

        updateTodo(user.id, id, {
            state: 1,
        }).then(() => {
            const completedCount = todos.reduce((count, item) => {
                return item.state ? ++count : count;
            }, 1);
            const completion_status = Math.round(completedCount / todos.length * 100);
            updateUser(user.id, {
                completion_status
            });
        });
    }, [user.id, todos]);

    const handleAddTodo = useCallback((id) => {
        addTodo(id, {
            name:  todoName,
            state: 0
        }).then(() => {
            const completedCount = todos.reduce((count, item) => {
                return item.state ? ++count : count;
            }, 0);
            const completion_status = Math.round(completedCount / (todos.length + 1) * 100);
            updateUser(user.id, {
                completion_status
            });
        });
        setTodoName('')
    }, [user.id, todoName, todos]);

    const handleChange = useCallback((e) => {
        setTodoName(e.target.value);
    }, []);

    return (
        <div className='drawer'>
            <div className="drawer-inner">
                <div className='drawer-top'>
                    <ActionInput
                        todoName={todoName}
                        handleChange={handleChange}
                        handleAddTodo={handleAddTodo}
                        id={user.id}
                    />

                    <button className='btn-circle' onClick={removeSelectedUser}><span className='icon icon-close'/></button>
                </div>


                <h2 className='drawer-title'>To-do list for {user.name}</h2>
                {
                    todos.length ?
                        <ul className='task-card-list'>
                            {todos.map(todo => {
                                return (
                                    <SingleTask todo={todo} handleComplete={handleComplete} />
                                )
                            })}
                        </ul> :
                        <p>There are no to-dos yet</p>
                }

            </div>


        </div>
    )
};
export default Drawer;

