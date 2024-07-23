import { useState } from 'react';
import { Participant } from '../domain';

const useSecretSanta = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (participant: Participant): void => {
    setParticipants((prev) => [...prev, participant]);
  };

  const removeParticipant = (index: number): void => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const getParticipants = (): Participant[] => {
    return participants;
  };

  const assignSecretSanta = (): Map<Participant, Participant> => {
    const shuffled = shuffleArray([...participants]);
    const assignments = new Map<Participant, Participant>();

    for (let i = 0; i < participants.length; i++) {
      const giver = participants[i];
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
    participants,
    addParticipant,
    removeParticipant,
    getParticipants,
    assignSecretSanta
  };
};

export default useSecretSanta;
