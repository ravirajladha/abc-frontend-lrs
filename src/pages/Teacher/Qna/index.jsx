import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ContentHeader } from '@/components/common';
import { ChatInterface, ChatUserList } from '@/components/teacher/qna';
import { fetchStudents, fetchQnA, storeQnA } from '@/api/teacher';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { Spinner } from 'react-bootstrap';

function Qna() {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState({
    id: '',
    name: '',
    status: false,
  });
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ answer: '', student_id: '' });

  const [filteredStudents, setFilteredStudents] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStudents = useCallback(async () => {
    try {
      const response = await fetchStudents();
      setStudents(response.students);
      setFilteredStudents(response.students);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  }, []);

  const getMessages = useCallback(async () => {
    try {
      const response = await fetchQnA(studentId, teacherId);
      setMessages(response.merged_messages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      setLoading(false);
    }
  }, [studentId, teacherId]);

  useEffect(() => {
    setTeacherId(userData.id);
    setTeacherName(userData.username);
    getStudents();
  }, []);

  useEffect(() => {
    if (studentId && teacherId) {
      getMessages();
    }
  }, [studentId, teacherId]);

  const handChatStudent = useCallback(
    (studentId, studentName, messageStatus) => {
      setLoading(true);
      setSelectedStudent({
        id: studentId,
        name: studentName,
        status: messageStatus,
      });
      setStudentId(studentId);
      setFormData({ ...formData, student_id: studentId });
    },
    [formData]
  );

  const shouldShowInput = useMemo(() => {
    const lastMessage =
      messages && messages.length > 0 ? messages[messages.length - 1] : null;
    return (
      (messages &&
        messages.length > 0 &&
        lastMessage &&
        lastMessage.sender_id !== teacherId) ||
      (selectedStudent && selectedStudent.status)
    );
  }, [messages, selectedStudent, teacherId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const lastMessage = messages[messages.length - 1];
      const qnaId = lastMessage.qna_id;
      const updatedFormData = {
        ...formData,
        teacher_id: teacherId,
        qna_id: qnaId,
      };

      const response = await storeQnA(updatedFormData);
      if (response.message) {
        setMessages((prevMessages) => [...prevMessages, response.message]);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting answer:', error.message);
      setIsSubmitting(false);
    }
    setFormData({ ...formData, answer: '' });
  };

  const clearSelected = useCallback(() => {
    setStudentId(null);
    setSelectedStudent({ id: '', name: '', status: false });
    setMessages([]);
    setFormData({ answer: '', student_id: '' });
  }, []);

  const handleSearch = useCallback(
    (query) => {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    },
    [students]
  );

  useEffect(() => {
    if (studentId && teacherId) {
      getMessages();
    } else {
      clearSelected();
    }
  }, [studentId, teacherId, clearSelected, getMessages]);

  return (
    <div>
      <ContentHeader title="All" subtitle="QnAs" hasMargin={false} />
      <div className="row">
        {/* Left Chat List */}
        <div className="col-lg-6 col-xl-4 col-md-6 chat-left scroll-bar border-right-light pl-4 pr-4">
          <form action="#" className="mt-0 pl-3 pt-3">
            <div className="search-form">
              <i className="ti-search font-xs"></i>
              <input
                type="text"
                className="form-control text-grey-500 mb-0 bg-greylight border-0"
                placeholder="Search here."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </form>

          <div className="section full mt-2 mb-2 pl-3">
            <ul className="list-group list-group-flush">
              {filteredStudents && filteredStudents.length > 0 ? (
                filteredStudents.map((user, index) => (
                  <ChatUserList
                    key={index}
                    imageUrl={user?.profile_image}
                    name={user?.name}
                    studentClass={user?.class_name}
                    status={user?.read_status}
                    onClick={() =>
                      handChatStudent(
                        user.auth_id,
                        user.name,
                        user?.read_status
                      )
                    }
                  />
                ))
              ) : (
                <div className="text-center">
                  <h4 className="font-xss text-dark my-5 d-flex align-items-center justify-content-center">
                    No Students available
                  </h4>
                </div>
              )}
            </ul>
          </div>
        </div>
        {/* Right Chat Interface */}
        <div className="col-lg-6 col-xl-8 col-md-6 pl-0 d-none d-lg-block d-md-block">
          <ChatInterface
            users={students}
            messages={messages}
            selectedStudent={selectedStudent}
            teacherId={teacherId}
            teacherName={teacherName}
            loading={loading}
            showInput={shouldShowInput}
          />
          {shouldShowInput && (
            <div
              className="chat-bottom dark-bg p-3 shadow-none"
              style={{ width: '98%' }}
            >
              <form className="chat-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Start typing.."
                    name="answer"
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                    type="submit"
                    className={`bg-current ${isSubmitting ? 'disabled' : ''}`}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                    ) : (
                      <i className="ti-arrow-right text-white"></i>
                    )}
                  </button>
              </form>
            </div>
          )}
          {/* <div className="text-center p-3">
              <span>
                You are all caught up, There are no questions to answer!
              </span>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default Qna;
