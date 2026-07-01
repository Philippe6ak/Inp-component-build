import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center">
      {/* Full-screen background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/clinique.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Floating card — left-anchored with breathing room */}
      <div className="relative z-10 ml-[5vw] lg:ml-[8vw] w-full max-w-[52rem]">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.55)] px-[5.6rem] py-[5.6rem] flex flex-col gap-[3.2rem]">
          <Logo />
          <Heading as="h4" className="text-grey-600 text-center leading-snug">
            Bienvenue sur l&apos;application de gestion la clinique.
            <br />
            Veuillez vous connecter pour continuer.
          </Heading>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
