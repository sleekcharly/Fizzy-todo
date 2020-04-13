import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: 'OFFICE',
                projectId: '1',
                userId: 'asdfghjkl',
                docId: 'michael-scott',
            },
            {
                name: 'DAILY',
                projectId: '2',
                userId: 'asdfghjkl',
                docId: 'daily-office',
            },
            {
                name: 'FUTURE',
                projectId: '3',
                userId: 'asdfghjkl',
                docId: 'wake-up',
            },
            {
                name: 'MUSIC',
                projectId: '5',
                userId: 'asdfghjkl',
                docId: 'bella-ciao',
            },
        ],
        setProjects: jest.fn(),
    })),
}));

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('I am resolved!')),
            })),
        })),
    },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
    describe('Success', () => {
        it('renders <AddProject />', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
        });

        it('renders <AddProject /> and adds a project using OnClick', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();

            fireEvent.change(queryByTestId('project-name'), {
                target: { value: 'The project I love so much!' },
            });
            expect(
                queryByTestId('project-name').value
            ).toBe('The project I love so much!');

            fireEvent.click(queryByTestId('add-project-submit'));
        });

        it('renders <AddProject /> and adds a project using onKeyDown', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();

            fireEvent.change(queryByTestId('project-name'), {
                target: { value: 'The project I love so much!' },
            });
            expect(
                queryByTestId('project-name').value
            ).toBe('The project I love so much!');

            fireEvent.keyDown(queryByTestId('add-project-submit'));
        });

        it('hides the project overlay when cancelled using onClick', () => {
            const { queryByTestId, getByText } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.click(getByText('Cancel'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });

        it('hides the project overlay when cancelled using onKeyDown', () => {
            const { queryByTestId, getByText } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });

        it('hides the project overlay using singular and reverse action using onClick', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.click(queryByTestId('add-project-action'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });

        it('hides the project overlay using singular and reverse action using onKeyDown', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-project-action'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });
    });
});