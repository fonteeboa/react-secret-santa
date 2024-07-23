import React from 'react';
import { List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Participant, ResultListProps } from '../domain';
import { useTranslation } from 'react-i18next';

const ResultList: React.FC<ResultListProps> = ({ assignments }) => {
    const { t } = useTranslation();
    const ContainerHeight = 627;
    const data = Array.from(assignments.entries());

    return (
        <List bordered className='resultList'>
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey={(item) => `${item[0].name}-${item[1].name}`}
            >
                {(item: [Participant, Participant]) => (
                    <List.Item key={`${item[0].name}-${item[1].name}`}>
                        {t('give_gift_to', { giver: item[0].name, receiver: item[1].name })}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};

export default ResultList;
