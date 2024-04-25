// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer';
// import { Button } from './ui/button';
// import { MdOutlineMenu } from 'react-icons/md';

// const Navigationbar = () => {
//   return (
//     <Drawer>
//       <DrawerTrigger>
//         <MdOutlineMenu />
//       </DrawerTrigger>
//       <DrawerContent className="">
//         <DrawerHeader>
//           <DrawerTitle>menu</DrawerTitle>
//           <DrawerDescription>This action cannot be undone.</DrawerDescription>
//         </DrawerHeader>
//         <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default Navigationbar;

import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navigationbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showMenu = () => {
    setIsVisible(true);
  };

  const hideMenu = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <Button onClick={showMenu} variant="ghost">
        <MdOutlineMenu size={20} />
      </Button>

      {isVisible && (
        <div className="absolute z-[100] top-0 w-1/2 h-full">
          <ul className="bg-slate-400 w-[280px] h-[848px] absolute z-[101]">
            <li className="m-3">
              <Link to="/calendar">Calendar</Link>
            </li>
            <li className="m-3">
              <Link to="/mypage">Mypage</Link>
            </li>
          </ul>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div onClick={hideMenu} className="fixed top-0 left-0 right-0 bottom-0 z-[99]" />
        </div>
      )}
    </div>
  );
};

export default Navigationbar;
