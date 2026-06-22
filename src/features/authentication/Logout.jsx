import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
// import { useLogout } from './useLogout';
import { useLogoutInp } from './useLogoutInp';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoggingOut } = useLogoutInp();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
