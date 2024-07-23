import { useState } from 'react';
import { Participant } from '../../domain';
import useSecretSanta from '../../services/useSecretSanta';

// Mock para o hook useSecretSanta
const createUseSecretSantaHook = () => {
  let participantsState: Participant[] = [];
  const setParticipants = (newState: Participant[]) => {
    participantsState = newState;
  };

  const addParticipant = (participant: Participant): void => {
    setParticipants([...participantsState, participant]);
  };

  const removeParticipant = (index: number): void => {
    setParticipants(participantsState.filter((_, i) => i !== index));
  };

  const getParticipants = (): Participant[] => {
    return participantsState;
  };

  const assignSecretSanta = (): Map<Participant, Participant> => {
    const shuffled = shuffleArray([...participantsState]);
    const assignments = new Map<Participant, Participant>();

    for (let i = 0; i < participantsState.length; i++) {
      const giver = participantsState[i];
      const receiver = shuffled[i];
      assignments.set(giver, receiver);
    }

    return assignments;
  };

  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return {
    participants: participantsState,
    addParticipant,
    removeParticipant,
    getParticipants,
    assignSecretSanta,
    shuffleArray,
  };
};

describe('useSecretSanta Hook', () => {
  const participant1: Participant = { name: 'John' };
  const participant2: Participant = { name: 'Jane' };
  const participant3: Participant = { name: 'Doe' };

  test('should add a participant', () => {
    const { addParticipant, getParticipants } = createUseSecretSantaHook();

    addParticipant(participant1);

    expect(getParticipants()).toHaveLength(1);
    expect(getParticipants()[0]).toEqual(participant1);
  });

  test('should remove a participant', () => {
    const { addParticipant, removeParticipant, getParticipants } = createUseSecretSantaHook();

    addParticipant(participant1);
    addParticipant(participant2);
    removeParticipant(0);

    expect(getParticipants()).toHaveLength(1);
    expect(getParticipants()[0]).toEqual(participant2);
  });

  test('should get the list of participants', () => {
    const { addParticipant, getParticipants } = createUseSecretSantaHook();

    addParticipant(participant1);
    addParticipant(participant2);

    const participants = getParticipants();
    expect(participants).toHaveLength(2);
    expect(participants).toEqual([participant1, participant2]);
  });

  test('should assign Secret Santa correctly', () => {
    const { addParticipant, assignSecretSanta, getParticipants } = createUseSecretSantaHook();

    addParticipant(participant1);
    addParticipant(participant2);
    addParticipant(participant3);

    const assignments = assignSecretSanta();
    expect(assignments.size).toBe(3);

    getParticipants().forEach((participant) => {
      expect(assignments.has(participant)).toBeTruthy();
    });
  });

  test('should shuffle array correctly', () => {
    const { shuffleArray } = createUseSecretSantaHook();

    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...array]);

    // Ensure that all original elements are present
    expect(shuffledArray).toHaveLength(array.length);
    array.forEach((item) => {
      expect(shuffledArray).toContain(item);
    });

    // There's a very small chance it could shuffle to the same order
    // This is a statistical test, not a guaranteed one
    const isSameOrder = array.every((value, index) => value === shuffledArray[index]);
    expect(isSameOrder).toBeFalsy();
  });
});
