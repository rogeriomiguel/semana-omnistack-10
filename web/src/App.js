import React, { useEffect, useState } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
import DevFormEdit from './components/DevFormEdit'

function App() {
  const [devs , setDevs] = useState([])
  const [erasedDev, setErasedDev] = useState(false)
  const [isEditDev, setIsEditDev] = useState(false)
  const [user, setUser] = useState('')

  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [erasedDev, isEditDev])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }
  
  async function handleEditDev(data) {
    const response = await api.patch(`/devs/${user}`, data)

    setIsEditDev(false)
  }

  async function eraseDev() {
    erasedDev === false ? setErasedDev(true) : setErasedDev(false)
  }

  function editDev(user) {
    setUser(user)
    setIsEditDev(true)
  }

  function Form() {
    if(isEditDev === false) {
      return (
        <>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}/>
        </>
      )
    } else {
      return (
        <>
          <strong>Editar Cadastro</strong>
          <DevFormEdit onSubmit={handleEditDev}/>
        </>
      )
    }
  }

  return (
    <div id="app">
      <aside>
        <Form/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem onClick2={editDev} onClick={eraseDev} key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App