import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete, onOpenEditForm }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <GridItem key={todo.id}>
          <TodoListItem
            todo={todo}
            index={index}
            onDelete={onDelete}
            onOpenEditForm={onOpenEditForm}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
