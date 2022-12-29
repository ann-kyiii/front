import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { RootState } from "../../../reducers";
import {
  changeKeywordTag,
  resetKeywordTag
} from "../../../actions/tagselector";
import styles from "./TagSelector.module.css";

export const TagSelector = () => {
  const keywordTags = useSelector((state: RootState) => state.tagSelector);
  const dispatch = useDispatch();

  const handleClick = useCallback((id: number): void => {
    dispatch(changeKeywordTag(id));
  }, []);

  useEffect(() => {
    dispatch(resetKeywordTag());
    return () => {
      dispatch(resetKeywordTag());
    };
  }, []);

  return (
    <div className={styles.TagSelectorWraper}>
      <ul className={styles.TagULWraper}>
        {keywordTags.map(tag => (
          <li key={tag.id} className={styles.TagListWraper}>
            <button
              type="button"
              tabIndex={0}
              onClick={() => handleClick(tag.id)}
              className={cx(styles.ListButton, {
                [styles.isSelected]: tag.isSelected
              })}
            >
              {tag.keyword}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSelector;
