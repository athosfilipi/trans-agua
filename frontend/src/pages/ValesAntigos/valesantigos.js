import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './valesantigos.css'


class Vales extends Component {

    constructor(props){
      super(props)
      this.state = {
          pedidos: [],
          lastPage: '',
          paginate: 1,
      }

    this.next = this.next.bind(this)
    this.back = this.back.bind(this)
    this.unique = this.unique.bind(this)
  }

  async next(){
    const token = localStorage.getItem('token')
    const user = await api.get(`pedidosantigos`, 
    {headers: {'Authorization': `Bearer ${token}`, pagina: `${Number(this.state.paginate) + 1}`}})

    this.setState( { pedidos: [].concat(user.data.data), paginate: `${Number(this.state.paginate) + 1}`})

 }
 async back(){
    const token = localStorage.getItem('token')
    const user = await api.get(`pedidosantigos`, 
    {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate - 1}`}})

    this.setState( { pedidos: [].concat(user.data.data), paginate: `${this.state.paginate - 1}`})

 }

 async unique(e){
    const token = localStorage.getItem('token')
    const key = e.target.id
    const user = await api.get(`pedidosantigos`, 
    {headers: {'Authorization': `Bearer ${token}`, pagina: `${key}`}})

    this.setState( { pedidos: [].concat(user.data.data), paginate: key})
 }

 createPagination = () => {
    const limite = 2;
    const page = []
    let i

    let startPage = (this.state.paginate - limite) > 1 ? 
    this.state.paginate - limite : 
    1;

    let endPage = (this.state.paginate + limite) < this.state.lastPage ? 
    Number(Number(this.state.paginate) + Number(limite)) :
    this.state.lastPage;

    if (this.state.paginate > 1) { page.push(<span onClick={this.back}>«</span>) }
    
    if(this.state.lastPage > 1 && this.state.paginate <= this.state.lastPage){
        if(this.state.lastPage > 3){
            if(this.state.paginate <=3){
                for(i = 1; i <= 5; i++){
                    if(i == this.state.paginate){
                        page.push(<p prop={`${i}`} 
                        className='active' 
                        id={`${i}`} 
                        onClick={this.unique}>{i}</p>)
                    } else{
                        page.push(<p prop={`${i}`}
                        id={`${i}`} 
                        onClick={this.unique}>{i}</p>)
                    }
                }
            } else{
                for(i = startPage; i <= endPage; i++){
                    if(i == this.state.paginate){
                        page.push(<p prop={`${i}`} 
                        className='active' 
                        id={`${i}`} 
                        onClick={this.unique}>{i}</p>)
                        } else{
                            page.push(<p prop={`${i}`}
                            id={`${i}`} 
                            onClick={this.unique}>{i}</p>)
                        }
                }
            }
        } else{
            for(i = startPage; i <= endPage; i++){
                if(i == this.state.paginate){
                    page.push(<p prop={`${i}`} 
                    className='active' 
                    id={`${i}`} 
                    onClick={this.unique}>{i}</p>)
                    } else{
                        page.push(<p prop={`${i}`}
                        id={`${i}`} 
                        onClick={this.unique}>{i}</p>)
                    }
            }
        } 
    }

    if (endPage <= this.state.lastPage - 1) { page.push(<span onClick={this.next}>»</span>) }

    return page
}

    async componentDidMount(){
        const token = localStorage.getItem('token')

        const pedido = await api.get(`pedidosantigos`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.paginate}})

        this.setState({ pedidos: pedido.data.data, lastPage: pedido.data.lastPage })
        console.log(pedido.data)
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
                            <div className='head'>
                                <h3>Últimos Vales Emitidos</h3>
                                <Link to='/vales/novovale'><span>Novo Vale</span></Link>
                            </div>

                            <div className='tabs-va'>
                                <span>EMPRESA</span>
                                <span>NÚMERO</span>
                            </div>

                            {this.state.pedidos.map(post => (
                                <div className='clientes-va' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.id} </span>
                                    <div>
                                    <Link to={{
                                            pathname:'/valesantigos/vale',
                                            state: {id: post.id}
                                            }}><button className='see'>Ver</button></Link>
                                    </div>
                                </div>
                            ))}
                            
                            <div className='pagination'>
                                {this.createPagination()}                                
                            </div>
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Vales;