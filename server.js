import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';
import { App, ConnectedApp } from './src/components/App';
import { actions, store } from './src/state';

const app = express();
app.use(express.static('public/dist'));

app.get('/html', (req, res) => {
  res.send('<h1>It works!</h1>');
});

app.get('/simple-ssr', (req, res) => {
  const app = renderToString(<h1>Hello React!</h1>);

  res.send(app);
});

app.get('/client-ssr', (req, res) => {
  const rawHtml = fs.readFileSync('./public/dist/index.html', 'utf8');
  const app = renderToString(<App todos={[]} />);
  const html = rawHtml.replace('{{react-app}}', app);
  res.send(html);
});

app.get('/only-ssr', (req, res) => {
  const app = renderToString(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
  );
  actions.loadTodos(() => {
    res.send(app);
  })(store.dispatch, store.getState);
});

app.get('/full-ssr', (req, res) => {
  actions.loadTodos(() => {
    const rawHtml = fs.readFileSync('./public/dist/index.html', 'utf8');
    const app = renderToString(
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
    res.send(html);
  })(store.dispatch, store.getState);
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
