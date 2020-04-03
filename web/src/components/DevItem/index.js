import React from 'react'
import api from '../../services/api'

import './style.css'

function DevItem({dev, onClick, onClick2}) {
  async function eraseDev(e) {
    e.preventDefault()

    await api.delete(`/devs/${dev.github_username}`)

    onClick()
  }

  function editDev(e) {
    e.preventDefault()

    onClick2(dev.github_username)
  }

  return (
    <li className="dev-item">
      <a href="http://localhost:3000/" className="erase-dev" onClick={eraseDev}>Excluir dev</a>
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        
      </header>
      
      <p>{dev.bio}</p>
      <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
      <a href="http://localhost:3000/" className="edit-dev" onClick={editDev}>Edit dev</a>
    </li>
  )
}

export default DevItem