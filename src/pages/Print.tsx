import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ContainerWithBackground from "../components/ContainerWithBackground";
import DefaultButton from "../components/DefaultButton";
import PhotoFrame from "../components/PhotoFrame";

const Print = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { imagesInFrame?: string[] } };

  if (!state || !state.imagesInFrame) {
    return null;
  }

  const printDiv = () => {
    // 인쇄할 부분 추출
    const html = document.querySelector("html");
    const printSection = document.querySelector(".print-element")?.outerHTML;

    // 인쇄용 div 생성
    const printDiv = document.createElement("div");
    printDiv.id = "page";
    printDiv.style.width = "100vw";
    printDiv.style.height = "100vh";
    printDiv.style.backgroundColor = "black";
    html?.appendChild(printDiv);

    // 인쇄용 div에 내용 넣기
    if (printSection) {
      printDiv.innerHTML = printSection;
    }

    // 인쇄시작
    printDiv.style.display = "block";
    document.body.style.display = "none";
    setTimeout(() => {
      window.print();
      document.body.style.display = "block";
      printDiv.style.display = "none";
      navigate("/end");
    }, 1000);
  };

  return (
    <StyledContainer>
      <PhotoFrame className={"print-element"} imageList={state.imagesInFrame} />
      <NoticeSection>
        <SectionTitle>프린트 하기</SectionTitle>
        <Notice>
          {`① 아래 "프린트" 버튼을 누르고,
            ② [소장용 N장] + [편지용 추가 1장] 설정
            ③ "인쇄" 버튼 클릭하면 끝!`}
        </Notice>
        <PrintButton handleClickButton={printDiv}>프린트</PrintButton>
      </NoticeSection>
    </StyledContainer>
  );
};

const StyledContainer = styled(ContainerWithBackground)`
  gap: 6rem;
`;

const NoticeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const SectionTitle = styled.div`
  font-size: 6rem;
  font-weight: 800;
`;

const Notice = styled.p`
  font-size: 3rem;
  white-space: pre-line;
  line-height: 200%;
  text-align: left;
`;

const PrintButton = styled(DefaultButton)`
  width: 36rem;
  height: 6rem;
`;

export default Print;
