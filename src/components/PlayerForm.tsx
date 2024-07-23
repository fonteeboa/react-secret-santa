import React from 'react';
import { Input, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlayerFormProps } from '../domain';

const PlayerForm: React.FC<PlayerFormProps> = ({ onAddParticipant }) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const handleFinish = (values: { name: string }) => {
        onAddParticipant({ name: values.name });
        form.resetFields();
    };

    return (
        <Form form={form} layout="inline" onFinish={handleFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: t('invalid_name') }]}
            >
                <Input placeholder={t('name')} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {t('add_player')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PlayerForm;
