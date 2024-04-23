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

const Navigationbar = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <MdOutlineMenu />
      </DrawerTrigger>
      <DrawerContent className="w-[800px] bg-slate-300 translate-y-10">
        <DrawerHeader>
          <DrawerTitle>menu</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Navigationbar;
