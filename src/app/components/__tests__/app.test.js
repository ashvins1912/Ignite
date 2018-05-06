import React from 'react';

import App from '../App';
import renderToJson from './util';

const markdown = {
  docRootIndexFile: () => <h1>Nothing to see here...</h1>
};

test('renders default page when there is not page match', () => {
  expect(
    renderToJson(<App markdown={markdown} location={{ pathname: '/' }} />)
  ).toMatchSnapshot();
});

test('renders matched page', () => {
  const foo = () => <h1>Foo man chu!</h1>;
  markdown.foo = foo;

  expect(
    renderToJson(<App markdown={markdown} location={{ pathname: '/foo' }} />)
  ).toMatchSnapshot();
});

test('renders renders index if firstPagePath specified but not actually in markdown map', () => {
  markdown.firstPagePath = 'firstPage';

  expect(
    renderToJson(<App markdown={markdown} location={{ pathname: '/' }} />)
  ).toMatchSnapshot();
});
test('renders first page at index if found', () => {
  const firstPage = () => <h1>I am the Intro</h1>;
  markdown.firstPage = firstPage;
  markdown.firstPagePath = 'firstPage';

  expect(
    renderToJson(<App markdown={markdown} location={{ pathname: '/' }} />)
  ).toMatchSnapshot();
});