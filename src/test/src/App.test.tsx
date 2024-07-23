import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../pages/App';
import { useTranslation } from 'react-i18next';
import useSecretSanta from '../../services/useSecretSanta';
import { Participant } from '../../domain';
import '../mocks/matchMediaMock';

// Mock do hook useSecretSanta
jest.mock('../../services/useSecretSanta');
const mockUseSecretSanta = useSecretSanta as jest.MockedFunction<typeof useSecretSanta>;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('App Component', () => {
  const participants: Participant[] = [];
  const addParticipant = jest.fn();
  const removeParticipant = jest.fn();
  const assignSecretSanta = jest.fn();
  const getParticipants = jest.fn(() => participants);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSecretSanta.mockReturnValue({
      participants,
      addParticipant,
      removeParticipant,
      assignSecretSanta,
      getParticipants,
    });
  });

  test('renders the initial UI correctly', () => {
    render(<App />);

    // Verificar se os elementos principais estão renderizados
    expect(screen.getByText('secret_santa_game')).toBeInTheDocument();
    expect(screen.getByText('start_game')).toBeInTheDocument();
    expect(screen.getByText('player_list')).toBeInTheDocument();
    expect(screen.getByText('results')).toBeInTheDocument();
    expect(screen.getByText('results_placeholder')).toBeInTheDocument();
    expect(screen.getByText('Secret Santa Game ©2023 Created by Fonteeboa')).toBeInTheDocument();

    // Verificar se os componentes específicos estão renderizados
    expect(screen.getByRole('button', { name: /start_game/i })).toBeInTheDocument();
  });
});
