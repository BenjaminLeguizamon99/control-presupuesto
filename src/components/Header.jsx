import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({gastos, setGastos, presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}) => {
  return (
    <div>
        <header>
            <h1>Control de presupuesto</h1>
            {isValidPresupuesto ? (
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  setIsValidPresupuesto={setIsValidPresupuesto}
                  gastos={gastos}  
                  setGastos={setGastos}
                  setPresupuesto={setPresupuesto}
                /> )
            :
            (   <NuevoPresupuesto 
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  setIsValidPresupuesto={setIsValidPresupuesto}
            /> )
            
        
        }
                   
        </header>
    </div>
  )
}

export default Header