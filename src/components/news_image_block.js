/**
 * PC端图片新闻列表组件
 */
import React, {Component,PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';

export default class NewsImageBlock extends Component {
    // 初始状态
    state = {
        newsList: null
    }
    // 类型限制
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
    }

    

    componentDidMount () {
        // 发送ajax请求, 得到新闻列表数据
        const {type,count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    
        axios.get(url)
            .then(response => {
                const newsList = response.data.map(
                    ({uniquekey, title, author_name, thumbnail_pic_s}) => 
                    ({uniquekey, title, author_name, thumbnail_pic_s})
                )
                // 更新状态
                this.setState({newsList})
            })

    }

    render () {
        const {cardTitle, cardWidth, imageWidth, type} = this.props
        const {newsList} = this.state;

        // 图片样式对象
        const imageStyle = {
            width: imageWidth,
            height: '90px',
            display: 'block'
        }
    
        // 标题样式对象
        const titleStyle = {
            width: imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }

        const contentUI = !newsList 
        ? <h2>没有任意新闻</h2>
        : (
                newsList.map((news, index) => (
                    <div key={index} className="imageblock">
                        <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                        <div>
                            <img src={news.thumbnail_pic_s} style={imageStyle}/>
                        </div>
                        <div className="custom-card">
                            <h3 style={titleStyle}>{news.title}</h3>
                            <p>{news.author_name}</p>
                        </div>
                        </Link>
                    </div>
                ))
        )

        return (
            <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
                {
                    contentUI
                }
            </Card>
        )
    }
}
