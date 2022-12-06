import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultButton from "../components/DefaultButton";
import ImageItem from "../components/ImageItem";
import PhotoFrame from "../components/PhotoFrame";

const Gallery = () => {
  const navigate = useNavigate();
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

  const handleClickButton = () => {
    navigate("/print", { state: { imagesInFrame } });
  };

  return (
    <StyledContainer>
      <Section>
        <SectionTitle>사진 4장을 선택해주세요</SectionTitle>
        <ImageListContainer>
          {state.imageList.map((image, index) => (
            <ImageContainer>
              <span>{index + 1}</span>
              <ImageItem
                key={`result-${index}`}
                imageSrc={image}
                handleClickImage={() => addToFrame(image)}
              />
            </ImageContainer>
          ))}
          <Notice>{`${"n"}초 후 자동으로 사진이 선택됩니다.`}</Notice>
        </ImageListContainer>
      </Section>
      <Section>
        <SectionTitle>미리보기</SectionTitle>
        <PhotoFrame
          imageList={imagesInFrame}
          handleClickDeleteButton={deleteFromFrame}
        />
        <NextButton handleClickButton={handleClickButton}>다음</NextButton>
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > span {
    font-size: 3rem;
    font-weight: 800;
  }
`;

const Notice = styled.p`
  margin-top: 3rem;
  font-size: 3rem;
`;

const NextButton = styled(DefaultButton)`
  width: 32rem;
  height: 6rem;
`;

export default Gallery;
