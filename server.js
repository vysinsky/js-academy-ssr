import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedApp } from './src/components/App';
import { actions, store } from './src/state';
import 'isomorphic-fetch';

// ExpressJS is one of the most popular HTTP servers for NodeJS
const app = express();
app.use(express.static('public/dist'));

app.get('/ssr', (req, res) => {
  const rawHtml = fs.readFileSync('./public/dist/index.html', 'utf8');
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
  );
  const html = rawHtml.replace(
    '{{react-app}}',
    `
    ${app}
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
      /</g,
      '\\u003c',
    )}
    </script>
  `,
  );
  actions.loadTodos(() => {
    res.send(html);
  })(store.dispatch, store.getState);
});

// Start the application
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.info(`Running on ${port}...`);
});
