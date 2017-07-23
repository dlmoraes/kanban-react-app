import * as ActionTypes from './../constants/ActionTypes'

export default function cards(state = [], action) {

    switch (ActionTypes.CREATE_CARD) {
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