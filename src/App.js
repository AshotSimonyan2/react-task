import { useEffect, useState, useCallback } from 'react';
import { getUsers, getUserTodos, addTodo, updateUser, updateTodo } from './firebase';
import './assets/scss/style.scss'
import Drawer from "./Drawer";



function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers((users => {
            const arr = [];
            users.forEach(user => {
                arr.push({
                    id: user.id,
                    ...user.data()
                });
            })
            setUsers(arr);
        }));
    }, []);

    const handleSelectTodo = useCallback((id, name) => {
        setSelectedUser({name, id});
    }, []);

    const removeSelectedUser = useCallback(() => {
            setSelectedUser(null)
        }, []);

    return (
        <div className="container">
            <div className="content">
                <div className={`table-wrapper ${selectedUser ? 'open-drawer' : ''}`}>
                    <table className='user-table'>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Complete rate (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user.id} className={user.id === selectedUser?.id ? 'active' : ''} onClick={() => handleSelectTodo(user.id, user.name)}>
                                    <td>{user.name}</td>
                                    <td>{user.completion_status}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <Drawer user={selectedUser || {}} removeSelectedUser={removeSelectedUser} />
                    {/*{selectedUser && <Drawer user={selectedUser} />}*/}
                </div>


            </div>

        </div>
    );
}

export default App;
