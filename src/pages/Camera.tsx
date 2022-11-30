import { useRef, useCallback, useState } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

const photoWidth = 450;
const photoHeight = 700;

function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  const videoConstraints = {
    width: photoWidth,
    height: photoHeight,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const captureResult = webcamRef.current.getScreenshot();
      if (captureResult) {
        setImageList((prev) => {
          const copy = [...prev];
          copy.push(captureResult);
          return copy;
        });
      }
    }
  }, [webcamRef]);

  return (
    <Container>
      <CameraContainer>
        <StyledWebcam
          ref={webcamRef}
          audio={false}
          width={photoWidth}
          height={photoHeight}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
          }}
        />
        <button onClick={capture}>Capture photo</button>
      </CameraContainer>
      <button>
        <Link to="/gallery" state={{ imageList }}>
          사진 고르기
        </Link>
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  width: 100%;
  height: 100%;
`;

const CameraContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledWebcam = styled(Webcam)``;

export default Camera;
