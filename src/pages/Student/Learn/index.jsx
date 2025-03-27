import { useCallback, useEffect, useRef, useState } from 'react';

import { useOutletContext, useParams } from 'react-router-dom';

import { ContentHeader } from '@/components/common';
import {
  VideoPlayer,
  ContentDescription,
  VideoTabs,
  CourseScore,
  ContentTitle,
  MiniProjects,
} from '@/components/student/learn';
import { ReviewCard, TrainerCard } from '@/components/student/previewCourse';

import { fetchContents, fetchExternalStudentContents } from '@/api/student';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { Tab, Tabs } from 'react-bootstrap';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Learn() {
  const studentData = useOutletContext();
  const studentId = studentData.student_auth_id;
  const userData = JSON.parse(getUserDataFromLocalStorage());

  const { courseId } = useParams();

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

  const [course, setCourse] = useState(true);
  const [content, setContent] = useState([]);
  const [trainer, setTrainer] = useState(null);
  const [miniProjects, setMiniProjects] = useState([]);
  const [isTrainerAvailable, setIsTrainerAvailable] = useState(false);
  const [liveSessions, setLiveSessions] = useState([]);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
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
    console.log("dataset id",video.dataset.id);
    console.log("videoid",videoId);

      if (videoId == video.dataset.id) {
        video.classList.add('active');
        video.querySelector('i').classList.remove('feather-play-circle');
        video.querySelector('i').classList.add('feather-pause-circle');
        const defaultSources = [
          {
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

  const fetchCourseContents = useCallback(async () => {
    try {
      let data;
      // console.log("student type", studentData.student_type)
      // if (studentData.student_type === 0) {
      //   data = await fetchContents(courseId);
      // } else {
        console.log(courseId,"before data for student learn page")

        data = await fetchExternalStudentContents(courseId);
        console.log(data, "real data for student learn page")
      // }
      setContent(data.contents.chapters);
      setCourse(data.contents.course);
      setMiniProjects(data.contents.mini_projects);
      setLiveSessions(data.contents.liveSessions);
      if (data && data.contents.trainer) {
        setTrainer(data.contents.trainer);
        setIsTrainerAvailable(true);
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
            src: baseUrl + 'api/video/playlist/' + data.contents.video.url,
            type: 'application/x-mpegURL',
          },
        ];

        setVideoOptions((prevOptions) => ({
          ...prevOptions,
          sources: defaultSources,
        }));

        if (data.contents.video.watch_time) {
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
  }, [courseId, isVideoLoaded]);

  useEffect(() => {
    fetchCourseContents();
  }, [fetchCourseContents, courseId]);

  useEffect(() => {
    setVideoOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          src: baseUrl + 'api/video/playlist/' + activeVideo.url,
          type: 'application/x-mpegURL',
        },
      ],
    }));
  }, [activeVideo]);

  return (
    <div className="pb-2">
      <ContentHeader
        title={course.name ? course.name : 'Learn'}
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
          <ContentTitle
            title={activeVideo?.title}
            chapter={activeVideo?.chapter}
            trainer={trainer?.name}
          />
        </div>
        <div className="col-xl-4 col-xxl-3">
          <VideoTabs
            isLoading={isLoading}
            courseId={courseId}
            studentId={studentId}
            courseData={content}
            isTrainerAvailable={isTrainerAvailable}
            trainerId={trainer?.auth_id}
            videoPlayer={videoPlayer}
            activeVideoId={activeVideo.id}
            handleVideoClick={handleVideoClick}
            liveSessions={liveSessions}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-xxl-9">
          <Tabs className="font-xss fw-600 d-flex justify-content-around">
            <Tab title="Overview" eventKey="overview">
              <ContentDescription description={activeVideo.description} />
            </Tab>
            <Tab title="Trainer Details" eventKey="trainer">
              <TrainerCard trainer={trainer} />
            </Tab>
            <Tab title="Reviews" eventKey="review">
              <ReviewCard courseId={courseId}/>
            </Tab>
          </Tabs>
          <h2 className="fw-700 font-sm mb-3 mt-3 pl-1 mb-3">Mini Projects</h2>
          <div className="row mt-2">
            {miniProjects.map((project) => (
              <MiniProjects
                key={project.id}
                project={project}
                courseId={courseId}
              />
            ))}
          </div>
        </div>

        <div className="col-xl-4 col-xxl-3">
          <CourseScore results={activeVideo.assessment_results} />
        </div>
      </div>
    </div>
  );
}

export default Learn;
