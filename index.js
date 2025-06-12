  // Lista de tarefas
  const tasks = [];

  const form = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');

  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const title = document.createElement('h3');
    title.textContent = task.name;

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = task.tag;

    const date = document.createElement('span');
    date.textContent = `Criado em: ${task.date}`;

    meta.appendChild(tag);
    meta.appendChild(date);

    infoDiv.appendChild(title);
    infoDiv.appendChild(meta);

    const button = document.createElement('button');
    button.innerHTML = task.completed ? '✓' : 'Concluir';

    // Evento de clique para concluir tarefa
    button.addEventListener('click', () => {
      task.completed = !task.completed;
      updateTasksUI();
    });

    li.appendChild(infoDiv);
    li.appendChild(button);

    return li;
  }

  // Função para atualizar a lista de tarefas na tela
  function updateTasksUI() {
    taskList.innerHTML = ''; // Limpa a lista atual
    tasks.forEach(task => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });

    // Atualiza contador
    const completedCount = tasks.filter(t => t.completed).length;
    taskCount.textContent = `${completedCount} tarefa${completedCount !== 1 ? 's' : ''} concluída${completedCount !== 1 ? 's' : ''}`;
  }

  // Evento de envio do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede que a página recarregue

    const name = document.getElementById('task-name').value;
    const tag = document.getElementById('task-tag').value;
    const date = new Date().toLocaleDateString('pt-BR');

    const newTask = {
      id: Date.now(),
      name,
      tag,
      date,
      completed: false
    };

    tasks.push(newTask);
    updateTasksUI();

    // Limpa os campos
    form.reset();
  });
