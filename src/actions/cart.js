import { get, post, remove, patch } from 'api'
import * as types from './types.js'
import { setAlert } from 'actions/design'

export const getCart = () => dispatch => 
    (
        get(`api/cart`).then(json => {
            if (json.object) {
                dispatch(setCart(json.object))
            }
        })
    )

export const addToCart = (id, type, param) => dispatch => 
    (
        post(`api/cart/add/${type}/${id}`, false, param)
        .then(json => {
            if (json.status === 400) {
                dispatch(setAlert('Produto fora de estoque', 'error'))
            } else {
                dispatch(setAlert(json.message, 'success'))
                
            }
            return json.status === 200
        })
    )

export const removeFromCart = id => dispatch => 
    (
        remove(`api/cart/remove-item/${id}`, true).then(json => {
            dispatch(getCart())
            dispatch(getCartTotal())
        })
    )

export const getDelivery = id => dispatch => 
    (
        get(`api/cart/delivery/${id}`).then(json => {
            if (json.object) {
                console.log(json.object)
            }
        })
    )

export const getCartTotal = () => dispatch => 
    (
        get(`api/cart/value`).then(json => {
            if (json.object) {
                dispatch(setCartTotal(json.object))
            }
        })
    )

export const changeQuantity = (id, val) => dispatch => 
    (
        patch(`api/cart/change-quantity/${id}/${val}`).then(json => {
            if (json.object) {
                dispatch(getCart())
                dispatch(getCartTotal())
            }
        })
    )

export const setCart = data => 
    ({
        type: types.SET_CART,
        data
    })

export const setCartTotal = data => 
    ({
        type: types.SET_CART_TOTAL,
        data
    })

export const setUseCredits = value => 
    ({
        type: types.SET_USE_CREDITS,
        value
    })

export const setStep = step => 
    ({
        type: types.SET_STEP,
        step
    })

export const setGuestInfo = (data, key) => 
    ({
        type: types.SET_GUEST_INFO,
        data,
        key
    })