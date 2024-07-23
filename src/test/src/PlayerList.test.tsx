import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerList from '../../components/PlayerList';
import { Participant } from '../../domain';
import { useTranslation } from 'react-i18next';
import '../mocks/matchMediaMock';

// Mock do hook useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'remove') {
        return 'Remover';
      }
      return key;
    },
  }),
}));

describe('PlayerList Component', () => {
  const participant1: Participant = { name: 'John' };
  const participant2: Participant = { name: 'Jane' };

  test('renders the player list correctly', () => {
    render(<PlayerList participants={[participant1, participant2]} onRemoveParticipant={jest.fn()} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getAllByText('Remover')).toHaveLength(2);
  });

  test('calls onRemoveParticipant when remove button is clicked', () => {
    const onRemoveParticipant = jest.fn();
    render(<PlayerList participants={[participant1, participant2]} onRemoveParticipant={onRemoveParticipant} />);

    fireEvent.click(screen.getAllByText('Remover')[0]);

    expect(onRemoveParticipant).toHaveBeenCalledWith(0);
  });

  test('renders an empty player list correctly', () => {
    render(<PlayerList participants={[]} onRemoveParticipant={jest.fn()} />);

    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
    expect(screen.queryByText('Remover')).not.toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<PlayerList participants={[participant1, participant2]} onRemoveParticipant={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
