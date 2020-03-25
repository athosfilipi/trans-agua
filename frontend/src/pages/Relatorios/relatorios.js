import React, { Component } from 'react';
import Datepicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Menu from '../../components/Header'
import './relatorios.css'

import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', pt)

class Relatorios extends Component {

    constructor(props){
        super(props)
        this.state = {
            pedido: [],
            moto: [],
            motorista: '',
            total: '0',
            startDate: new Date(),
            finalDate: new Date(),
        }

        this.moto = this.moto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')

        const moto = await api.get('listarmotoristas', 
        {headers: {Authorization: `Bearer ${token}`}})

        this.setState({ moto: moto.data })
    }

    moto(event){
        let motoristas = document.getElementById('motorista');
        let att = motoristas.options[motoristas.selectedIndex].attributes
        console.log(att)

        this.setState({
            motorista: att.name.value
        })
                
    }

    handleSubmit = async event => {
        event.preventDefault()

        const start = this.state.startDate.toLocaleDateString()
        const startsplit = start.split('/').reverse().join('/')

        const final = this.state.finalDate.toLocaleDateString()
        const finalsplit = final.split('/').reverse().join('/')

        const token = localStorage.getItem('token')
        const relatorio = await api.post(`relatorio`, 
        {
            startDate: `${startsplit} 00:00:00`, 
            finalDate: `${finalsplit} 23:59:59`,
            motorista: this.state.motorista,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })

        this.setState({pedido: relatorio.data, total: relatorio.data.length})
        console.log(relatorio.data)
    }
    
    render() {
        return(
            <>
            <div className='geral'>
                <div className='menu'>
                    <Menu />
                </div>

                <div className='content'>
                    <header>
                        <span>Painel de Controle ><strong> Clientes</strong></span>
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Gerar Relatório</h3>
                                <Link to='/motoristas/novomotorista'><span>Cadastrar Motorista</span></Link>
                            </div>

                            <form className='form' onSubmit={this.handleSubmit}>
                                <label> Data de Inicio
                                    <Datepicker 
                                    selected={this.state.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => this.setState({startDate: date})} 
                                    />
                                </label>
                                
                                <label> Data Final
                                    <Datepicker 
                                    selected={this.state.finalDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => this.setState({finalDate: date})} 
                                    />
                                </label>
                                
                                <label> Motorista
                                    <select 
                                    id='motorista'    
                                    onChange={this.moto}
                                    value={this.state.motorista}>

                                        <option 
                                        name=''
                                        id='1' 
                                        value='' 
                                        >Selecione o Motorista</option>
                                        {this.state.moto.map(moto => (
                                        
                                        <option 
                                        key={moto.id} 
                                        name={moto.nome}
                                        id={moto.id}> {moto.nome} </option>
                                        ))}
                                    </select>
                                </label>
                                
                                <input class='botao' type='submit' name='Buscar' value='Buscar' />
                            </form>

                            <div className='tabs-rel'>
                                
                                {
                                    this.state.total !== '0'? (
                                        <>
                                        <span>NOME</span>
                                        <span>MOTORISTA</span>
                                        <span>PEDIDO</span>
                                        <span>TOTAL: {this.state.total}</span>
                                        </>
                                    ) : ''
                                }
                            </div>

                            {this.state.pedido.map(post => (
                                <div className='clientes-rel' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.motorista} </span>
                                    <span> {post.id} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/vales/vale',
                                            state: {id: post.id}
                                            }}>
                                            <button className='see'>Ver | Editar</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}                         
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Relatorios;