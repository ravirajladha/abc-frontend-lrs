import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import { storeVideoLog } from '@/api/student';

import Logo from '@/assets/images/logo-transparent.png';

const VideoPlayer = ({
  options,
  onReady,
  studentId,
  studentPhone,
  videoId,
  lastTimestamp,
  onPlayerChange,
}) => {
  const playerRef = useRef(null);
  const playerElementRef = useRef(null);

  const [lastVideoId, setLastVideoId] = useState(videoId);

  let completeStatus = 0;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video');

      videoElement.classList.add('video-js');
      // const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('vjs-layout-medium');
      playerElementRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
        onPlayerChange && onPlayerChange(player);
      }));

      player.on('error', function (error) {
        console.error('Video.js error:', error);
        toast.error(error);
      });
      if (options.autoplay) {
        player.autoplay(true);
      }

      if (options.sources && options.sources.length > 0) {
        player.src(options.sources);
      }

      if(lastTimestamp){
      console.warn(lastTimestamp);
      player.currentTime(lastTimestamp);
      }
      setLastVideoId(videoId);
    } else {
      const player = playerRef.current;
      // Set player properties
      if (options.autoplay) {
        player.autoplay(true);
      }

      if (options.sources && options.sources.length > 0) {
        player.src(options.sources);
      }
      if(lastTimestamp){
      console.warn(lastTimestamp);
      player.currentTime(lastTimestamp);
      }

      setLastVideoId(videoId);
    }
  }, [options, playerElementRef]);

 

  // Updates when video is completed
  useEffect(() => {
    const player = playerRef.current;
    setLastVideoId(videoId);
    if (player) {
      const handleEnded = () => {
        const currentTimeStamp = player.currentTime();
        const duration = player.duration();
        if (currentTimeStamp === duration) {
          completeStatus = 1;
        }
        saveTimestamp(lastVideoId, currentTimeStamp, completeStatus);
      };
      player.on('ended', handleEnded);

      return () => {
        player.off('ended', handleEnded);
      };
    }
  }, [playerRef, lastVideoId]);

 // Updates when video id changes
 useEffect(() => {
  const player = playerRef.current;
  const videoIdSnapshot = lastVideoId;
  // setLastVideoId(videoId);

  return () => {
    if (player && !player.isDisposed()) {
      const currentTimeStamp = player.currentTime();
      console.log(currentTimeStamp);
      saveTimestamp(videoIdSnapshot, currentTimeStamp, completeStatus);
      player.dispose();
      playerRef.current = null;
    }
  };
}, [lastVideoId]);

  const saveTimestamp = async (lastVideoId, currentTimeStamp, completeStatus) => {
    const formData = new FormData();
    formData.append('student_id', studentId);
    formData.append('video_id', lastVideoId);
    formData.append('timestamp', currentTimeStamp);
    formData.append('status', completeStatus);

    try {
      if (lastVideoId) {
        const response = await storeVideoLog(formData);
        console.log('Timestamp saved:', response);
      }
    } catch (error) {
      console.error('Error saving timestamp:', error);
    }
  };
  return (
    <>
      <div data-vjs-player>
        <div ref={playerElementRef}></div>
        <i className="watermark">{studentPhone}</i>
        <img
          className="watermark_image"
          src={Logo}
          alt=""
          style={{
            opacity: 0.5,
            width: '40px',
            position: 'absolute',
            left: '4%',
          }}
        />
      </div>
    </>
  );
};

VideoPlayer.propTypes = {
  options: PropTypes.shape({
    autoplay: PropTypes.bool,
    controls: PropTypes.bool,
    sources: PropTypes.array,
  }),
  videoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onReady: PropTypes.func,
  onPlayerChange: PropTypes.func,
  lastTimestamp: PropTypes.number,
};

export default VideoPlayer;
