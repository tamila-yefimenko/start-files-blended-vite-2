import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedObject = window.localStorage.getItem('saved-todos');

    if (savedObject !== null) {
      return JSON.parse(savedObject);
    }
    return [
      { id: '1', text: 'Practice more' },
      { id: '2', text: 'Get all tasks done on time' },
    ];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    window.localStorage.setItem('saved-todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = inputValue => {
    setTodos(prevTodos => [...prevTodos, { id: nanoid(), text: inputValue }]);
  };

  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const updateTodo = inputValue => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === currentTodo.id ? { ...todo, text: inputValue } : todo
      )
    );
    setIsEditing(false);
    setCurrentTodo({});
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <>
      {isEditing === true ? (
        <EditForm
          onUpdate={updateTodo}
          onClose={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}
      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onOpenEditForm={handleEditTodo}
        />
      )}
    </>
  );
};

export default Todos;
