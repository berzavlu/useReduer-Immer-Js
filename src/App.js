import React, { useReducer } from 'react'
import produce from 'immer'
import logo from './logo.svg'
import './App.css'

const ENVIA_TEXTO = 'enviar-texto'
const RESET_TEXTO = 'resetear-texto'

const initialState = {
  mensaje: '',
}

const testReducer = (state, action) => {
  switch (action.type) {
    case ENVIA_TEXTO:
      return produce(state, (draftState) => {
        draftState.mensaje = 'holaaa'
      })
    case RESET_TEXTO: // sin immer
      return {
        ...state,
        mensaje: '',
      }
    default:
      return new Error('upsi')
  }
}

const testReducerDos = (draft, action) => {
  switch (action.type) {
    case ENVIA_TEXTO:
      draft.mensaje = 'holaaaa 2'
      return
    case RESET_TEXTO:
      draft.mensaje = ''
      return
    default:
      return new Error('upsi')
  }
}

const testReducerImmer = produce(testReducerDos)

function App() {
  const [state, dispatch] = useReducer(testReducer, initialState)
  const [stateDos, dispatchDos] = useReducer(testReducerImmer, initialState)

  const dispara = () => {
    const action = {
      type: ENVIA_TEXTO,
    }
    dispatch(action)
  }

  const disparaDos = () => {
    const action = {
      type: ENVIA_TEXTO,
    }
    dispatchDos(action)
  }

  const regresa = () => {
    const action = {
      type: RESET_TEXTO,
    }
    dispatch(action)
    dispatchDos(action)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {state.mensaje}
        {stateDos.mensaje}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div onClick={dispara}>
            mostrar mensaje
            <br /> 1
          </div>
          <div onClick={disparaDos}>
            mostrar mensaje
            <br /> 2
          </div>
        </div>

        <p onClick={regresa}>regresa al estado inicial</p>
      </header>
    </div>
  )
}

export default App
