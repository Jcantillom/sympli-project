import React from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm';
import UserList from './components/UserList';

function App() {
    return (
        <div className="app-container">
            <h1 className="app-title">Registro de usuarios</h1>
            <RegisterForm />
            <UserList />
        </div>
    );
}

export default App;
