import React, {useState, useEffect} from 'react';
import './styles/UserList.css'; // Importa tus estilos CSS para este componente
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

function UserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users/')
            .then(response => response.json())
            .then(data => setUserList(data))
            .catch(error => console.error('Error al obtener la lista de usuarios:', error));
    }, []);

    const handleEditUser = (userId) => {
        try {
            fetch('http://127.0.0.1:8000/api/users/' + userId)
                .then(response => response.json())
                .then(data => setUserList(data))
                .catch(error => console.error('Error al obtener la lista de usuarios:', error));
        } catch (e) {
            console.log(e);
        }
    };


    const handleDeleteUser = (userId) => {
        try {
            fetch('http://127.0.0.1:8000/api/users/' + userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Eliminación exitosa, actualiza la lista de usuarios
                        setUserList(prevUserList => prevUserList.filter(user => user.id !== userId));
                    } else {
                        console.error('Error al eliminar el usuario');
                    }
                })
                .catch(error => console.error('Error al obtener la lista de usuarios:', error));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="user-list-container">
            <h2>Lista de Usuarios</h2>
            <ul className="user-list">
                {userList.map(user => (
                    <li key={user.id} className="user-item">
                        <span className="user-name">{user.name}</span> -{' '}
                        <span className="user-email">{user.email}</span>
                        <div className="user-actions">
                            <button className="user-action" onClick={() => handleEditUser(user.id)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button className="user-action" onClick={() => handleDeleteUser(user.id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;