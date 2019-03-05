import React, { Component } from 'react'
import { connect } from 'dva';


class SelectTests extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>pppp</div>
        )

    }
}

export default connect(({ selectTests, loading }) => ({
    selectTests,
    loading,
}))(SelectTests)