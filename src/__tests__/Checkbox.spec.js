/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { CheckBox } from '../components/CheckBox'; // Bring in checkBox commponent

// clean up the DOM!
beforeEach(cleanup);


//Create a fake firebase implementation rather than using the real one
jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn()
                })),
            })),
        })),
    },
}));

describe('<CheckBox />', () => {
    describe('Success', () => {
        it('renders the task checkbox', () => {
            const { queryByTestId } = render(
                <CheckBox id="1" />
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
        });   
        
        it('renders the task checkbox and accepts a onClick', () => {
            const { queryByTestId } = render(
                <CheckBox id="1" />
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.click(queryByTestId('checkbox-action'));
        });

        it('renders the task checkbox and accepts a onKeyDown', () => {
            const { queryByTestId } = render(
                <CheckBox id="1" />
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('checkbox-action'));
        });
    });
});



/** 
 * On the console, run the following command
 * npm test --coverage   to fire testing
 * 
 * create coverage folder in the src directory
 */