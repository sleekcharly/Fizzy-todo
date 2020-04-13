import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';
import { FaItalic } from 'react-icons/fa';

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
    })),
}));

jest.mock('../hooks', () => ({
    useTasks: () => ({
        tasks: [
            {
                id: 'mx2taaXpF38vYqMGbVtY',
                archived: false,
                date: '21/07/2019',
                projectId: '1',
                task:
                    'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
                userId: 'asdfghjkl',
            },
        ],
    }),
}));

beforeEach(cleanup);

describe('<Tasks />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders tasks', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));
        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });

    it('renders task with a project title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1',
        }));
        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('OFFICE');
    });

    it('renders task with a collated title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));
        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });
});