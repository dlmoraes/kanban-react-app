import React, { Component } from 'react'

class InputEditable extends Component {

    constructor(props) {
        super(props)

        this.handleClickToEdit = this.handleClickToEdit.bind(this)
    }

    renderEditable() {
        return (
            <div>
                <input type="text"
                    className="form-control"
                    defaultValue={this.props.text}
                />
            </div>
        )
    }

    handleClickToEdit() {
        const { id } = this.props
        this.props.clickToEdit(id)
    }

    renderText() {
        return (
            <div>
                <div className="col-xs-10">
                    <input type="text"
                        className="form-control"
                        defaultValue={this.props.text}
                        onClick={this.handleClickToEdit}
                        readOnly />
                </div>
            </div>
        )
    }

    render() {
        if (this.props.edit) {
            return this.renderEditable()
        }
        return this.renderText()
    }

}

export default InputEditable