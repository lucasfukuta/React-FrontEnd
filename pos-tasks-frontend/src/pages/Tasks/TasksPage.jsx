import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { FiTrash } from 'react-icons/fi';
import './TasksPage.css';

export default function TasksPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todas');
  const [priorityFilter, setPriorityFilter] = useState('todas');
  const [tab, setTab] = useState('todas');
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = () => {
    axios
      .get('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:3000/api/tasks',
        {
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority.toUpperCase(),
          status: newTask.status.toUpperCase(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        fetchTasks();
        setNewTask({ title: '', description: '', priority: 'BAIXA', status: 'PENDENTE' });
        setShowForm(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao criar tarefa. Verifique os dados e tente novamente.');
      });
  };

  const handleStatusChange = (id, newStatus) => {
    const task = tasks.find((t) => t.id === id);
  
    if (!task) return;
  
    axios
      .patch(
        `http://localhost:3000/api/tasks/${id}`,
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: newStatus.toUpperCase(), // <-- Aqui garantimos que o status vai MAIÚSCULO
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(fetchTasks)
      .catch((err) => {
        if (err.response) {
          console.error('Erro ao atualizar tarefa:', err.response.data);
        } else {
          console.error('Erro ao atualizar tarefa:', err);
        }
      });
  };
  

  const handleDeleteTask = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(fetchTasks)
      .catch((err) => console.error(err));
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === 'todas' || task.status === statusFilter.toUpperCase();
    const priorityMatch =
      priorityFilter === 'todas' || task.priority === priorityFilter.toUpperCase();
    return statusMatch && priorityMatch;
  });

  const groupedTasks = {
    todas: filteredTasks,
    andamento: filteredTasks.filter((task) => task.status === 'EM_ANDAMENTO'),
    pendentes: filteredTasks.filter((task) => task.status === 'PENDENTE'),
    concluidas: filteredTasks.filter((task) => task.status === 'CONCLUIDO'),
  };

  return (
    <div className="tasks-page">

      <div className="header-bar">
        <h1>Gerenciador de Tarefas</h1>
        <button className="nova-tarefa-btn" onClick={() => setShowForm(!showForm)}>
          <strong>Nova Tarefa</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={handleCreateTask}>
          <div>
            <div>
              <input
                type="text"
                placeholder="Título"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="" disabled>
                  Selecione a prioridade
                </option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="" disabled>
                  Selecione o status
                </option>
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDO">Concluída</option>
              </select>
            </div>
            <div>
              <textarea
                placeholder="Descrição"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <button type="submit" className="criar-tarefa-btn">
              Criar
            </button>
            <button
              type="button"
              className="cancelar-tarefa-btn"
              onClick={() => {
                setNewTask({ title: '', description: '', priority: '', status: '' });
                setShowForm(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="filters">
        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="todas">Todas as prioridades</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div className="planet-tabs">
        {['todas', 'andamento', 'pendentes', 'concluidas'].map((name) => (
          <div key={name} onClick={() => setTab(name)} className="planet-tab-container">
            <div
              className={`planet-tab planet-${name} ${tab === name ? 'active' : ''}`}
              title={name}
            />
            <div className="planet-tab-label">
              {name[0].toUpperCase() + name.slice(1)}
            </div>
          </div>
        ))}
      </div>

      <div className="tasks-grid">
        {groupedTasks[tab].map((task) => (
          <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
              </span>
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="task-actions">
              {task.status === 'CONCLUIDO' ? (
                <button
                  className="reabrir-btn"
                  onClick={() => handleStatusChange(task.id, 'PENDENTE')}
                >
                  Reabrir
                </button>
              ) : (
                <button
                  className="concluir-btn"
                  onClick={() => handleStatusChange(task.id, 'CONCLUIDO')}
                >
                  Concluir
                </button>
              )}
              <button
                className="excluir-btn"
                onClick={() => handleDeleteTask(task.id)}
                title="Excluir tarefa"
              >
                <FiTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
