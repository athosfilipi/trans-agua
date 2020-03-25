import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png'

export default function menu() {
  return (
    <>
    <div className='sidebar'>
      <img src={logo} alt='Trans Água' />

      <ul>
        <Link to='/dashboard'>
          <li>Home</li>
        </Link>

        <Link to='/clientes'>
          <li>clientes</li>
        </Link>

        <Link to='/vales'>
          <li>Vales</li>
        </Link>
        
        <Link to='/valesantigos'>
          <li>Vales Antigos</li>
        </Link>
        
        <Link to='/relatorios'>
          <li>Relatórios</li>
        </Link>

        <Link to='/motoristas'>
          <li>Motoristas</li>
        </Link>

        <Link to='/logout'>
          <li>Sair</li>
        </Link>
      </ul>
    </div>
    </>
  );
}
