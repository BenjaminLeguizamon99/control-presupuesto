import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import {generarId} from './helpers/index'



function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
    );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  //Guardo el presupuesto y los gastos en el localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect ( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  //Creando useEffect para el filtro
  useEffect(()=> {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(()=> {
    if(Object.keys(gastoEditar).length > 0 ){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])


  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
    setGastoEditar({})
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      //Actualizamos el gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha= Date.now();
      setGastos([...gastos,   gasto])
    }
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }
  

  return (
   <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
    />
    
    {isValidPresupuesto && (
    <>
      <main>
        <Filtro 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos 
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
        />
      </main>
      <div className='nuevo-gasto'>
        <img 
          src={IconoNuevoGasto}
          alt='icono nuevo gasto'
          onClick={handleNuevoGasto}
        />
      </div>
    </>
    )}

    {modal && <Modal 
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal} 
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                />}


   </div>
   
  )
}

export default App
