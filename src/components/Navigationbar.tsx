import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { MdOutlineMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const Navigationbar = () => {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <MdOutlineMenu className="m-3" />
      </DrawerTrigger>
      <DrawerContent className="h-full w-full">
        <DrawerHeader>
          {/* <DrawerTitle>menu</DrawerTitle> */}
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          <DrawerClose>
            <Button variant="ghost" className="">
              <IoClose />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <ul>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/mypage">Mypage</Link>
          </li>
          {/* <Button variant="link" className="bold" onClick={handleLogout}>
            Logout
          </Button> */}
        </ul>
        <DrawerFooter>
          {/* <DrawerClose>
            <Button variant="ghost">
              <IoClose />
            </Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Navigationbar;

// import { useState } from 'react';
// import { MdOutlineMenu } from 'react-icons/md';
// import { Button } from './ui/button';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Navigationbar = () => {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);

//   const showMenu = () => {
//     setIsVisible(true);
//   };

//   const hideMenu = () => {
//     setIsVisible(false);
//   };

//   return (
//     <div className="relative h-full bg-red-400">
//       <Button onClick={showMenu} variant="ghost">
//         <MdOutlineMenu />
//       </Button>

//       {isVisible && (
//         <div className="absolute z-[100] top-0">

//           {/* <div onClick={hideMenu} className="fixed top-0 left-0 right-0 bottom-0 z-[101]"></div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navigationbar;
