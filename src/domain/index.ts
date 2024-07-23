export interface Participant {
    name: string;
}

export interface PlayerFormProps {
    onAddParticipant: (participant: Participant) => void;
}

export interface PlayerListProps {
    participants: Participant[];
    onRemoveParticipant: (index: number) => void;
}

export interface ResultListProps {
    assignments: Map<Participant, Participant>;
}
