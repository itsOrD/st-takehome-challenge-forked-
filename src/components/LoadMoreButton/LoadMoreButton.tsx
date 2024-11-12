import styles from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onClick: () => void;
  showAll: boolean;
}

const LoadMoreButton = ({ onClick, showAll}: LoadMoreButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
      aria-expanded={true}
    >
      {showAll ? '- Show Less -' : '+ Show More +'}
    </button>
  );
};

export default LoadMoreButton;
