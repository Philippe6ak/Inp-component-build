import { useUser } from './useUser';

function UserAvatar() {
  const { user } = useUser();
  const { fullname, avatar } = user.user_metadata;

  return (
    <div className="flex gap-[1.2rem] items-center font-medium size-[1.4rem] text-grey-600">
      <img
        className="block w-[4rem] h-[3.6rem] aspect-square object-cover object-center rounded-[50%] outline-2 outline-grey-100"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${fullname}`}
      />
      <span>{fullname}</span>
    </div>
  );
}

export default UserAvatar;
