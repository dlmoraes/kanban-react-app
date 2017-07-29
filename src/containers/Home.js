import React, { Component } from 'react'
import Panels from './../components/Panels'


import './Home.scss'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="col-xs-12">
                    <button className="btn btn-primary">
                        <i className="ion-plus-round"></i> New Panel
                    </button>
                </div>
                <Panels 
                    panels={[]}
                />
            </div>
        )
    }

}

export default Home