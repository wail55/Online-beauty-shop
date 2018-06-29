import * as types from 'actions/types.js'

const initialState = {
    item: {},
    total: 0,
    use_credits: false,
    step: 1,
    guest_card: {},
    proffesional: {
        data: {
            user: {
                first_name: '',
                last_name: ''
            }
        },
        hours: {}
    }
    
}

export default function schedule_cart(schedule_cart = initialState, action = {}) {
    switch (action.type) {
        case types.SET_SCHEDULE_CART:
            return Object.assign({}, schedule_cart, {
                item: action.data
            });
        case types.SET_SCHEDULE_TOTAL:
            return Object.assign({}, schedule_cart, {
                total: action.value
            });
        case types.SET_SCHEDULE_USE_CREDITS:
            return Object.assign({}, schedule_cart, {
                use_credits: action.value
            });
        case types.SET_SCHEDULE_STEP:
            return Object.assign({}, schedule_cart, {
                step: action.step
            });
        case types.SET_GUEST_CARD:
            return Object.assign({}, schedule_cart, {
                guest_card: action.data
            });
        case types.SET_PROFFESIONAL:
            return Object.assign({}, schedule_cart, {
                proffesional: action.data
            });
        default:
            return schedule_cart;
    }
}