import clsx from 'clsx';

import styles from 'components/CommentItem/CommentItem.module.scss';

export default function UiButton({
  isClicked,
  number,
  text,
  icon,
  onClick,
}: {
  isClicked: boolean;
  number: number;
  text: string;
  icon: string;
  onClick: () => void;
}) {
  const classes = isClicked
    ? clsx(styles.el_uiButton, styles.clicked, styles[text])
    : styles.el_uiButton;

  return (
    <button className={classes} onClick={onClick} id="likes">
      <span>{icon} </span>
      {number}
    </button>
  );
}
