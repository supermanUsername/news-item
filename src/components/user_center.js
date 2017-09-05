/**
 * PC端用户中心路由组件
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col, Tabs, Card, Upload, Icon, Modal, Alert} from 'antd';
import {Link} from 'react-router';

export default class UserCenter extends Component {

  // 初始状态
  state = {
    collections: [],
    comments: [],
    previewVisible: false,
    previewImage: '',// 头像设置初始状态
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]
  }

  componentDidMount () {
    const userId = localStorage.getItem('userId');

    if(!userId){
      return;
    }

    // ajax请求收藏列表数据
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const collections = response.data;
        // 修改状态
        this.setState({collections});
      })

    // ajax请求评论列表数据
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
    .then(response => {
      const comments = response.data;
      // 修改状态
      this.setState({comments});
    })
  }

  // 头像设置
  handleCancel = () => this.setState({ previewVisible: false })

  // 显示预览图片(显示 modal)
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  // 选择上传图片
  handleChange = ({ fileList }) => this.setState({ fileList })


  render () {
    const TabPane = Tabs.TabPane;

    const {collections, comments} = this.state;
    // 头像设置
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    // 我的收藏
    const collectionList = collections.length
      ? <h2>没有收藏哦~~~</h2>
      : collections.map((collection,index) => (
        <Card key={index} title={`收藏-${index}`} 
          extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ))
    // 我的评论
    const commentList = comments.length
    ? <h2>没有评论哦~~~</h2>
    : comments.map((comment,index) => (
      <Card key={index} title={`评论-${index}`}  
        extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
        {comment.Comments}
      </Card>
    ))
    
    return (
      <div>
        <Row>
          <Col span="1" />
          <Col span="22">
          <Tabs defaultActiveKey="1">
            <TabPane tab="我的收藏" key="1">
              {collectionList}
            </TabPane>
            <TabPane tab="我的评论" key="2">
              {commentList}
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}>
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
          </Col>
          <Col span="1" />
        </Row>
      </div>
    )
  }
}