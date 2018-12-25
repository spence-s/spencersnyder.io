import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import Button from '../src/components/Button';
import Header from '../src/components/header';
import 'jest-styled-components';

test('Button matches snapshot', () => {
  const { container } = render(<Button />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Header matches snapshot', () => {
  const { container } = render(<Header />);
  expect(container.firstChild).toMatchSnapshot();
});
