/**
 * PC端底部组件
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';

export default class NewsFooter extends Component {
    render () {
        return (
            <Row>
                <Col span="1"></Col>
                <Col span="22" style={{textAlign:"center",panding:"20px"}}>2017 ReactNews. All Rights Reserved.</Col>
                <Col span="1"></Col>
            </Row>
        )
    }
}
