import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const Timer = ({ onTimeUpdate,onStartTimestamp  }) => {
	const [startTimestamp, setStartTimestamp] = useState(null);
	const [showTimer, setShowTimer] = useState(true);
	const [time, setTime] = useState(0);

	const formatTime = (time) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	};

	useEffect(() => {
		let intervalId;
		if (showTimer && startTimestamp === null) {
			const timestamp = Date.now();
			setStartTimestamp(timestamp);
			onStartTimestamp(timestamp);
		  }
		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer]);
//to submit the time into database
	useEffect(() => {
		onTimeUpdate(time); // This will send the current time value back to the parent component
	  }, [time, onTimeUpdate]);
	
	return (
		<div>
			{showTimer ? (
				<div className='flex items-center space-x-2 bg-dark-gray-600 p-1.5 cursor-pointer rounded  hover:bg-dark-fill-2'>
					<div>{formatTime(time)}</div>
					{/* <FiRefreshCcw
    color="black"
    onClick={() => {
        setShowTimer(false);
        setTime(0);
    }}
/> */}
				</div>
			) : (
				<div
					className='flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer'
					onClick={() => setShowTimer(true)}
				>
					{/* Your SVG icon code here */}
				</div>
			)}
		</div>
	);
};
export default Timer;
