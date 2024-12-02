import { Container, Image, ImageProps } from "@mantine/core";

export default function ImageContainer({...props}: ImageProps) {
    return (
        <Container p={0}>
            <Image {...props} />
        </Container>
    );
}