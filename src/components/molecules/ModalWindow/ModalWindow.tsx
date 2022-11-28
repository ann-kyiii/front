import React from "react";

import styles from "./ModalWindow.module.css";

type ModalWindowProps = {
  bookTitle: string;
  userType: string;
  user: string;
  hideModal: any;
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
            Book Title：
            {bookTitle}
          </p>
          <p>
            {userType}：{user}
          </p>
        </div>
        <div className={styles.ChooseButtonWrapper}>
          <button className={styles.ChooseButton} onClick={hideModal}>
            DISAGREE
          </button>
          <button className={styles.ChooseButton} onClick={handleClick}>
            AGREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
