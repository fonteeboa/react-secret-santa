import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Button, message } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import ResultList from '../components/ResultList';
import useSecretSanta from '../services/useSecretSanta';
import { Participant } from '../domain';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const { t } = useTranslation();
  const { participants, addParticipant, removeParticipant, assignSecretSanta } = useSecretSanta();
  const [assignments, setAssignments] = useState<Map<Participant, Participant> | null>(null);

  const handleAddParticipant = (participant: Participant) => {
    addParticipant(participant);
    message.success(t('add_player_success', { name: participant.name }));
  };

  const handleRemoveParticipant = (index: number) => {
    removeParticipant(index);
    message.success(t('remove_player_success'));
  };

  const startGame = () => {
    if (participants.length < 3) {
      message.error(t('start_game_error'));
      return;
    }
    const assignments = assignSecretSanta();
    setAssignments(assignments);
    message.success(t('start_game_success'));
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <Title className="header-title">{t('secret_santa_game')}</Title>
      </Header>
      <Content className="content">
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Row justify="space-between" align="middle">
              <Col xs={24} md={18}>
                <Card title={t('add_player')}>
                  <PlayerForm onAddParticipant={handleAddParticipant} />
                </Card>
              </Col>
              <Col xs={24} md={6} className='colStart'>
                <Button
                  type="primary"
                  size="large"
                  className='startButton'
                  onClick={startGame}
                  disabled={participants.length < 3}
                  icon={<PlayCircleOutlined />}
                  block
                >
                  {t('start_game')}
                </Button>
              </Col>
            </Row>
            <Card title={t('player_list')} style={{ marginTop: 20 }}>
              <PlayerList participants={participants} onRemoveParticipant={handleRemoveParticipant} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title={t('results')}>
              {assignments ? (
                <ResultList assignments={assignments} />
              ) : (
                <div className='resultList'>
                  <p>{t('results_placeholder')}</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer className="footer">
        Secret Santa Game ©2023 Created by Fonteeboa
      </Footer>
    </Layout>
  );
};

export default App;
