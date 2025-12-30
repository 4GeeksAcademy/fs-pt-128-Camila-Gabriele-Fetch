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
		console.log(response);
		if (!response.ok) {
			console.log("Usuario no existente");
			createUser()
			return
		}
		const data = await response.json()
		console.log(data);
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
		if (inputValue.trim()== "") return
		const response = await fetch(`${url}/todos/Camila`, {
			method: "POST",
			body: JSON.stringify({
				"label": inputValue,
				"is_done": false
			}),
			headers: {"Content-type": "application/json"}
		})
		if (response.ok) getTasks(); setInputValue("")
	}

	const deleteTask = async (id) => {
		const response = await fetch(`${url}/todos/${id}`, {
			method: "DELETE"
		})
		if (response.ok) getTasks()
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
						onKeyUp={(e) => {if (e.key=="Enter") addTask()}}
					/>
					<button
						className="btn btn-ligth border border-dark"
						onClick={() => addTask()} 
					>
						Agregar 🛒
					</button>
				</div>
				<ul>
					{taskList.map((task)=>(
						<li key={task.id}>{task.label}<button onClick={() => deleteTask(task.id)}>Borrar</button></li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Home;