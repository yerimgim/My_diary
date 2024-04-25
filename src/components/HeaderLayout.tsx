import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigationbar from './Navigationbar';

type Props = {
  children?: ReactNode;
};

type UserType = {
  avartar?: string;
  blocked?: boolean;
  confirmed: boolean;
  createdAt: Date;
  displayName: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: Date;
  username: string;
};

const HeaderLayout = ({ children }: Props) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const authUser = localStorage.getItem('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  return (
    <section className="flex justify-between items-center my-2">
      <Navigationbar />
      <div>{children}</div>
      <div className="flex">
        <Button className="w-10 h-10 bg-slate-300 flex justify-center items-center rounded-full text-xs">
          {user ? user.username || user.displayName : ''}
        </Button>
      </div>
    </section>
  );
};

export default HeaderLayout;
