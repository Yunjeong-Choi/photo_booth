import { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import MadeBy from "../components/MadeBy";

const shootingDelay = 2500;
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
  const initialCountdownRef = useRef<any>(null);
  const shootingCountdownRef = useRef<any>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState(1);
  const [initialCountdown, setInitialCountdown] = useState(5);
  const [shootingCountdown, setShootingCountdown] = useState(10);
  const [isResultVisible, setIsResultVisible] = useState(false);

  useEffect(() => {
    startInitialCountdown();
  }, []);

  useEffect(() => {
    if (initialCountdown <= 0 && initialCountdownRef.current) {
      clearInterval(initialCountdownRef.current);
      initialCountdownRef.current = null;
      startShootingCountdown();
    }
  }, [initialCountdown]);

  useEffect(() => {
    if (shootingCountdown <= 0 && shootingCountdownRef.current) {
      clearInterval(shootingCountdownRef.current);
      shootingCountdownRef.current = null;
      capture();
    }
  }, [shootingCountdown]);

  useEffect(() => {
    if (imageList.length > 0 && imageList.length < 6) {
      setTimeout(() => {
        setImageCount((prev) => prev + 1);
        setShootingCountdown(10);
        startShootingCountdown();
      }, shootingDelay); // TODO: settimeout 안쓰고 순서 맞추기?
    } else if (imageList.length >= 6) {
      setTimeout(() => {
        navigate("/gallery", { state: { imageList } });
      }, shootingDelay);
    }
  }, [imageList.length]);

  const startInitialCountdown = useCallback(() => {
    if (initialCountdownRef.current === null) {
      initialCountdownRef.current = setInterval(() => {
        setInitialCountdown((prev) => prev - 1);
      }, 1000);
    }
  }, []);

  const startShootingCountdown = useCallback(() => {
    if (shootingCountdownRef.current === null) {
      shootingCountdownRef.current = setInterval(() => {
        setShootingCountdown((prev) => prev - 1);
      }, 1000);
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
      setIsResultVisible(true);
      setTimeout(() => {
        if (resultImageRef.current) {
          setIsResultVisible(false);
        }
      }, 2000);
    }
  };

  return (
    <StyledContainer>
      <Countdown>
        {initialCountdown > 0 ? (
          <>
            <p>{`5초 후에
                촬영을 시작합니다`}</p>
            <h3>{initialCountdown}</h3>
          </>
        ) : (
          <>
            <p>{`6장 중 ${imageCount}번째 촬영`}</p>
            <h3>{shootingCountdown}</h3>
          </>
        )}
      </Countdown>
      <CameraContainer>
        {/* TODO: 왜 카메라 천천히 등장하지 */}
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
        <Result
          ref={resultImageRef}
          src={""}
          alt={"shooting result"}
          isResultVisible={isResultVisible}
        />
      </CameraContainer>
      <MadeBy />
    </StyledContainer>
  );
}

const StyledContainer = styled(ContainerWithBackground)`
  flex-direction: column;
`;

const CameraContainer = styled.div`
  position: relative;
`;

const Result = styled.img<{ isResultVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${photoWidth}px;
  height: ${photoHeight}px;
  filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8));

  opacity: ${(props) => (props.isResultVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  transition-property: ${(props) => props.isResultVisible && "none"};
`;

const Countdown = styled.div`
  position: absolute;
  top: 5rem;
  left: 8rem;

  font-size: 5rem;

  > p {
    white-space: pre-line;
  }

  > h3 {
    font-size: 10rem;
  }
`;

export default Camera;
