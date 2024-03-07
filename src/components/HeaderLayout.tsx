import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeaderLayout = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const authUser = localStorage.getItem('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  return (
    <section className="flex justify-between items-center my-2">
      <div>{children}</div>
      <Button className="w-12 h-12 bg-slate-300 flex justify-center items-center rounded-full text-xs">
        {user ? user.username || user.displayName : ''}
      </Button>
    </section>
  );
};

export default HeaderLayout;
