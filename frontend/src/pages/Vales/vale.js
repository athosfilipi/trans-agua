import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vales.css'


class Vales extends Component {

  constructor(props){
    super(props)
    this.state = {
        id: '',
        idEmpresa: '',
        empresa: '',
        cnpj: '',
        idMotorista: '',
        motorista: '',
        placa: '',
        localEntrega: '',
        valorUnitario: '',
        quantidadeCarga: '',
        totalLiquido: '',
        observacao: '',
        message: '',
        empresas: [],
        motoristas: [],
    }

    this.change = this.change.bind(this)
    this.moto = this.moto.bind(this)
    this.carga = this.carga.bind(this)
}

async componentDidMount(params){

    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    const user = await api.get(`listarempresas`, 
    {headers: {'Authorization': `Bearer ${token}`}})

    const moto = await api.get('listarmotoristas',
    {headers: {'Authorization': `Bearer ${token}`}})
    
    const pedido = await api.get(`pedido/${id}`,
    {headers: {'Authorization': `Bearer ${token}`}})

    const data = pedido.data

    this.setState({ 
      id: data.id,
      idEmpresa: data.idEmpresa,
      empresa: data.empresa,
      cnpj: data.cnpj,
      idMotorista: data.idMotorista,
      motorista: data.motorista,
      placa: data.placa,
      localEntrega: data.localEntrega,
      valorUnitario: data.valorUnitario,
      quantidadeCarga: data.quantidadeCarga,
      totalLiquido: data.totalLiquido,
      observacao: data.observacao,
      empresas: user.data, 
      motoristas: moto.data
    })
}

handleSubmit = async event => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    const pedido = await api.put(`pedido/${this.state.id}`, 
    {
        idEmpresa: this.state.idEmpresa, 
        empresa: this.state.empresa,
        cnpj: this.state.cnpj,
        idMotorista: this.state.idMotorista,
        motorista: this.state.motorista,
        placa: this.state.placa,
        localEntrega: this.state.localEntrega,
        valorUnitario: this.state.valorUnitario,
        quantidadeCarga: this.state.quantidadeCarga,
        totalLiquido: this.state.totalLiquido,
        observacao: this.state.observacao,
    },{
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(res => {
        this.setState({message: 'Vale emitido com sucesso!'})
        this.props.history.push({
            pathname: '/impressao', 
            state:{id: res.data.id}})
        
    })
    .catch(e => this.setState({message: `${e}`}))
}

change(event){
    let empresas = document.getElementById('empresa');
    let attr = empresas.options[empresas.selectedIndex].attributes

    this.setState({
        empresa: attr.name.value,
        cnpj: attr.cnpj.value, 
        idEmpresa: attr.id.value, 
        localEntrega: attr.endereco.value,
        valorUnitario: attr.valor.value
    })
            
}

moto(event){
    let motoristas = document.getElementById('motorista');
    let att = motoristas.options[motoristas.selectedIndex].attributes
    console.log(att)

    this.setState({
        motorista: att.name.value,
        idMotorista: att.id.value
    })
            
}

carga(event){
    let carga = event.target.value
    let total = carga * this.state.valorUnitario

    this.setState({
        totalLiquido: total
    })
            
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
                        <span>Painel de Controle ><strong> Vales </strong></span>
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>

                    <div className='cabecalho'>
                            {
                                this.state.message !== ''? (
                                    window.alert(this.state.message)
                                ) : ''
                            }

                        <div className='head'>
                            <Link 
                                to='/vales'>
                                <span>Voltar</span>
                            </Link>
                            <h3></h3>
                        </div>
                          <select 
                          id='empresa'    
                          onChange={this.change}
                          value={this.state.empresa}>
                          <option 
                          name='inicio' 
                          id='1' 
                          value='' 
                          disabled 
                          selected> Selecione a empresa</option>
                            {this.state.empresas.map(post => (
                                
                                <option 
                                key={post.id} 
                                name={post.nomefantasia} 
                                cnpj={post.cnpj}
                                valor={post.valorFixo}
                                endereco={post.endereco}
                                id={post.id}> {post.nomefantasia} </option>
                            ))}
                          </select>
                      </div>

                      <form className='novovale' onSubmit={this.handleSubmit}>
                            <label> Empresa
                                <input 
                                type='text' 
                                name='empresa' 
                                id='empresa'
                                onChange={e => this.setState({empresa: e.target.value})}
                                value={this.state.empresa}
                                />
                            </label>
                            <label>CNPJ
                                <input 
                                type='text' 
                                name='cnpj' 
                                id='cnpj'
                                onChange={e => this.setState({cnpj: e.target.value})}
                                value={this.state.cnpj}
                                />
                            </label>
                            <label>Motorista
                                <select 
                                  id='motorista'    
                                  onChange={this.moto}
                                  value={this.state.motorista}>

                                  <option 
                                  name='ini' 
                                  id='1' 
                                  value='' 
                                  disabled>Selecione o Motorista</option>
                                  {this.state.motoristas.map(moto => (
                                  
                                  <option 
                                  key={moto.id} 
                                  name={moto.nome}
                                  id={moto.id}> {moto.nome} </option>
                              ))}
                                </select>
                            </label>
                            <label> Placa
                                <input 
                                type='text' 
                                name='placa' 
                                id='placa'
                                onChange={e => this.setState({placa: e.target.value})}
                                value={this.state.placa}
                                />
                            </label>
                            <label> Local de Entrega
                                <input 
                                type='text' 
                                name='numero' 
                                id='localEntrega'
                                onChange={e => this.setState({localEntrega: e.target.value})}
                                value={this.state.localEntrega}
                                />
                            </label>
                            <label> Quantidade de Carga
                                <input 
                                type='text' 
                                name='quantidadeCarga' 
                                id='quantidadeCarga'
                                onChange={e => this.setState({quantidadeCarga: e.target.value})}
                                onBlur={this.carga}
                                value={this.state.quantidadeCarga}
                                />
                            </label>
                            <label> Total
                                <input 
                                type='text' 
                                name='total' 
                                id='total'
                                onChange={e => this.setState({totalLiquido: e.target.value})}
                                value={this.state.totalLiquido}
                                />
                            </label>
                            <label> Observação
                                <input 
                                type='text' 
                                name='observacao' 
                                id='observacao'
                                onChange={e => this.setState({observacao: e.target.value})}
                                value={this.state.observacao}
                                />
                            </label>

                            <input className='botao' type='submit' value='Salvar' />
                          </form>
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Vales;