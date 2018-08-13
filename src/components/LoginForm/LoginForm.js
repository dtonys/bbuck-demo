import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import {
  Form as RFForm,
  Field as RFField,
} from 'react-final-form';


const LoginForm = ({
  onSubmit,
}) => (
  <div>
    <RFForm
      onSubmit={ onSubmit }
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={ handleSubmit }
        >
          <RFField name="email" >
            {({ input }) => (
              <Form.Field >
                <input {...input} placeholder="email" />
              </Form.Field>
            )}
          </RFField>
          <br />
          <RFField name="password" >
            {({ input }) => (
              <Form.Field >
                <input {...input} type="password" placeholder="password" />
              </Form.Field>
            )}
          </RFField>
          <br />
          <div style={{ textAlign: 'center' }} >
            <Button
              size="large"
            > Login </Button>
          </div>
        </Form>
      )}
    </RFForm>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default LoginForm;
