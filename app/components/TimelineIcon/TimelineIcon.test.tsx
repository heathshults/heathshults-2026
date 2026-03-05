import { render } from '@testing-library/react';
import React from 'react';
import TimelineIcon, { TimelineIconProps } from './TimelineIcon';

describe('TimelineIcon', () => {
    const defaultProps: TimelineIconProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<TimelineIcon {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('TimelineIcon')).toBeTruthy();
    });
});
