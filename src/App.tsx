import { useRef, useCallback, useState, Fragment } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import ReactToPrint from "react-to-print";

const photoWidth = 450;
const photoHeight = 700;

function App() {
  const webcamRef = useRef<Webcam>(null);
  const componentToPrintRef = useRef<HTMLDivElement>(null);
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
      <FrameContainer ref={componentToPrintRef}>
        {imagesInFrame.map((image, index) => (
          <SelectedImage key={`selected-${index}`} src={image} alt="selected" />
        ))}
      </FrameContainer>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentToPrintRef.current}
        // pageStyle="@page { size: 2in 2.96in }"
      />
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

const ImageListContainer = styled.div`
  flex-shrink: 0;
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
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /* gap: 5px 0px; */
  width: 400px;
  height: 592px;
  overflow: hidden;
  background-color: black;
`;
const SelectedImage = styled.img`
  width: 170px;
  height: 250px;
  margin: 15px;
`;

export default App;
