import React from "react";

import styles from "./ModalWindow.module.css";

type ModalWindowProps = {
  bookTitle: string;
  userType: string;
  user: string;
  hideModal: () => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ModalWindow = (props: ModalWindowProps) => {
  const { bookTitle, userType, user, hideModal, handleClick } = props;
  return (
    <div className={styles.wrapper}>
      <div role="dialog" className={styles.modal}>
        <div className={styles.title}>確認</div>
        <div className={styles.center}>
          <p>
            BookTitle：
            {bookTitle}
          </p>
          <p>
            <span>{userType}</span>
            <span>：</span>
            <span>{user}</span>
          </p>
        </div>
        <div className={styles.ChooseButtonWrapper}>
          <button
            type="button"
            className={styles.ChooseButton}
            onClick={hideModal}
          >
            DISAGREE
          </button>
          <button
            type="button"
            className={styles.ChooseButton}
            onClick={handleClick}
          >
            AGREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
