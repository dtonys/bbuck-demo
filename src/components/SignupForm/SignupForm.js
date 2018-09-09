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


const SignupForm = ({
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
          {/* <RFFormSpy onChange={onFormStateChange} /> */}
          <RFField name="fortnite_username" >
            {({ input }) => (
              <Form.Field >
                <input {...input} placeholder="fortnite username" />
              </Form.Field>
            )}
          </RFField>
          <br />
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
                <input {...input} type="password" placeholder="bbuck password" />
              </Form.Field>
            )}
          </RFField>
          <br />
          <div style={{ textAlign: 'center' }} >
            <Button
              size="large"
            > Signup </Button>
          </div>
        </Form>
      )}
    </RFForm>
  </div>
);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SignupForm;
