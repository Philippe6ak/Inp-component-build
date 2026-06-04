import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden px-[2.4rem] py-[4.8rem]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/clinique.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[6px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-3xl content-center justify-center gap-[3.2rem]">
        <Logo />
        <Heading as="h4" className="text-grey-0">
          Log into your account
        </Heading>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
