import React from 'react';
import { Link } from 'react-router-dom';
import Timer from '../Timer'; // Adjust the import path based on your project structure
import DefaultProfileImage from '@/assets/images/default/user.png'; // Ensure the path is correct
import { ToastContainer, toast } from 'react-toastify';
import BackButton from '@/components/common/BackButton';

const EditorHeader = ({ labs, setTimerTime, setStartTimestamp,isTestCode }) => {
  // Function to display notification (example use case)
  const notify = (message) => toast(message);
  
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-white text-dark-gray-7">
      <div className={`flex w-full items-center justify-between "max-w-[1200px] mx-auto"`}>
        <Link to="/" className="h-[10px] flex-1">
          <img src="/assets/images/abc_logo.jpg" alt="Logo" height={50} width={50} />
        </Link>
        <div className="flex items-center gap-4 flex-1 justify-center">
          <Link to="/" className="flex items-center gap-2 font-medium text-dark-gray-8 cursor-pointer">
            <p className="text-black">{labs?.name}</p>
          </Link>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-end">
        {!isTestCode && 
          <Timer onTimeUpdate={setTimerTime} onStartTimestamp={setStartTimestamp} /> }
          {/* <div className="cursor-pointer group relative">
            <img
              src={DefaultProfileImage}
              alt="Avatar"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => notify('The functionality in progress!')}
            />
            <ToastContainer />
          </div> */}
            <ToastContainer />

          {isTestCode && 
          <BackButton className="mx-2"  /> }
        </div>
      </div>
    </nav>
  );
};

export default EditorHeader;
