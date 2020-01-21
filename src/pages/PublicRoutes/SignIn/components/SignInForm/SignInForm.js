import React, { useState } from 'react';

import FormField from 'components/Forms/FormField/FormField';
import Input from 'components/Forms/Input/Input';
import Button from 'components/Button/Button';

import styles from './SignInForm.module.scss';

function SignInForm({ onSubmit, isLoadingUserLogin }) {
  const [formValues, setFormValues] = useState({ username: '' });

  const handleChange = event => {
    const { value, name } = event.currentTarget;
    setFormValues(allFormValues => ({ ...allFormValues, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Username"
        control={
          <Input
            name="username"
            value={formValues.username}
            placeholder="type Username"
            onChange={handleChange}
            minLength={4}
            maxLength={16}
            required
          />
        }
      />
      <Button type="submit" classes={{ root: styles.btn }}>
        {isLoadingUserLogin ? <div className="spinner-border" /> : 'Sign-In'}
      </Button>
    </form>
  );
}

export default SignInForm;
