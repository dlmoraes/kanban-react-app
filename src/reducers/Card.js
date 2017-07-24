import * as ActionTypes from './../constants/ActionTypes'

const INITIAL_STATE = []

export default function cards(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.CREATE_CARD:
            return [
                ...state,
                action.payload
            ]
            break;
        default:
            return state
    }

}