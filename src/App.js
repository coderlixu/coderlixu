import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';

import routes from './router';
import store from './store'

import JLAppHeader from '@/components/app-header';
import JLAppFooter from '@/components/app-footer';
import JLAppPlayerBar from'./pages/player/app-player-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <JLAppHeader/>
          {renderRoutes(routes)}
        <JLAppFooter/>
        <JLAppPlayerBar/>
      </HashRouter>
    </Provider>
    
  )
})
