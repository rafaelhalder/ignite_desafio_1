import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //criar condição para aceitar apenas com titulo preenchido
    if(newTaskTitle) {

      //criar nova const para receber os valores "immutable"
      const newTasks = {
        title: newTaskTitle,
        id: Math.random(),
        isComplete:false
      }
      //inserir novos valores na const criada

      setTasks(previewTasks => [...previewTasks, newTasks]);
      //resetar input
      setNewTaskTitle('')
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //mapeado os valores na nova const e selecionado apenas o id que quero alterar la
    //não colocado direto true pois não poderia marcar e desmarcar a condição de completado

    const newListTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);


    setTasks(newListTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const getAllTasksLess = tasks.filter(task => task.id !== id);

    setTasks(getAllTasksLess);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}