import { useCallback, useEffect, useRef, useState } from 'react';

import { useOutletContext, useParams } from 'react-router-dom';

import { ContentHeader } from '@/components/common';
import {
  VideoPlayer,
  ContentDescription,
  VideoTabs,
  SubjectScore,
  ContentTitle,
  MiniProjects,
} from '@/components/student/learn';

import { fetchContents, fetchExternalStudentContents } from '@/api/student';
import { getUserDataFromLocalStorage } from '@/utils/services';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Learn() {
  const studentData = useOutletContext();
  const studentId = studentData.student_auth_id;
  const classId = studentData.class_id;
  const userData = JSON.parse(getUserDataFromLocalStorage());

  const { subjectId } = useParams();

  const videoItems = document.querySelectorAll('.video');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState();

  const [videoPlayer, setVideoPlayer] = useState(null);
  const [videoOptions, setVideoOptions] = useState({
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [],
  });

  const [activeVideo, setActiveVideo] = useState({
    id: '',
    title: '',
    chapter: '',
    description: '',
    lastTimestamp: '',
    assessment_results: '',
  });

  const [subject, setSubject] = useState(true);
  const [content, setContent] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [miniProjects, setMiniProjects] = useState([]);
  const [isTeacherAvailable, setIsTeacherAvailable] = useState(false);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // setVideoPlayer(player);
  };

  const handlePlayerChange = (player) => {
    setVideoPlayer(player);
  };

  const handleQualityChange = (quality) => {
    console.log('Video quality has changed to:', quality);
  };

  const handleVideoClick = (
    videoId,
    videoFile,
    videoTitle,
    chapterTitle,
    videoDescription,
    videoResults,
    videoLastTimeStamp
  ) => {
    videoItems.forEach((video) => {
      if (videoId == video.dataset.id) {
        video.classList.add('active');
        video.querySelector('i').classList.remove('feather-play-circle');
        video.querySelector('i').classList.add('feather-pause-circle');
        const defaultSources = [
          {
            // src: baseUrl + 'uploads/' + videoFile,
            // type: 'video/mp4',

            src: baseUrl + 'api/video/playlist/' + videoFile,
            type: 'application/x-mpegURL',
          },
        ];
        setVideoOptions((prevOptions) => ({
          ...prevOptions,
          sources: defaultSources,
        }));
        setActiveVideo({
          id: videoId,
          url: videoFile,
          title: videoTitle,
          chapter: chapterTitle,
          description: videoDescription,
          assessment_results: videoResults,
          watch_time: videoLastTimeStamp,
        });
      } else {
        video.classList.remove('active');
        video.querySelector('i').classList.remove('feather-pause-circle');
        video.querySelector('i').classList.add('feather-play-circle');
      }
    });
  };

  const fetchSubjectContents = useCallback(async () => {
    try {
      let data;
      if (studentData.student_type === 0) {
        data = await fetchContents(subjectId);
      } else {
        data = await fetchExternalStudentContents(subjectId);
      }
      setContent(data.contents.chapters);
      setSubject(data.contents.subject);
      setMiniProjects(data.contents.mini_projects);
      if (data && data.contents.teacher) {
        setTeacher(data.contents.teacher);
        setIsTeacherAvailable(true);
      }
      if (data && data.contents.video && !isVideoLoaded) {
        setActiveVideo({
          id: data.contents.video.id,
          url: data.contents.video.url,
          title: data.contents.video.title,
          chapter: data.contents.video.chapter,
          description: data.contents.video.description,
          assessment_results: data.contents.video.assessment_results,
          watch_time: data.contents.video.watch_time,
        });

        const defaultSources = [
          {
            // src: baseUrl + 'uploads/' + data.contents.video.url,
            // type: 'video/mp4',

            src: baseUrl + 'api/video/playlist/' + data.contents.video.url,
            type: 'application/x-mpegURL',
          },
        ];

        setVideoOptions((prevOptions) => ({
          ...prevOptions,
          sources: defaultSources,
        }));

        if (data.contents.video.watch_time) {
          // setLastTimestamp(data.contents.video.watch_time);
          setVideoOptions((prevOptions_1) => ({
            ...prevOptions_1,
            autoplay: false,
          }));
        }

        setIsVideoLoaded(true);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [subjectId, isVideoLoaded, studentData.student_type]);

  useEffect(() => {
    fetchSubjectContents();
  }, [fetchSubjectContents, subjectId]);

  useEffect(() => {
    // Initialize Video.js options
    setVideoOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          // src: baseUrl + 'uploads/' + activeVideo.url,
          // type: 'video/mp4',

          src: baseUrl + 'api/video/playlist/' + activeVideo.url,
          type: 'application/x-mpegURL',
        },
      ],
    }));
  }, [activeVideo]);

  return (
    <div className="pb-2">
      <ContentHeader
        title={subject.name ? subject.name : 'Learn'}
        backLink="/student/courses"
      />
      <div className="row">
        <div className="col-xl-8 col-xxl-9">
          <VideoPlayer
            options={videoOptions}
            onReady={handlePlayerReady}
            onPlayerChange={handlePlayerChange}
            onQualityChange={handleQualityChange}
            studentId={studentId}
            studentPhone={userData.phone_number}
            videoId={activeVideo.id}
            lastTimestamp={activeVideo.watch_time}
          />
        </div>
        <div className="col-xl-4 col-xxl-3">
          <VideoTabs
            isLoading={isLoading}
            subjectId={subjectId}
            studentId={studentId}
            subjectData={content}
            isTeacherAvailable={isTeacherAvailable}
            teacherId={teacher?.auth_id}
            videoPlayer={videoPlayer}
            activeVideoId={activeVideo.id}
            handleVideoClick={handleVideoClick}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-xxl-9 px-3">
          <ContentTitle
            title={activeVideo?.title}
            chapter={activeVideo?.chapter}
            teacher={teacher?.name}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-xxl-9">
          <ContentDescription description={activeVideo.description} />
          <h2 className="fw-700 font-sm mb-3 mt-3 pl-1 mb-3">Mini Projects</h2>
          <div className="row mt-2">
            {miniProjects.map((project) => (
              <MiniProjects
                key={project.id}
                project={project}
                subjectId={subjectId}
              />
            ))}
          </div>
        </div>

        <div className="col-xl-4 col-xxl-3">
          <SubjectScore results={activeVideo.assessment_results} />
        </div>
      </div>
    </div>
  );
}

export default Learn;
