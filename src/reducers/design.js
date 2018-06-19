import * as types from 'actions/types.js'
import { DEFAULT_IMG } from 'config'

const initialState = {
    sideMenu: false,
    leftMenu: {
        state: false,
        body: null
    },
    alerts: {
        messages: []
    },
    modal: {
    	open: false,
    	content: null,
        className: '',
        title: '',
        updater: ''
    },
    location: '/',
    lightbox: {
        current: 0,
        img: [DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG, DEFAULT_IMG],
        open: false,
    },
    blogs: []
}

export default function design(design = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_SIDE_MENU:
            return Object.assign({}, design, {
                sideMenu: action.state
            });
        case types.TOGGLE_LEFT_MENU:
            return Object.assign({}, design, {
                leftMenu: {
                    state: action.state,
                    body: action.body
                }
            });
        case types.TOGGLE_MODAL:
            return Object.assign({}, design, {
               modal: {open: action.open, content: action.content, className: action.className, title: action.title}
            });
        case types.UPDATE_MODAL:
            let tempModal = Object.assign({}, design.modal)
            tempModal.updater = action.updater

            return Object.assign({}, design, {
               modal: tempModal
            });
        case types.SET_LOCATION:
            return Object.assign({}, design, {
               location: action.location
            });
        case types.SHOW_ALERT:
            let tempMessages = Object.assign([], design.alerts.messages)
            tempMessages.push({ 'text': action.text, 'level': action.level })

            return Object.assign({}, design, {
                alerts: {
                    messages: tempMessages
                }
            });
        case types.REMOVE_ALERT:
            return Object.assign({}, design, {
                alerts: {
                    messages: []
                }
            });
        case types.TOGGLE_LIGHT_BOX:
            return Object.assign({}, design, {
                lightbox: {...action.data}
            });
        case types.SET_BLOGS:
            return Object.assign({}, design, {
                blogs: action.data
            });
        default:
            return design;
    }
}