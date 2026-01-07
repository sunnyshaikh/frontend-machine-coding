const ProgressBar = ({ value = 0 }) => {
  return (
    <div className="progress-bar">
      <span>{value.toFixed()}%</span>
      <div className="fill" style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default ProgressBar;
