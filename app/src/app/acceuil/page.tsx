import Menu from '@/components/menu/Menu';

const Main = () => {
  return (
    <>
      <div>
        <div className='flex flex-col pb-[30px] w-full'>
          <span className='lg-text mb-[-10px]'>Bonjour Valentin !</span>
          <span className='md-text'>Que puis-je faire pour vous ?</span>
        </div>
        <Menu/>
      </div>

      <div className='modal'>
        <span className='sm-text'>v0.1-a</span>
      </div>
    </>
  );
};

export default Main;