import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { fetchParentInfo } from '@/api/parent';

function Notification() {
  const appurl = import.meta.env.VITE_APP_URL;

  const [data, setData] = useState({
    hello: 'hello',
  });

  const fetchParentDetails = useCallback(async () => {
    fetchParentInfo(1)
      .then((data) => {
        if (data) {
          setData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchParentDetails();
  }, [fetchParentDetails]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [setLoading]);
  return (
    <div>
      <ContentHeader title="Agasthya Vidyanikethan" />
      {loading ? (
        <ContentLoader />
      ) : (
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card border-0 mb-0 rounded-lg overflow-hidden">
              {data ? (
                <div className="react-player">
                  <video
                    src={appurl + "assets/videos/about.mp4"}
                    preload="auto"
                    autoPlay={false}
                    controls
                    style={{ width: '100%', height: 'auto' }}
                  ></video>
                </div>
              ) : (
                <ContentFallback message="No updates available." />
              )}
            </div>
          </div>
          <div className="col-xl-12 col-xxl-12">
            <div className="card d-block border-0 rounded-lg overflow-hidden my-4 p-4 shadow-xss">
              <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3 text-center">
                Agasthyotsava 2023
              </h2>
              <div className="row ">
                <div>
                  <iframe
                    width="360"
                    height="200"
                    src="https://www.youtube.com/embed/QLpy9pNZsrU?si=DMRUOhiaNznGXbMw"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="mx-auto"
                  ></iframe>
                </div>
                <div>
                  <iframe
                    width="360"
                    height="200"
                    src="https://www.youtube.com/embed/ZQA4EPphnb0?si=r2x0fkMJWDPm4PER"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="mx-auto"
                  ></iframe>
                </div>
                <div>
                  <iframe
                    width="360"
                    height="200"
                    src="https://www.youtube.com/embed/1bbFtobb2QQ?si=cw1wG43vWqbTkplA"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="mx-auto"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
