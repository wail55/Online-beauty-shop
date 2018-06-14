import { get, post, remove } from 'api'
import * as types from './types.js'
import { getWishlist } from 'actions/user'

export const getCategories = () => dispatch => 
    (
        get(`api/categories`).then(json => {
            if (json.object) {
                dispatch(setCategories(json.object))
                return json.object
            }
        })
    )

export const getSubCategories = (type, catId) => dispatch => 
    (
        get(`api/categories/${type}/${catId}/subcategories`).then(json => {
            if (json.object) {
                dispatch(setSubCategories(json.object))
            }
        })
    )

export const getCategoriesByType = type => dispatch => 
    (
        get(`api/categories/${type}`).then(json => {
            if (json.object) {
                return json.object
            }
        })
    )

export const getCategoryList = (param, id) => dispatch => 
    (
        get(`api/categories/${param}`).then(json => {
            if (json.object) {
                dispatch(setCategoryList(json.object, param, id))
                return id
            }
        })
    )

export const addToWishList = (type, id) => dispatch => 
    (
        post(`api/wishlist/add/${type}/${id}`, true).then(json => {
            if (json.object) {
                console.log(json.object)
            }
        })
    )

export const removeFromWishList = (type, id) => dispatch => 
    (
        remove(`api/wishlist/remove-item/${type}/${id}`, true).then(json => {
            dispatch(getWishlist(`${type}s`))
        })
    )

export const getBlogs = () => dispatch => 
    (
        get(`api/blog/posts`).then(json => {
            if (json.object) {
                dispatch(setBlogs(json.object))
            }
        })
    )

export const getSearch = (type, param) => dispatch => 
    (
        post(`api/search`, false, param).then(json => {
            if (json.object) {
                dispatch(setSearch(json.object))
            }
        })
    )

export const setCategoryList = (data, key, id) => 
    ({
        type: types.SET_CATEGORY_LIST,
        data,
        key,
        id
    })

export const setCategories = data => 
    ({
        type: types.SET_CATEGORIES,
        data
    })

export const setSubCategories = data => 
    ({
        type: types.SET_SUB_CATEGORIES,
        data
    })

export const setCategory = (data, key) => 
    ({
        type: types.SET_CATEGORY,
        data,
        key
    })

export const setActiveCategory = cat => 
    ({
        type: types.SET_ACTIVE_CATEGORY,
        cat
    })

export const setSearch = data => 
    ({
        type: types.SET_SEARCH,
        data
    })

export const setBlogs = data => 
    ({
        type: types.SET_BLOGS,
        data
    })