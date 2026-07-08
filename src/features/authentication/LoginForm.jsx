import { useState } from 'react';
// import { useLogin } from './useLogin';
import { useLoginInp } from './useLoginInp';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('leonard.nguessan@inphb.ci');
  const [password, setPassword] = useState('admin.admin@inphb.ci');
  const { login, isLoggingIn } = useLoginInp();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login(
      { login: email, password },
      {
        onSettled: () => {
          setPassword('');
        },
      }
    );
  }

  return (
    <Form type="login" onSubmit={handleSubmit}>
      <FormRowVertical label="Adresse email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoggingIn}
          size="large"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Mot de passe">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoggingIn}
          size="large"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Se connecter'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
