import React from 'react';
import { List, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Participant, PlayerListProps } from '../domain';
import { useTranslation } from 'react-i18next';

const PlayerList: React.FC<PlayerListProps> = ({ participants, onRemoveParticipant }) => {
  const { t } = useTranslation();
  const ContainerHeight = 400;

  return (
    <List bordered className='playerList'>
      <VirtualList
        data={participants}
        height={ContainerHeight}
        itemHeight={47}
        itemKey={(participant) => participant.name}
      >
        {(participant: Participant, index: number) => (
          <List.Item
            key={participant.name}
            actions={[
              <Button type="link" danger onClick={() => onRemoveParticipant(index)}>
                {t('remove')}
              </Button>
            ]}
          >
            {participant.name}
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default PlayerList;
