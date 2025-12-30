import React, { useState } from "react";


//include images into your bundle

//create your first component
const Home = () => {

	const url = 'https://playground.4geeks.com/todo/'

	const [taskList, setTaskList] = useState([])
	
	const readTask = async () => {
		const answer = await fetch(`${url}/users/Camila`)
		console.log(answer);
		if (!answer.ok){
			console.log("Tarea no existente, crea una nueva");
			createTask ()
			return	
		}
		const data = await answer.json()
		console.log(data);	
	}

	const createTask = async () => {
		const responseCreated = await fetch(`${url}/users/Camila` , {
			method: "POST"
		})
		console.log(responseCreated);
		const data = await responseCreated.json()
		console.log(data);
	}

	return (
		<>
			<div className="rounded" >
				<h3 className="text-center mt-3"><strong> ¿Que necesito? </strong></h3>
				<div className="input-group p-3">
					<input type="text" className="form-control" placeholder="Lo necesario . . ."/>
					<button className="btn btn-ligth border border-dark" onClick={readTask}> Agregar 🛒</button>
				</div>
			</div>
		</>
	);
};

export default Home;