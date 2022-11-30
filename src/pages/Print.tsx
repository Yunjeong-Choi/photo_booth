import { useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

const Print = () => {
  const { state } = useLocation() as { state?: { imagesInFrame?: string[] } };
  const componentToPrintRef = useRef<HTMLDivElement>(null);

  if (!state || !state.imagesInFrame) {
    return null;
  }

  return (
    <>
      <FrameContainer ref={componentToPrintRef}>
        {state.imagesInFrame.map((image, index) => (
          <SelectedImage key={`selected-${index}`} src={image} alt="selected" />
        ))}
      </FrameContainer>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentToPrintRef.current}
      />
    </>
  );
};

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

export default Print;
