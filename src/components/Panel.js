import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cards from './Cards'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

import CardActions from './../actions/CardActions'
import PanelActions from './../actions/PanelActions'
import InputEditable from './InputEditable'
import * as Types from './../constants/Types'

class Panel extends Component {

    static propTypes = {
        createCard: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.handleCreateCard = this.handleCreateCard.bind(this)
    }

    handleCreateCard() {
        this.props.createCard()
    }

    render() {
        const { cards, panel, connectDragPreview, connectDropTarget, connectDragSource } = this.props
        return connectDragPreview(
            connectDropTarget(
                <div className="col-md-3">
                    {connectDragSource(
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <InputEditable
                                    id={panel.id}
                                    edit={panel.edit}
                                    text={panel.text}
                                    editComponent={this.props.editPanel}
                                    clickToEdit={this.props.editPanel}
                                    deleteComponent={this.props.deletePanel}
                                />
                            </div>
                            <div className="panel-body">
                                <Cards
                                    cards={cards}
                                    clickToEdit={this.props.editCard}
                                    editCard={this.props.editCard}
                                    deleteCard={this.props.deleteCard}
                                    moveCard={this.props.moveCard}
                                />
                            </div>
                            <div className="panel-footer">
                                <button className="btn btn-primary" onClick={this.handleCreateCard}>
                                    <i className="ion-plus-round"></i> CARD
                    </button>
                            </div>
                        </div>
                    )}
                </div>
            )
        )
    }

}

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCard: () => dispatch(CardActions.createCard('New Task')),
        editCard: (id, value) => {
            const edited = { id }
            if (!value) {
                edited.edit = true
            } else {
                edited.edit = false
                edited.text = value
            }
            dispatch(CardActions.editCard(edited))
        },
        deleteCard: (id) => dispatch(CardActions.deleteCard(id)),
        moveCard: (id, monitorId) => dispatch(PanelActions.moveCard(id, monitorId))
    }
}

// Drag and Drop
const dragNDropSrc = {
    beginDrag(props) {
        return { id: props.panel.id }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
})

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

const panelHoverTarget = {
    hover(props, monitor) {
        const { id } = props.panel.id
        const monitorProps = monitor.getItem()
        const monitorType = monitor.getItemType()
        const monitorId = monitorProps.id

        if (id !== monitorId) {
            return props.movePanel(id, monitorId)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    DragSource(Types.PANEL, dragNDropSrc, collect)(
        DropTarget(Types.PANEL, panelHoverTarget, collectTarget)(Panel)
    )
)