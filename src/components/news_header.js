/**
 * PC端头部组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Row, Col, Menu, Icon, Button, Modal, Tabs, Form, Input, message} from 'antd';

import logo from '../images/logo.png';

// 菜单项组件
const MenuItem = Menu.Item;
// 页签项
const TabPane = Tabs.TabPane;
// 表单项
const FormItem = Form.Item;

class NewsHeader extends Component {
    // 初始状态
    state = {
        current: 'top',
        username: null,
        visible: false,
    }

    // 判断登录状态
    componentDidMount () {
        // 读取保存到local中的username
        const username = localStorage.getItem('username');
        if(username) {
            // 更新状态
            this.setState({username})
          }
    }

    /*
     Menu点击回调函数 
     */
    handleClick = (e) => {
        // 登陆/注册点击弹出Modal
        if(e.key === 'logout'){
            this.setState({
                visible: true
            })
        }
        // 不为登陆/注册点击回调函数
        this.setState({
            current: e.key
        });
    }
    // 点击确定回调
    handleOk = (e) => {
      this.setState({
        visible: false,
      });
    }
    // 点击遮罩层或右上角叉或取消按钮的回调
    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    }
     /*
    处理提交登陆的请求
    */
    handleSubmit = (isLogin, event) => {
        // 阻止表单的默认行为
        event.preventDefault();
        // 收集表单输入的数据
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
    
        // 准备url
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if(isLogin) {
            url += `action=login&username=${username}&password=${password}`
          } else {
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
          }

        // 发请求
        axios.get(url)
          .then(response => {

            const result =response.data;
            // 登陆的返回
            if(isLogin){
                // 登陆失败
                if(!result){
                    message.error('登陆失败,请重新登录')
                }else{// 登陆成功
                    message.success('登陆成功')
                    // 读取返回的username/userId
                    const username = result.NickUserName
                    const userId = result.UserId
                    // 更新状态
                    this.setState({username})
                    // 保存username/userId
                    localStorage.setItem('username', username)
                    localStorage.setItem('userId', userId)
                     // 清除输入的数据
                    this.props.form.resetFields()
                    }

            }else{ // 注册的返回
                // 提示成功
                message.success('注册成功')
                 // 清除输入的数据
                this.props.form.resetFields()
            }
          })
        //关闭modal
        this.setState({visible: false})
    }
    /* 
    退出登录回调函数
    */
    logout = () => {
        //更新状态
        this.setState({username: null})
        // 清除保存的用户数据
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
      }

    render () {
        const {current, username, visible} = this.state;
        const { getFieldDecorator} = this.props.form;

        /* 导航条右部分 */
        let userShow = username // 判断用户是否登录
        
        ? (
            <MenuItem key="login" className="register">
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/user_center"><Button type="danger">个人中心</Button></Link>&nbsp;&nbsp;
                <Button onClick={this.logout}>退出</Button>
            </MenuItem>
        ) 
        : (
            <MenuItem key="logout" className="register" >
                <Icon type="smile"/ >登陆/注册
            </MenuItem>
        )

        return (
        <header>
            <Row type="flex">
                <Col span={1} />
                {/* logo部分 */}
                <Col span={3}>
                    <a href="/" className="logo">
                        <img src={logo} alt="logo" />
                        <span>新闻news</span>
                    </a>
                </Col>
                {/* 导航条部分 */}
                <Col span={19}>
                    <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" >
                        {/* 导航条左部分 */}
                        <MenuItem key="top">
                            <Icon type="star"/>头条
                        </MenuItem>
                        <MenuItem key="shehui">
                            <Icon type="star"/>社会
                        </MenuItem>
                        <MenuItem key="guonei">
                            <Icon type="star"/>国内
                        </MenuItem>
                        <MenuItem key="guoji">
                            <Icon type="star"/>国际
                        </MenuItem>
                        <MenuItem key="yule">
                            <Icon type="star"/>娱乐
                        </MenuItem>
                        <MenuItem key="tiyu">
                            <Icon type="star"/>体育
                        </MenuItem>
                        <MenuItem key="keji">
                            <Icon type="star"/>科技
                        </MenuItem>
                        <MenuItem key="shishang">
                            <Icon type="star"/>时尚
                        </MenuItem>
                        {/* 导航条右部分 */}
                        {userShow}
                    </Menu>
                    {/* Modal内容 */}
                    <Modal title="用户中心" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Tabs type="card">
                            <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                    <FormItem label="用户名">
                                    {
                                        getFieldDecorator('username')(
                                        <Input type='text' placeholder="请输入用户名"/>
                                        )
                                    }
                                    </FormItem>
                                    <FormItem label="密码">
                                    {
                                        getFieldDecorator('password')(
                                        <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }
                                    </FormItem>
                                    <Button type='primary' htmlType="submit">登陆</Button>
                                </Form>
                            </TabPane>

                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                    <FormItem label="用户名">
                                    {
                                        getFieldDecorator('r_userName')(
                                        <Input type='text' placeholder="请输入用户名"/>
                                        )
                                    }
                                    </FormItem>
                                    <FormItem label="密码">
                                    {
                                        getFieldDecorator('r_password')(
                                        <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }
                                    </FormItem>
                                    <FormItem label="确认密码">
                                    {
                                        getFieldDecorator('r_confirmPassword')(
                                        <Input type='password' placeholder="请输入确认密码"/>
                                        )
                                    }
                                    </FormItem>
                                    <Button type='primary' htmlType="submit">注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </Col>
                <Col span={1} />
            </Row>
        </header>
        )
    }
}

// 对NewsHeader组件进行包装产生一个新的组件类, 向NewsHeader传入一个属性: form
export default Form.create()(NewsHeader)