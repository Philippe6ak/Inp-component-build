import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

function Header() {
  return (
    <header className="bg-grey-0 border-b border-grey-100 px-[4.8rem] py-[1.2rem] flex gap-[2.4rem] items-center justify-end">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
