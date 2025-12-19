import React from "react";

import { getConfig } from "@edx/frontend-platform";

import "./NeedsAttention.scss";

const NeedsAttentionModal = ({ handleCloseModal, course, courseId }) => {
  return (
    <div className="overlay-styles">
      <div className="container-styles">
        <div className="close-button-body">
          <div className="close-button" onClick={handleCloseModal}>X</div>
        </div>
        <div className="content-container">
          <header className="modal__header">
            <h2 id="modal-title" className="modal__title">
              New course updates
            </h2>
            <p className="modal__subtitle">
              Recent changes have been added to the course. Review the items
              below.
            </p>
          </header>

          <section className="modal__cards">
            <ul className="updates-list">
              {course.blocks?.map(({ id, name }) => (
                <a
                  href={`${
                    getConfig().LMS_BASE_URL
                  }/courses/${courseId}/jump_to/${id}`}
                  target="_blank"
                >
                  <li className="update-card" key={id}>
                    <div className="update-card__meta">
                      <span
                        className="update-card__number"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div className="update-card__content">
                      <h3 className="update-card__title">{name}</h3>
                    </div>
                  </li>
                </a>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NeedsAttentionModal;
