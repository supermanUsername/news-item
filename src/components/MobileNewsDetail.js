/**
 * 移动端新闻详情路由组件
 */
import React from 'react';
import {BackTop} from 'antd';
import axios from 'axios';

import NewsComment from './news_comments';

export default class MobileNewsDetails extends React.Component{

  // 初始化状态
  state = {
    news: ''
  }

  componentDidMount () {
    const {uniquekey} = this.props.params;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data
        // 修改状态
        this.setState({news})
        
        document.title = news.title;
      })
  }

  render () {
    return (
      <div style={{padding: '10px'}}>
        <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html: this.state.news.pagecontent}}></div>
        <hr/>
        <NewsComment uniquekey={this.props.params.uniquekey}/>
        <BackTop/>
      </div>
    )
  }
}