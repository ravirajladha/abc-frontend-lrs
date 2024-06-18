import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { formatTimestamp } from '@/utils/helpers';

import NoteModal from '@/components/student/learn/AddNoteModal';
import { fetchNotes, storeNotes } from '@/api/student';
import { formatVideoTimestamp } from '@/utils/helpers';

function NoteTab({ isTabActive, studentId, videoPlayer, activeVideoId }) {
  const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState([]);
  const [noteTimestamp, setNoteTimestamp] = useState('0:00');
  const [newNote, setNewNote] = useState('');
  const [markersCreated, setMarkersCreated] = useState(false);
  const [addNotesModal, setAddNotesModal] = useState(false);

  const getAllStudentNotes = useCallback(async () => {
    if (isTabActive && studentId && activeVideoId) {
      try {
        const data = await fetchNotes(studentId, activeVideoId);
        setNotes(data.notes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  }, [isTabActive, studentId, activeVideoId]);

  const handleAddNoteClick = () => {
    const currentTime = videoPlayer ? videoPlayer.currentTime() : 0;
    setNoteTimestamp(currentTime);
    setAddNotesModal(true);
  };

  const handleNoteClick = (noteTimestamp) => {
    if (videoPlayer) {
      videoPlayer.currentTime(noteTimestamp);
    }
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('student_id', studentId);
      formData.append('video_id', activeVideoId);
      formData.append('note', newNote);
      formData.append('timestamp', noteTimestamp);
      const response = await storeNotes(formData);
      toast.success(response.message);
      setAddNotesModal(false);
      setNewNote('');
      getAllStudentNotes();
      setMarkersCreated(false);
      createMarkers(videoPlayer, notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createMarkers = async (player, notes) => {
    if (markersCreated) {
      return;
    }
  
    const waitForDuration = () => {
      const total = player.duration();
      if (!isNaN(total)) {
        // Duration is available, proceed with marker creation
        console.warn(player);
        const progressControl = player.controlBar.progressControl;
        if (
          progressControl &&
          progressControl.children_ &&
          progressControl.children_.length > 0
        ) {
          const progressControlElement =
            player.controlBar.progressControl.children_[0].el_;
  
          if (progressControlElement) {
            clearMarkers(progressControlElement);
  
            if (Array.isArray(notes) && notes.length > 0) {
              notes.forEach((note) => {
                const left = (note.timestamp / total) * 100 + '%';
                const time = note.timestamp;
  
                const markerElement = document.createElement('div');
                markerElement.className = 'vjs-marker';
                markerElement.style = `left:${left}`;
                markerElement.setAttribute('data-time', time);
                markerElement.innerHTML = `<span>${note.content}</span>`;
  
                markerElement.addEventListener('click', () => {
                  player.currentTime(time);
                });
  
                progressControlElement.appendChild(markerElement);
              });
  
              setMarkersCreated(true);
            }
          }
        }
      } else {
        // Duration is not available yet, wait and try again
        setTimeout(waitForDuration, 100);
      }
    };
  
    waitForDuration();
  };
  

  const clearMarkers = (progressControlElement) => {
    const existingMarkers =
      progressControlElement.getElementsByClassName('vjs-marker');
    Array.from(existingMarkers).forEach((marker) => {
      marker.remove();
    });
  };

  // Implement your logic for creating markers after note is set
  useEffect(() => {
    if (videoPlayer && notes && notes.length > 0) {
      if (videoPlayer.isReady_) {
        createMarkers(videoPlayer, notes);
      } else {
        videoPlayer.ready(() => {
          createMarkers(videoPlayer, notes);
        });
      }
    }
  }, [notes]);

  useEffect(() => {
    getAllStudentNotes();
    return () => {
      setMarkersCreated(false);
    };
  }, [activeVideoId]);

  return (
    <>
      <div
        className="messages-content chat-wrapper scroll-bar px-3 py-2"
        style={{ height: 400 }}
      >
        {notes ? (
          notes?.map((note, index) => (
            <div className="message-item outgoing-message" key={index}>
              <div className="message-user">
                <div className="time">{formatTimestamp(note.created_at)}</div>
              </div>
              <div
                className="message-wrap bg-gold-gradiant"
                onClick={() => handleNoteClick(note.timestamp)}
              >
                {note.content} at {formatVideoTimestamp(note?.timestamp)}
              </div>
            </div>
          ))
        ) : (
          <div className="message-item"></div>
        )}
      </div>

      <div className="text-center w-100 ">
        <div
          className=" header-btn cursor-pointer w-100 fw-600 text-white font-xsss px-3 py-3 text-center d-inline-block rounded border-0 bg-primary-gradiant"
          onClick={handleAddNoteClick}
        >
          <i className="feather-file mr-2"></i> New Note
        </div>
      </div>

      <NoteModal
        show={addNotesModal}
        handleClose={() => setAddNotesModal(false)}
        noteTimestamp={noteTimestamp}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
        handleSaveNote={handleSaveNote}
      />
    </>
  );
}

NoteTab.propTypes = {
  activeVideoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  videoPlayer: PropTypes.object,
  isTabActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default NoteTab;
