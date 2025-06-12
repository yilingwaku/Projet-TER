"use client";

import Menu from '@/components/menu/Menu';
import { useUser } from '@/context/UserContext';

const Main = () => {
  const { user } = useUser();

  return (
    <>
      <div>
        <div className='flex flex-col pb-[30px] w-full'>
          <span className='lg-text mb-[-10px]'>Bonjour {user?.name} !</span>
          <span className='md-text'>Que puis-je faire pour vous ?</span>
        </div>
        <Menu/>
      </div>

      <div className='modal'>
        <span className='sm-text'>v0.2-a</span>
      </div>
    </>
  );
};

export default Main;