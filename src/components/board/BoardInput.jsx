import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { getActiveChannelId } from '../../features/selectors.js';
import { useSocketAPI, useAuth } from '../../hooks/index.jsx';

const BoardInput = () => {
  const { t } = useTranslation();
  const channelId = useSelector(getActiveChannelId);
  const auth = useAuth();
  const { sendMessage } = useSocketAPI();

  const handler = (values, actions) => {
    const { username } = auth.getUser();
    const { text } = values;
    const messageData = {
      username,
      text,
      channelId,
    };
    sendMessage(messageData);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={handler}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          inline
          className="justify-content-center px-5 py-3"
          onSubmit={handleSubmit}
        >
          <Form.Label htmlFor="new-message" srOnly />
          <Form.Control
            id="text"
            name="text"
            className="w-75"
            value={values.text}
            onChange={handleChange}
            placeholder={t('chatInput.placeholder')}
            data-testid="new-message"
            aria-describedby="newMessageBtn"
          />
          <Button
            aria-label={t('chatInput.sendMessageBtn')}
            variant="outline-secondary"
            type="submit"
            disabled={isSubmitting || values.text === ''}
          >
            <ArrowRightSquare />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BoardInput;
