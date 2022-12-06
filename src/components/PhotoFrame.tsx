import styled from "styled-components";

import img_no_image from "../assets/img_no_image.svg";
import img_pink_heart from "../assets/img_pink_heart.svg";
import ImageItem from "./ImageItem";

interface PhotoFrameProps {
  className?: string;
  imageList: string[];
  withDeleteButton: boolean;
  handleClickDeleteButton: (index: number) => void;
}

const PhotoFrame = (props: PhotoFrameProps) => {
  return (
    <Container className={props.className}>
      <div>
        {props.imageList.map((image, index) => (
          <ImageContainer key={`image-in-frame-${index}`}>
            {props.withDeleteButton && image !== "" && (
              <DeleteFromFrameButton
                onClick={() => props.handleClickDeleteButton(index)}
              >
                X
              </DeleteFromFrameButton>
            )}
            <ImageItem
              key={`selected-${index}`}
              imageSrc={image === "" ? img_no_image : image}
            />
          </ImageContainer>
        ))}
        <HeartsDecoration>
          <img src={img_pink_heart} alt="heart" />
          <img src={img_pink_heart} alt="heart" />
          <img src={img_pink_heart} alt="heart" />
        </HeartsDecoration>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 35rem;
  height: 55rem;
  overflow: hidden;
  background-color: white;

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const DeleteFromFrameButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0rem;

  padding: 0.5rem;
  background-color: transparent;
  color: black;
  font-size: 2rem;
`;

const HeartsDecoration = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  width: 100%;
  margin-right: 5.5rem;

  > img {
    width: 2.5rem;
  }
`;

export default PhotoFrame;
