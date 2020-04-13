import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { App } from '../App'; // Bring in checkBox commponent

// clean up the DOM before each test is run!
beforeEach(cleanup);

describe('<App />', () => {
    describe('Success', () => {
        it('renders the application', () => {
            const { queryByTestId } = render(<App />);
            expect(queryByTestId('application')).toBeTruthy();
            expect(
                queryByTestId('application').classList.contains('darkmode')
            ).toBeFalsy();
        });
    
        it('renders the application using dark mode', () => {
            const { queryByTestId } = render(<App darkModeDefault />);
            expect(queryByTestId('application')).toBeTruthy();
            expect(
                queryByTestId('application').classList.contains('darkmode')
            ).toBeTruthy();
        });
    });    
});