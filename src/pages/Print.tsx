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

  const printDiv = () => {
    const html = document.querySelector("html");
    const printSection = document.querySelector(".print-element")?.outerHTML;
    const printDiv = document.createElement("div");
    printDiv.id = "page";
    html?.appendChild(printDiv);
    if (printSection) {
      printDiv.innerHTML = printSection;
    }
    printDiv.style.display = "block";
    document.body.style.display = "none";
    window.print();
    // document.body.style.display = "block";
    // printDiv.style.display = "none";
  };

  return (
    <>
      <FrameContainer ref={componentToPrintRef} className={"print-element"}>
        {state.imagesInFrame.map((image, index) => (
          <SelectedImage key={`selected-${index}`} src={image} alt="selected" />
        ))}
      </FrameContainer>
      <button onClick={printDiv}>Print this out!</button>
      {/* <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentToPrintRef.current}
      /> */}
    </>
  );
};

const FrameContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 408px;
  height: 604px;
  /* height: 608px; */
  overflow: hidden;
  background-color: black;
`;

const SelectedImage = styled.img`
  width: 170px;
  height: 250px;
  margin: 15px;
`;

export default Print;
