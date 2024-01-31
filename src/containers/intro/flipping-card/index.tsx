import { ReactNode, useState } from "react";
import "./index.scss";

const FlippingCard = ({
  frontContent,
  backContent,
}: {
  frontContent: ReactNode;
  backContent: ReactNode;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="container">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front flex flex-col justify-between items-center">
            <div className="card-content">{frontContent}</div>
            <div
              className="w-[50%] rounded-2xl border-white border p-2 text-center mb-12"
              onClick={handleFlip}
            >
              More
            </div>
          </div>
          <div className="flip-card-back" onMouseLeave={handleFlip}>
            <div className="card-content">{backContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
