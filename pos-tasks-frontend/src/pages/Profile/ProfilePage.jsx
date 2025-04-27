import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const { token } = useAuth();
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({ name: res.data.name, email: res.data.email });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        'http://localhost:3000/api/users/profile',
        { name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert('Perfil atualizado com sucesso!'))
      .catch((err) => alert('Erro ao atualizar perfil'));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="profile-container">
      <h2>Atualizar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
