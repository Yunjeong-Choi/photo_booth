import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";

const Gallery = () => {
  const { state } = useLocation() as { state?: { imageList?: string[] } };
  const [imagesInFrame, setImagesInFrame] = useState<string[]>([]);

  const addToFrame = (target: string) => {
    if (imagesInFrame.length < 4) {
      setImagesInFrame((prev) => {
        const copy = [...prev];
        copy.push(target);
        return copy;
      });
    }
  };

  if (!state || !state.imageList) {
    return null;
  }

  return (
    <>
      <ImageListContainer>
        {state.imageList.map((image, index) => (
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
          <SelectedImage key={`selected-${index}`} src={image} alt="selected" />
        ))}
      </FrameContainer>
      <button>
        <Link to="/print" state={{ imagesInFrame }}>
          다음
        </Link>
      </button>
    </>
  );
};

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
  width: 400px;
  height: 600px;
  overflow: hidden;
  background-color: black;
`;
const SelectedImage = styled.img`
  width: 170px;
  height: 250px;
  margin: 15px;
`;

export default Gallery;
