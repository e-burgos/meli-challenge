import { render } from '@testing-library/react';

import MeliChallengeUiComponents from './ui-components';

describe('MeliChallengeUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeliChallengeUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
