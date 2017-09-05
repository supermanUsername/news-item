/**
 * 移动端根路由组件
 */
import React, {Component} from 'react';
import MobileNewsHeader from './MobileNewsHeader';
import NewsFooter from './news_footer';

export default class MobileApp extends Component {
    render () {
        return (
            <div>
                <MobileNewsHeader />
                {this.props.children}
                <NewsFooter />
            </div>
        )
    }
}
