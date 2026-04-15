import { useDarkMode } from '../context/DarkModeContext';

function Logo() {
  const { isDarkMode } = useDarkMode();

  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  const src = '/inphblogo.png';

  return (
    <div className="text-center flex justify-center">
      <img src={src} alt="Logo" className="h-[9.6rem] w-auto hidden md:block" />
    </div>
  );
}

export default Logo;
