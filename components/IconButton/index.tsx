import styles from './IconButton.module.scss';

const IconButton = ({
  children,
  width,
  height,
  backgroundColor,
  onClick,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <button
      className={styles.el_iconBtn}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
