import React, { useEffect, useState } from "react";

import { getConfig } from "@edx/frontend-platform";
import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";

import NeedsAttentionModal from "./NeedsAttentionModal";

const NeedsAttentionButton = ({ courseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const API_URL = `${getConfig().LMS_BASE_URL}/api/content_needs_attention/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await getAuthenticatedHttpClient().get(API_URL);
        setData(responses.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const course = data?.find(
    (item) => String(item.course_id) === String(courseId)
  );

  if (!course) return <></>;

  return (
    <>
      <button className="needs-attention-button" onClick={handleOpenModal}>
        <b>Needs Attention</b>
        <br />
        {course.blocks.length} New Item(s)
      </button>
      {isModalOpen && (
        <NeedsAttentionModal
          handleCloseModal={handleCloseModal}
          course={course}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default NeedsAttentionButton;
