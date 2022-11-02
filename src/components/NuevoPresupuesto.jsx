import {useState} from 'react'
import React from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
  
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if(!presupuesto || presupuesto < 0 ) {
            setMensaje('Presupuesto no válido!')
            return;
        }
        setMensaje('')
        setIsValidPresupuesto(true)
    }

    return (
    
    <div className='contenedor-presupuesto contenedor sombra'>
        <form 
            className='formulario'
            onSubmit={handlePresupuesto}    
        >
            
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input
                    type='number'
                    placeholder='Añade tu presupuesto'
                    className='nuevo-presupuesto'
                    onChange={e => {setPresupuesto(Number(e.target.value))}}
                />
            </div>
            <input 
                type='submit'
                value='Añadir'
            />

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto