import {render} from '@testing-library/svelte';
import {expect} from 'chai';
import App from './App.svelte';

describe('<App>', () => {
  it('renders signup (on the login component)', () => {
    const {getByText} = render(App);
    const linkElement = getByText(/signup/i);
    expect(document.body.contains(linkElement));
  });
});
