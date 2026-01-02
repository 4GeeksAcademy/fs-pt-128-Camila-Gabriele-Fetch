import React, { useEffect, useState } from "react";


//include images into your bundle

//create your first component

//
const Home = () => {

	const url = 'https://playground.4geeks.com/todo'

	const [taskList, setTaskList] = useState([])
	const [inputValue, setInputValue] = useState("")

	const getTasks = async () => {
		const response = await fetch(`${url}/users/Camila`)
		if (!response.ok) {
			console.log("Usuario no existente");
			createUser()
			return
		}
		const data = await response.json()
		setTaskList(data.todos)
	}

	const createUser = async () => {
		const response = await fetch(`${url}/users/Camila`, {
			method: "POST"
		})
		console.log(response);
		if (response.ok) {
			getTasks()
		}
		const data = await response.json()
		console.log(data);
	}

	const addTask = async () => {
		if (inputValue.trim() == "") return
		const response = await fetch(`${url}/todos/Camila`, {
			method: "POST",
			body: JSON.stringify({
				"label": inputValue,
				"is_done": false
			}),
			headers: { "Content-type": "application/json" }
		})
		if (response.ok) getTasks(); setInputValue("")
	}

	const deleteTask = async (id) => {
		const response = await fetch(`${url}/todos/${id}`, {
			method: "DELETE"
		})
		if (response.ok) getTasks()
	}

	const editTask = async (id) => {
		const taskToEdit = taskList.find((task) => id == task.id)
		const response = await fetch(`${url}/todos/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				"label": taskToEdit.label,
				"is_done": !taskToEdit.is_done
			}),
			headers: {"Content-type": "application/json"}
		})
		if(response.ok) getTasks(); console.log(taskToEdit);
			
	}

	useEffect(() => {
		getTasks()
	}, [])

	return (
		<>
			<div className="rounded" >
				<h3 className="text-center mt-3"><strong> ¿Que necesito? </strong></h3>
				<div className="input-group p-3">
					<input
						type="text"
						className="form-control"
						placeholder="Lo necesario . . ."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyUp={(e) => { if (e.key == "Enter") addTask() }}
					/>
					<button
						className="btn btn-ligth border border-dark"
						onClick={() => addTask()}
					>
						Agregar 🛒
					</button>
				</div>
				<div className="container" style={{
					maxHeight: "30em",
					overflowY: "auto",
					lineHeight: "1.5em",
					textOverflow: "clip",
					whiteSpace: "normal",
				}}>
					{taskList.length > 0 ? (
						<ul>
							{taskList.map((task) => (
								<li className="d-flex justify-content-start" key={task.id}>
									{task.label} 
									<button className="btn d-flex justify-content-end" onClick={() => deleteTask(task.id)}>❌</button>
									<button onClick={() => editTask(task.id)}>📝</button>
								</li>
							))}
						</ul>
					) : (
						<div className="text-center mt-3">
							<p>No hay tareas, añadir tareas</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;