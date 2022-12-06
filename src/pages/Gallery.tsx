import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultLinkButton from "../components/DefaultLinkButton";

import img_no_image from "../assets/img_no_image.svg";
import img_pink_heart from "../assets/img_pink_heart.svg";

const Gallery = () => {
  const { state } = useLocation() as { state?: { imageList?: string[] } };
  const [imagesInFrame, setImagesInFrame] = useState<string[]>([
    img_no_image,
    img_no_image,
    img_no_image,
    img_no_image,
  ]);

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
    <StyledContainer>
      <Section>
        <SectionTitle>사진 4장을 선택해주세요</SectionTitle>
        <ImageListContainer>
          {state.imageList.map((image, index) => (
            <ImageItem>
              <span>{index + 1}</span>
              <Image
                key={`result-${index}`}
                src={image}
                alt="capture result"
                onClick={() => addToFrame(image)}
              />
            </ImageItem>
          ))}
          <Notice>{`${"n"}초 후 자동으로 사진이 선택됩니다.`}</Notice>
        </ImageListContainer>
      </Section>
      <Section>
        <SectionTitle>미리보기</SectionTitle>
        <PhotoFrame>
          <div>
            {imagesInFrame.map((image, index) => (
              <Image key={`selected-${index}`} src={image} alt="selected" />
            ))}
            <HeartsDecoration>
              <img src={img_pink_heart} alt="heart" />
              <img src={img_pink_heart} alt="heart" />
              <img src={img_pink_heart} alt="heart" />
            </HeartsDecoration>
          </div>
        </PhotoFrame>
        <NextButton destinationPath="/print" linkState={{ imagesInFrame }}>
          다음
        </NextButton>
      </Section>
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackground)`
  display: flex;
  gap: 13rem;
`;

const Section = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const ImageListContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 0rem;
  width: 50rem;
`;

const SectionTitle = styled.p`
  font-size: 4rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > span {
    font-size: 3rem;
    font-weight: 800;
  }
`;

const Image = styled.img`
  width: 14rem;
  height: 20rem;
  background-color: lightgray;
`;

const Notice = styled.p`
  margin-top: 3rem;
  font-size: 3rem;
`;

const PhotoFrame = styled.div`
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

const HeartsDecoration = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  width: 100%;
  margin-right: 5.5rem;

  > img {
    width: 3rem;
  }
`;

const NextButton = styled(DefaultLinkButton)`
  width: 32rem;
  height: 6rem;
`;

export default Gallery;
