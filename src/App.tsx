import { useRef, useCallback, useState, Fragment } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const photoWidth = 450;
const photoHeight = 700;

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imagesInFrame, setImagesInFrame] = useState<string[]>([]);

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

  const addToFrame = (target: string) => {
    if (imagesInFrame.length < 4) {
      setImagesInFrame((prev) => {
        const copy = [...prev];
        copy.push(target);
        return copy;
      });
    }
  };

  return (
    <Container className="App">
      <Fragment>
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
        <ImageListContainer>
          {imageList.map((image, index) => (
            <Result
              key={`result-${index}`}
              src={image}
              alt="capture result"
              onClick={() => addToFrame(image)}
            />
          ))}
        </ImageListContainer>
        <FrameContainer>
          {imagesInFrame.map((image, index) => (
            <SelectedImage
              key={`selected-${index}`}
              src={image}
              alt="selected"
            />
          ))}
        </FrameContainer>
      </Fragment>
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
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledWebcam = styled(Webcam)``;

const ImageListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px 0px;
  width: 210px;
`;

const Result = styled.img`
  width: 102px;
  height: 150px;
`;

const FrameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px 0px;
  width: 350px;
  height: 510px;
  overflow: hidden;
`;
const SelectedImage = styled.img`
  width: 170px;
  height: 250px;
`;

export default App;
