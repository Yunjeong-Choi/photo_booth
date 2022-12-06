import styled from "styled-components";

interface ImageItemProps {
  className?: string;
  imageSrc: string;
  handleClickImage?: () => void;
}

const ImageItem = (props: ImageItemProps) => {
  return (
    <Image
      className={props.className}
      src={props.imageSrc}
      alt="ImageItem"
      onClick={props.handleClickImage}
    />
  );
};

const Image = styled.img`
  width: 14rem;
  height: 20rem;
  background-color: lightgray;
`;

export default ImageItem;
