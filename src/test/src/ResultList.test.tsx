import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../../components/ResultList';
import { Participant } from '../../domain';
import { useTranslation } from 'react-i18next';
import '../mocks/matchMediaMock';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params: any) => {
      if (key === 'give_gift_to') {
        return `${params.giver} will give a gift to ${params.receiver}`;
      }
      return key;
    },
  }),
}));

describe('ResultList Component', () => {
  const participant1: Participant = { name: 'John' };
  const participant2: Participant = { name: 'Jane' };
  const participant3: Participant = { name: 'Doe' };
  
  const assignments = new Map<Participant, Participant>([
    [participant1, participant2],
    [participant2, participant3],
    [participant3, participant1],
  ]);

  test('renders the result list correctly', () => {
    render(<ResultList assignments={assignments} />);

    expect(screen.getByText('John will give a gift to Jane')).toBeInTheDocument();
    expect(screen.getByText('Jane will give a gift to Doe')).toBeInTheDocument();
    expect(screen.getByText('Doe will give a gift to John')).toBeInTheDocument();
  });

  test('renders an empty result list correctly', () => {
    const emptyAssignments = new Map<Participant, Participant>();
    render(<ResultList assignments={emptyAssignments} />);

    expect(screen.queryByText('will give a gift to')).not.toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<ResultList assignments={assignments} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
