import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultLinkButton from "../components/DefaultLinkButton";

import img_no_image from "../assets/img_no_image.svg";
import img_pink_heart from "../assets/img_pink_heart.svg";

const Gallery = () => {
  const { state } = useLocation() as { state?: { imageList?: string[] } };
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imagesInFrame, setImagesInFrame] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    const loopCount = 4 - selectedImages.length;
    let blankList: string[] = [];
    for (let i = 0; i < loopCount; i++) {
      blankList.push("");
    }
    setImagesInFrame([...selectedImages, ...blankList]);
  }, [selectedImages]);

  const addToFrame = (target: string) => {
    if (selectedImages.length < 4) {
      setSelectedImages((prev) => {
        const copy = [...prev];
        copy.push(target);
        return copy;
      });
    }
  };

  if (!state || !state.imageList) {
    return null;
  }

  const deleteFromFrame = (index: number) => {
    const copiedSelectedImages = [...selectedImages];
    copiedSelectedImages.splice(index, 1);
    setSelectedImages(copiedSelectedImages);
  };

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
              <ImageContainer key={`image-in-frame-${index}`}>
                {image !== "" && (
                  <DeleteFromFrameButton onClick={() => deleteFromFrame(index)}>
                    X
                  </DeleteFromFrameButton>
                )}
                <Image
                  key={`selected-${index}`}
                  src={image === "" ? img_no_image : image}
                  alt="selected"
                />
              </ImageContainer>
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

const NextButton = styled(DefaultLinkButton)`
  width: 32rem;
  height: 6rem;
`;

export default Gallery;
