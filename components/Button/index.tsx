import styles from 'components/Button/Button.module.scss';

interface Props {
  children: React.ReactNode;
  eventHandler: React.MouseEventHandler;
}

const Button = ({ children, eventHandler }: Props): JSX.Element => {
  return (
    <>
      <button onClick={eventHandler} className={styles.el_button}>
        {children}
      </button>
    </>
  );
};

export default Button;
