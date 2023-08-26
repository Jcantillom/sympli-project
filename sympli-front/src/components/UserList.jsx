import React, { useState, useEffect } from 'react';
import './styles/UserList.css'; // Importa tus estilos CSS para este componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function UserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Realiza una solicitud GET a la API para obtener la lista de usuarios
        fetch('http://127.0.0.1:8000/api/users/')
            .then(response => response.json())
            .then(data => setUserList(data))
            .catch(error => console.error('Error al obtener la lista de usuarios:', error));
    }, []);

    const handleEditUser = (userId) => {
        // Implementa la lógica para editar el usuario con el ID proporcionado
    };

    const handleDeleteUser = (userId) => {
        // Implementa la lógica para eliminar el usuario con el ID proporcionado
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
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="user-action" onClick={() => handleDeleteUser(user.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
