import { useScrollProgress } from '../hooks/useScrollProgress';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress">
      <div className="scroll-progress__track">
        <div
          className="scroll-progress__fill"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
      <div
        className="scroll-progress__dot"
        style={{ top: `${progress * 100}%` }}
      />
    </div>
  );
}
