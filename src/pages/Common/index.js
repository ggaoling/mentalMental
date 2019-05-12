import React, { Component } from 'react';
import { Card, Input, Button } from '../../../node_modules/antd';

export default class Common extends Component {
    constructor(props) {
        super(props)
    }
    handleSubmit=()=>{

    }
    render() {
        return (
            <Card title="share something with your students">
                <Input.TextArea rows={10} placeholder="请输入"/>
                <Button type="priamry" onClick={this.handleSubmit}>提交</Button>
            </Card>
        )
    }
}