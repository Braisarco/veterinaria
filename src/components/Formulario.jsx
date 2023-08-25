import {useState, useEffect} from 'react';
import Error from './Error';


function Formulario ({pacientes, setPacientes, paciente, setPaciente}){
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fechaAlta, setFechaAlta] = useState("");
    const [sintomas, setSintomas] = useState("");

    const [error, setError] = useState(false);

    useEffect(()=>{
        if ( Object.keys(paciente).length > 0 ){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFechaAlta(paciente.fechaAlta);
            setSintomas(paciente.sintomas);
        }
        
    }, [paciente]);


    const generarID = ()=>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random+fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre, propietario, email, fechaAlta, sintomas].includes("")){
            console.log("Hay al menos un campo vacio");
            setError(true);
        }else{
            setError(false);

            const objetoPaciente = {
                nombre,
                propietario,
                email,
                fechaAlta,
                sintomas
            }

            if (paciente.id){
                //Editar paciente existente
                objetoPaciente.id = paciente.id;
                
                const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
                setPacientes(pacientesActualizados);
                setPaciente({});
            }else{
                //Añadir paciente nuevo
                objetoPaciente.id = generarID();
                setPacientes([...pacientes, objetoPaciente])
            }

            //Reiniciar formulario
            setNombre("");
            setPropietario("");
            setEmail("");
            setFechaAlta("");
            setSintomas("");
        }   
    }

    return(
        <div className = "md:w-1/2 lg:w-2/5 mr-10">
            <h2 className = "font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className = "text-lg mt-5 text-center mb-10">
                Añade Pacientes y {" "}
                <span className = "text-indigo-600 font-bold text-lg">Administralos</span>
            </p>
            <form 
                className = "bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit = {handleSubmit}
            >
                {error && <Error>Todos los campos son obligatorios</Error> }
                <div className = "mb-5">
                    <label htmlFor = "mascota" className = "block text-grey-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        id = "mascota"
                        type = "text"
                        placeholder = "Nombre de la Mascota"
                        className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value = {nombre}
                        onChange = { (e) => setNombre(e.target.value) }
                    />
                </div>

                <div className = "mb-5">
                    <label htmlFor = "propietario" className = "block text-grey-700 uppercase font-bold">Nombre Propietario</label>
                    <input
                        id = "propietario"
                        type = "text"
                        placeholder = "Nombre del Propietario"
                        className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value = {propietario}
                        onChange = {(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className = "mb-5">
                    <label htmlFor = "email" className = "block text-grey-700 uppercase font-bold">Email</label>
                    <input
                        id = "email"
                        type = "email"
                        placeholder = "Email contacto Propietario"
                        className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className = "mb-5">
                    <label htmlFor = "alta" className = "block text-grey-700 uppercase font-bold">Fecha de alta</label>
                    <input
                        id = "alta"
                        type = "date"
                        className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value = {fechaAlta}
                        onChange = {(e) => setFechaAlta(e.target.value)}
                    />
                </div>

                <div className = "mb-5">
                    <label htmlFor = "sintomas" className = "block text-grey-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        id = "sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder = "Describe los sintomas"
                        value = {sintomas}
                        onChange = {(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input 
                    type = "submit"
                    className = "bg-indigo-600 w-full p-3 text-white uppercase text-center font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value = {paciente.id ? "Editar Paciente" : "Agregar paciente"}
                />
            </form>
        </div>
    )
}

export default Formulario;