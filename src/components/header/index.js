import React, { Component } from 'react'
import Search from 'components/search'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnMain from 'components/buttons/btn_main.js'
import store from 'store'
import { toggleSideMenu } from 'actions/design.js'
import Tooltip from 'components/tooltip'
import CartHeader from 'components/cart/cart_header.js'
import { LoginForm, ZipForm } from 'components/forms'
import HeaderMenu from 'components/menu/header_menu.js'
import './style.css'

class Header extends Component {
    state = {
        dismissDownload: false,
        tooltip: false
    }

    handleDismissClick = () => {
        this.setState({ dismissDownload: true })
    }

    toggleSideMenu = state => e => {
        e.preventDefault()
        store.dispatch(toggleSideMenu(state))
    }

    closeTooltip = e => {
        if (! e.target.id && ! e.target.closest('#child')) {
            this.setState({tooltip: false})
            document.body.removeEventListener('click', this.closeTooltip)
        }
    }

    toggleTooltip = type => e => {
        e.stopPropagation()
        if (type === this.state.tooltip || ! e.target.id) {
            this.setState({tooltip: false})
            document.body.removeEventListener('click', this.closeTooltip)
        } else {
            this.setState({tooltip: type})
            document.body.addEventListener('click', this.closeTooltip)
        }
    }

    render() {
        const contentTooltip = this.props.user.guest ? LoginForm : HeaderMenu
        return (
            <div className="wrap-header">
                {  
                    ! this.state.dismissDownload 
                    ?   <div className="download-app-big p-5 d-sm-none">
                            <div className="d-block text-center text-white">
                                <div className="form-group">
                                    <strong>Use grátis o app do Visual Total</strong>
                                    <img src="/assets/icons/close-icon.png" onClick={this.handleDismissClick} className="img-icon pb-2 px-1 float-right" alt="" />
                                </div>
                                <div className="form-group">
                                    <span>Descubra a melhor experiência na hora de comprar pela internet</span>
                                </div>
                                <BtnMain
                                    className="btn-block"
                                    title="Baixar" />
                            </div>
                        </div>
                    :   ''
                }
                <div className="bg-dark effect6">
                    <div className="container text-white pt-4">
                        <div className="row pb-5 d-sm-none">
                            <div className="col-6 align-self-end">
                                <Link to="/"><img src="/assets/images/logo.png" alt="" className="img-fluid logo" /></Link>
                            </div>
                            <div className="col-6 align-self-end text-right px-5">
                                <i className="fa fa-bars fa-2x" onClick={this.toggleSideMenu(true)} aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="d-none d-sm-flex align-items-end justify-content-between mb-3">
                                    <Link to="/"><img src="/assets/images/logo.png" alt="" className="img-fluid" /></Link>
                                    <Link to="/about" className="text-white">Hairtylist & Makeup</Link>
                                    <Link to="/about" className="text-white">Barber</Link>
                                    <Link to="/about" className="text-white">Depilation</Link>
                                    <Link to="/about" className="text-white">Spa & Massage</Link>
                                    <Link to="/about" className="text-white">Esthetic Clinics</Link>
                                </div>
                                <div className="form-group">
                                    <Search />
                                </div>
                            </div>
                        
                            <div className="col-sm-5">
                                <div className="row align-items-end h-100">
                                    <div className="d-none d-sm-block col-12 order-sm-first align-self-start text-right">
                                        <BtnMain
                                            title="Baixe grátis o app do Visual Total" />
                                    </div>
                                    <div onClick={this.toggleTooltip('cart')} id="cart" className="col-6 col-sm-3 px-sm-0 form-group pointer">
                                        <img src="/assets/icons/cart-icon.png" id="cart" className="img-icon-header align-middle" alt="" />
                                        <div className="align-middle d-inline-block px-3" id="cart">
                                            Meu<br />
                                            <strong id="cart">Carrinho</strong>
                                        </div>
                                        {
                                            this.state.tooltip === 'cart'
                                            ?   <Tooltip title="Adicionado ao seu carrinho" content={CartHeader} close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                    <div onClick={this.toggleTooltip('login')} id="login" className="col-6 col-sm-4 px-sm-0 form-group pointer">
                                        {
                                            this.props.user.guest
                                            ?   <span>Bem vindo<br /><strong id="login">Entre ou cadastre-se</strong></span>
                                            :   <span>Olá, {this.props.user.data.first_name}<br /><strong id="login">Seja bem-vindo</strong></span>
                                        }
                                        {
                                            this.state.tooltip === 'login'
                                            ?   <Tooltip content={contentTooltip} close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                    <div onClick={this.toggleTooltip('zip')} id="zip" className="col-12 col-sm-5 px-sm-0 order-sm-first form-group pointer">
                                        <img src="/assets/icons/pin-icon.png" id="zip" className="img-icon-header align-middle" alt="" />
                                        <div className="align-middle d-inline-block px-3" id="zip">
                                            Enviar para<br />
                                            <strong id="zip">Bela Vista 01329900</strong>
                                        </div>
                                        {
                                            this.state.tooltip === 'zip'
                                            ?   <Tooltip title="Adicionar CEP" content={ZipForm} close={() => this.setState({tooltip: false})} />
                                            :   ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        user: {
            guest: state.user.guest,
            data: {
                first_name: state.user.data.first_name
            }
        }
    })

export default connect(
    mapStateToProps
)(Header)