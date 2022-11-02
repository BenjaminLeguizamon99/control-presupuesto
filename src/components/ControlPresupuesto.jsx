import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {
  
    const [gastado, setGastado] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(()=> {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);
        setGastado(totalGastado);
        
        const totalDisponible = (presupuesto - totalGastado);
        setDisponible(totalDisponible);   
        
        //Calculo el porcentaje para mostrar este valor en la gráfica.
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(()=> {
            setPorcentaje(nuevoPorcentaje)
        }, 700)
        

    }, [gastos])


    const handleResetApp = () => {
        const resultado = confirm('¿Quiere eliminar presupuesto y gastos?');
        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        }
    }


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-AR', {
            style:'currency',
            currency:'ARS'
        })
    }
  
    return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2828' : '#3b82f6',
                    textColor: porcentaje > 100 ? '#dc2828' :'#3b82f6',
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>Resetear App</button>
            <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
            <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto