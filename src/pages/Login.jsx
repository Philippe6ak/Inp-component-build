import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="min-h-screen grid grid-cols-[48rem] content-center justify-center gap-[3.2rem] bg-grey-50">
      <Logo />
      <Heading as="h4">Log into your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
