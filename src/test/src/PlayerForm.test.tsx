import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerForm from '../../components/PlayerForm';
import { useTranslation } from 'react-i18next';
import '../mocks/matchMediaMock';

// Mock do hook useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        name: 'Nome',
        add_player: 'Adicionar Jogador',
        invalid_name: 'Por favor, insira o nome!',
      };
      return translations[key];
    },
  }),
}));

describe('PlayerForm Component', () => {
  const onAddParticipant = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form correctly', () => {
    render(<PlayerForm onAddParticipant={onAddParticipant} />);

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Jogador')).toBeInTheDocument();
  });

  test('shows error message when trying to submit empty form', async () => {
    render(<PlayerForm onAddParticipant={onAddParticipant} />);

    const button = screen.getByText('Adicionar Jogador');
    fireEvent.click(button);

    expect(await screen.findByText('Por favor, insira o nome!')).toBeInTheDocument();
    expect(onAddParticipant).not.toHaveBeenCalled();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<PlayerForm onAddParticipant={onAddParticipant} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
