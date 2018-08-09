import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import {
  phone as normalizePhone,
  number as normalizeNumber,
} from 'helpers/normalizers';
import {
  Form as RFForm,
  Field as RFField,
} from 'react-final-form';
import styles from '../../pages/Home/Home.scss';


const SignupForm = ({
  onSubmit,
}) => (
  <div>
    <RFForm
      onSubmit={ onSubmit }
    >
      {({ handleSubmit }) => (
        <Form
          className={ styles.form }
          onSubmit={ handleSubmit }
        >
          {/* <RFFormSpy onChange={onFormStateChange} /> */}
          <RFField name="username" >
            {({ input }) => (
              <Form.Field >
                <input {...input} className={styles.input} placeholder="username" />
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
                <input {...input} type="password" placeholder="password" />
              </Form.Field>
            )}
          </RFField>
          <br />
          <div style={{ textAlign: 'center' }} >
            <Button
              className={styles.btn}
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
