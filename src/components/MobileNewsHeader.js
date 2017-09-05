/**
 * 移动端头部组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Icon, Modal, Tabs, Form, Input, Button, message} from 'antd';

import logo from '../images/logo.png';

// 页签项
const TabPane = Tabs.TabPane;
// 表单项
const FormItem = Form.Item;

class MobileNewsHeader extends Component {

  // 初始状态
  state = {
    username: null,
    visible: false
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

  // 登录注册回调
  showModal = () => {
    this.setState({
      visible: true,
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
    // 退出提醒
    message.error('退出成功');
    // 更新状态
    this.setState({username: null})
    // 清除保存的用户数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }

  render () {
    const { getFieldDecorator} = this.props.form;

    const {username} = this.state;
    
    const userCenter = username
      ? (<Link to='/user_center'>
          <span style={{fontSize:"17px", float:"right", marginRight:"12px", marginTop:"15px"}}>个人中心</span>
        </Link>)
      : (<span></span>)

    const userItem = username
      ? (<Icon type="poweroff" onClick={this.logout} />)
      : (<Icon type="smile-o" onClick={this.showModal} />)

    return (
      <div id="mobileheader">
        <header>
            <a href='/'>
              <img src={logo} alt="logo"/>
              <span>新闻news</span>
            </a>
            {/* 导航条右部分 */}
            {userItem}
            {/* 用户中心部分 */}
            {userCenter}
        </header>
        {/* Modal内容 */}
        <Modal title="用户中心" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
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
      </div>
    )
  }
}

// 对NewsHeader组件进行包装产生一个新的组件类, 向NewsHeader传入一个属性: form
export default Form.create()(MobileNewsHeader);