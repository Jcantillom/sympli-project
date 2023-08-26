import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './styles/RegisterForm.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error de registro',
                text: 'Las contraseñas no coinciden.',
            });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful registration
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Usuario registrado exitosamente.',
                }).then(() => {
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                });
            } else {
                // Handle registration error
                Swal.fire({
                    icon: 'error',
                    title: 'Error de registro',
                    text: 'Error al registrar el usuario.',
                });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} />
            <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleInputChange} />
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default RegisterForm;
