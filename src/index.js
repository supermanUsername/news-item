import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';

// PC端组件
import App from './components/app.js';
import NewsContainer from './components/news_container.js';
import NewsDetail from './components/news_detail.js';
import UserCenter from './components/user_center.js';

// 移动端组件
import MobileApp from './components/MobileApp.js';
import MobileNewsContainer from './components/MobileNewsContainer.js';
import MobileNewsDetail from './components/MobileNewsDetail.js';
import MobileUserCenter from './components/MobileUserCenter.js';

// 响应式布局
import MediaQuery from 'react-responsive';

// css样式
import './componentsCss/pc.css';
import './componentsCss/mobile.css';

render((
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={NewsContainer} />
          <Route path='/news_detail/:uniquekey/:type' component={NewsDetail} />
          <Route path='/user_center' component={UserCenter} />
        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={MobileApp}>
          <IndexRoute component={MobileNewsContainer} />
          <Route path='/news_detail/:uniquekey' component={MobileNewsDetail} />
          <Route path='/user_center' component={MobileUserCenter} />
        </Route>
      </Router>
    </MediaQuery>
  </div>
),document.getElementById('root'))