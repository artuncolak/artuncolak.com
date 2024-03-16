/* eslint-disable @next/next/no-img-element */

interface Props {
  src: string | undefined;
  alt: string | undefined;
}

export default function PostImage({ src, alt }: Props) {
  return <img src={src} alt={alt} className="mx-auto rounded shadow-md" />;
}
