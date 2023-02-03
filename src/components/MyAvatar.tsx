// hooks
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {

  return (
    <Avatar
      src={''}
      alt={'test'}
      {...other}
    >
      ducviet
    </Avatar>
  );
}
