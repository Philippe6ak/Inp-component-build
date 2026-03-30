import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

// const StyledHeader = styled.header`
//   background-color: var(--color-grey-0);
//   padding: 1.2rem 4.8rem;
//   border-bottom: 1px solid var(--color-grey-100);

//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
//   justify-content: flex-end;
// `;

function Header() {
  return (
    <header className="bg-grey-0 border-b border-grey-100 px-[4.8rem] py-[1.2rem] flex gap-[2.4rem] items-center justify-end">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
