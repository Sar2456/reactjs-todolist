import { useState,useEffect } from "react"
import TodoInput from "/src/components/TodoInput"
import Todolist from "/src/components/TodoList"
function App() {
    const [todos,setTodos]= useState([
      'Go to the gym',
      'Eat more vege',
      'Programming more'
    ])
    const [todoValue , setTodoValue]=useState('')
 function persistData(newList){
localStorage.setItem('todos',JSON.stringify({todos : newList}))
}
    function handleAddTodos(newTodo) {
       const newTodoList=[...todos,newTodo]
       persistData(newTodoList)
       setTodos(newTodoList)
    }

function handleDeleteTodo(index) {
  const newTodoList= todos.filter((todo,todoIndex)=>{
    return todoIndex !== index
  })
  persistData(newTodoList)
  setTodos(newTodoList)
}
function handleEditTodo(index) {
  const valueToBeEdited= todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)
}
useEffect(()=>{
  if(!localStorage){
    return
  }

  let localTodos=localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos)

},[])

  return (
 <>
  <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
  <Todolist handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
 </>
  )
}

export default App
