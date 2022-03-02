import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/Button/Button.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  eventHandler: React.MouseEventHandler;
}
const Button = ({ children, eventHandler }: Props): JSX.Element => {
  return (
    <>
      <button onClick={eventHandler} className={styles.el_button}>
        {children}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </>
  );
};

export default Button;
