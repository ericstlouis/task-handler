import {useState, useEffect} from "react";
import Header from "./components/Header";
import { Tasks }  from "./components/Tasks";
import { AddTask } from "./components/AddTask"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    };
    getTasks()
  },[])
  //Fetch Task
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      console.log(data)
      return data;
    }; 
 
  //add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  //delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',});
    setTasks(tasks.filter((task) => task.id !== id))
  }
//fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id} `);
    const data = await res.json();
    console.log(data);
    return data;
  }; 

  //reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', 
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task ))
    console.log(tasks)
  }

  return (
    <div className="container">
      <Header 
      clickAdd={() => 
        {setShowAddTask(!showAddTask)}} 
        btnText={showAddTask} 
        />

      {showAddTask ? <AddTask onAdd={addTask} /> : null}

      {tasks.length > 0 ? (
      <Tasks 
      tasks={tasks} 
      onToggle={toggleReminder} 
      onDelete={deleteTask}
      />) : ('no tasks to show')
      }
    </div>
  );
}

export default App;
