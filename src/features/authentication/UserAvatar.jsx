import { useUser } from './useUser';

function UserAvatar() {
  const { user } = useUser();
  const { fullname, avatar } = user.user_metadata;

  return (
    <div className="flex gap-[1.2rem] items-center font-medium text-[1.4rem] text-grey-600">
      <img
        className="block w-[4rem] min-h-[3.6rem] min-w-[3.6rem] aspect-[1] object-cover object-center rounded-[50%] outline-2 outline-grey-100"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${fullname ? fullname : 'User'}`}
      />
      <span>{fullname ? fullname : 'User'}</span>
    </div>
  );
}

export default UserAvatar;
