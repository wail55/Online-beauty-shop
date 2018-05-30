import * as config from 'config'
import Cookies from 'js-cookie'

const responseHandler = response => {
    /*if (response.status == 401) {
        store.dispatch(logout())
        return
    }*/
    let promise = response.json()
    //let ok = response.ok
    /*promise.then(response => {
        if (response.validate) {
            for (let k in response.validate) {
                for (let j in response.validate[k]) {
                    store.dispatch(setAlert(response.validate[k][j], 'error'))
                }
            }
        }

        if (response.message && (! response.validate || response.validate == null)) {
            store.dispatch(setAlert(response.message, ok ? 'success' : 'error'))
        }

        if (response.errors) {
            for (let k in response.errors) {
                for (let j in response.errors[k]) {
                    store.dispatch(setAlert(response.errors[k][j], 'error'))
                }
            }
        }
    })*/
    return promise;
}

const getHeader = () => 
    ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        [config.APIKEY]: Cookies.get('token')
    })

export default {
    loginAsGuest() {
        return fetch(config.API_URL + '/guest', {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(responseHandler)
    },
    login(data) {
        return fetch(config.API_URL + '/login', {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },
    keepToken() {
        return fetch(config.API_URL + '/api/keeptoken', {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    registration(data) {
        return fetch(config.API_URL + '/signup/client', {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },
    updateUser(data) {
        return fetch(config.API_URL + '/api/user/edit', {
            method: 'put',
            credentials: 'same-origin',
            headers: getHeader(),
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },
    getUserAddresses() {
        return fetch(config.API_URL + '/api/user/main-address', {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getWishlist(type) {
        return fetch(`${config.API_URL}/api/wishlist/${type}s`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getCategories(param) {
        const url = param ? ('/api/categories/' + param) : '/api/categories'
        return fetch(config.API_URL + url, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader()
        })
        .then(responseHandler)
    },
    getCategoryList(param) {
        return fetch(`${config.API_URL}/api/categories/${param}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader()
        })
        .then(responseHandler)
    },
    getProducts(param) {
        return fetch(config.API_URL + '/api/products', {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
            body: JSON.stringify(param)
        })
        .then(responseHandler)
    },
    getCategoryProducts(param) {
        return fetch(config.API_URL + '/api/categories/product', {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getProduct(id) {
        return fetch(config.API_URL + '/api/product/' + id, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getServices(param) {
        return fetch(config.API_URL + '/api/services', {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
             body: JSON.stringify(param)
        })
        .then(responseHandler)
    },
    getServicesCategory(param) {
        return fetch(config.API_URL + '/api/services', {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
             body: JSON.stringify(param)
        })
        .then(responseHandler)
    },
    addToCart(id, type, param) {
        return fetch(`${config.API_URL}/api/cart/add/${type}/${id}`, {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
            body: JSON.stringify(param)
        })
        .then(responseHandler)
    },
    removeFromCart(id) {
        return fetch(`${config.API_URL}/api/cart/remove-item/${id}`, {
            method: 'delete',
            credentials: 'same-origin',
            headers: getHeader()
        })
        .then(responseHandler)
    },
    changeQuantity(id, val) {
        return fetch(`${config.API_URL}/api/cart/change-quantity/${id}/${val}`, {
            method: 'patch',
            credentials: 'same-origin',
            headers: getHeader()
        })
        .then(responseHandler)
    },
    getCart() {
        return fetch(`${config.API_URL}/api/cart`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getDelivery(id) {
        return fetch(`/api/cart/delivery/${id}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getCartTotal() {
        return fetch(`${config.API_URL}/api/cart/value`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    addToWishList(type, id) {
        return fetch(`${config.API_URL}/api/wishlist/add/${type}/${id}`, {
            method: 'post',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
    getCredits() {
        return fetch(`${config.API_URL}/api/credits`, {
            method: 'get',
            credentials: 'same-origin',
            headers: getHeader(),
        })
        .then(responseHandler)
    },
}