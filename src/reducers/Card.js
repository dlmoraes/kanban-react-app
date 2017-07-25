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
        case ActionTypes.EDIT_CARD:
            return state.map(card => {
                const { id } = action.payload
                if (id === card.id) return Object.assign({}, card, action.payload)
                return card
            })
            break;
        default:
            return state
    }

}