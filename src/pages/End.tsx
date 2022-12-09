import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultButton from "../components/DefaultButton";
import MadeBy from "../components/MadeBy";

const End = () => {
  const navigate = useNavigate();

  const goToPrintPage = () => {
    navigate(-1);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <StyledContainer>
      <SectionTitle>지금 이순간, 인쇄중</SectionTitle>
      <Notice>
        {`오늘 결혼식에 와주셔서 감사합니다!

          추가로 인쇄한 1장은 방명록에 남겨주세요
          욱엽이와 해경이가 평생 간직할게요`}
      </Notice>
      <ButtonArea>
        <GoHomeButton handleClickButton={goToHomePage}>처음으로</GoHomeButton>
        <PrintMoreButton handleClickButton={goToPrintPage}>
          추가 프린트 / 이미지 저장
        </PrintMoreButton>
      </ButtonArea>
      <MadeBy />
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackground)`
  flex-direction: column;
  gap: 6rem;
`;

const SectionTitle = styled.div`
  font-size: 6rem;
`;

const Notice = styled.p`
  font-size: 3rem;
  white-space: pre-line;
  line-height: 120%;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const PrintMoreButton = styled(DefaultButton)`
  width: 28rem;
  height: 4.5rem;
  opacity: 0.7;
  font-size: 1.5rem;
`;

const GoHomeButton = styled(DefaultButton)`
  width: 36rem;
  height: 6rem;
`;

export default End;
