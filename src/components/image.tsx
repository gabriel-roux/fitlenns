import BackgroundImg from "@/assets/background.png";
import Image from "next/image";

interface ImageCardProps {
    background: string;
}

export function ImageCard({ background }: ImageCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImg.src})` }}
      className="w-full max-w-[384px] rounded-[20px] flex items-center justify-center bg-center bg-no-repeat border-0 mb-8"
    >
       <Image
        src={background}
        alt="Background"
        width={269}
        height={269}
        quality={100}
        /> 
    </div>
  );
}
