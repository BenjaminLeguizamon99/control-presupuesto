import React from 'react'
import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        //Si el objeto gastoEditar contiene algo entonces que el formulario se llene con los datos de ese objeto
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha)
        }
    }, [])

    //Validación del formulario
    const handleSubmit = e => {
        e.preventDefault();
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios');
            
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
            guardarGasto({nombre, cantidad, categoria, id, fecha})
            
            setAnimarModal(false)
            setTimeout(() => {
                setModal(false);
            }, 1000);
    }


    //función y animación de ocultar modal
    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);           
        }, 300);
    }
  
    return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn}
                alt='cerrar el modal'
                onClick={ocultarModal}
            />
        </div>
        <form 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
            >
            <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

            {mensaje ? (<Mensaje tipo='error'>{mensaje}</Mensaje>) : null}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre del gasto</label>
                <input
                    type='text'
                    placeholder='Añade el nombre del gasto...'
                    id='nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            
            <div className='campo'>
                <label htmlFor='monto'>Monto del gasto</label>
                <input
                    type='text'
                    placeholder='Añade el monto del gasto...'
                    id='monto'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    >
                    <option value=''>--Seleccione--</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>

            <input type='submit' value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
        </form>
    </div>
  )
}

export default Modal