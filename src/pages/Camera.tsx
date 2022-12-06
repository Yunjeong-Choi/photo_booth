import { useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import ContainerWithBackground from "../components/ContainerWithBackground";

const photoWidth = 490;
const photoHeight = 700;

const videoConstraints = {
  width: photoWidth,
  height: photoHeight,
  facingMode: "user",
};

function Camera() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const resultImageRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<any>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState(1);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (countdown <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      capture();
    }
  }, [countdown]);

  useEffect(() => {
    if (imageList.length > 0 && imageList.length < 6) {
      setTimeout(() => {
        setImageCount((prev) => prev + 1);
        setCountdown(10);
        startCountdown();
      }, 3000);
    } else if (imageList.length >= 6) {
      setTimeout(() => {
        navigate("/gallery", { state: { imageList } });
      }, 3000);
    }
  }, [imageList.length]);

  const startCountdown = useCallback(() => {
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 100); //TODO: 1250
    }
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const captureResult = webcamRef.current.getScreenshot();
      if (captureResult) {
        setImageList((prev) => {
          const copy = [...prev];
          copy.push(captureResult);
          return copy;
        });
        showResult(captureResult);
      }
    }
  }, [webcamRef]);

  const showResult = (result: string) => {
    if (resultImageRef.current) {
      resultImageRef.current.setAttribute("src", result);
      resultImageRef.current.style.display = "block";
      setTimeout(() => {
        if (resultImageRef.current) {
          resultImageRef.current.style.display = "none";
        }
      }, 3000);
    }
  };

  return (
    <StyledContainer>
      <CameraContainer>
        <Webcam
          ref={webcamRef}
          audio={false}
          width={photoWidth}
          height={photoHeight}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
          }}
        />
        <Result ref={resultImageRef} src={""} alt={"shooting result"} />
      </CameraContainer>
      <Countdown>
        <p>{`6장 중 ${imageCount}번째 촬영`}</p>
        <h2>{countdown}</h2>
      </Countdown>
    </StyledContainer>
  );
}

const StyledContainer = styled(ContainerWithBackground)`
  flex-direction: column;
`;

const CameraContainer = styled.div`
  position: relative;
`;

const Result = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  display: none;

  width: ${photoWidth}px;
  height: ${photoHeight}px;
`;

const Countdown = styled.div`
  position: absolute;
  top: 6rem;
  left: 8rem;

  font-size: 5rem;
`;

export default Camera;
