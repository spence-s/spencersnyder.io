import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import Button from '../src/components/Button';
import 'jest-styled-components';

test('it works', () => {
  const { container } = render(<Button />);
  // expect(container.firstChilc).toHaveStyleRule({display: 'inline-block'})
  expect(container.firstChild).toMatchSnapshot();
});
