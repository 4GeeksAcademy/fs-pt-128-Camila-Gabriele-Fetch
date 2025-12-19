import React, { useState } from "react";


//include images into your bundle

//create your first component
const Home = () => {

	const url = 'https://playground.4geeks.com/todo/'

	const [listaTareas, setListaTareas] = useState([])
	
	const leerTareas = async () => {
		const respuesta = await fetch(`${url}/users/Camila`)
		console.log(respuesta);
		if (!respuesta.ok){
			console.log("Tarea no existente, crea una nueva");
			crearTarea ()
			return	
		}
		const data = await respuesta.json()
		console.log(data);	
	}

	const crearTarea = async () => {
		const respuesta = await fetch(`${url}/users/Camila` , {
			method: "POST"
		})
		console.log(respuesta);
		const data = await respuesta.json()
		console.log(data);
	}

	return (
		<>
			<div class="rounded" >
				<h3 className="text-center mt-3"><strong> ¿Que necesito? </strong></h3>
				<div className="input-group p-3">
					<input type="text" className="form-control" placeholder="Lo necesario . . ."/>
					<button className="btn btn-ligth border border-dark"> Agregar 🛒</button>
				</div>
			</div>
		</>
	);
};

export default Home;