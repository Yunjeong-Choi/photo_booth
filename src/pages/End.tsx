import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../components/DefaultButton";
import ContainerWithBackground from "../components/ContainerWithBackground";

const End = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <StyledContainer>
      <SectionTitle>지금 이순간, 인쇄중</SectionTitle>
      {/* TODO: 문구 깜빡이게
      {`이 프로그램을 개발해주신
        신부 친구 최윤정님, 김승연님 감사합니다!
        개발 문의 : yunjeong.dev.2173@gmail.com
        winkitee@gmail.com`} */}
      <Notice>
        {`오늘 결혼식에 와주셔서 감사합니다!

          추가로 인쇄한 1장은 방명록에 남겨주세요
          욱엽이와 해경이가 평생 간직할게요`}
      </Notice>
      <GoHomeButton handleClickButton={goToHomePage}>처음으로</GoHomeButton>
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackground)`
  flex-direction: column;
  gap: 8rem;
`;

const SectionTitle = styled.div`
  font-size: 6rem;
`;

const Notice = styled.p`
  font-size: 3rem;
  white-space: pre-line;
`;

const GoHomeButton = styled(DefaultButton)`
  width: 36rem;
  height: 6rem;
`;

export default End;
