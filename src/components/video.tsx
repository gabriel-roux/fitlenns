import BackgroundImg from "@/assets/background.png";
import Image from "next/image";
import Mockup from "@/assets/videos/cell.png";

interface VideoCardProps {
  background: string;
}

export function VideoCard({ background }: VideoCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImg.src})` }}
      className="w-full max-w-[384px] rounded-[20px] flex items-center justify-center bg-center p-4 bg-no-repeat border-0 mb-8"
    >
      <div className="relative w-full h-[400px] rounded-[20px] bg-center bg-no-repeat overflow-hidden">
        <div className="absolute top-2 left-11 md:left-14 w-full max-w-[240px] h-[390px] overflow-hidden">
          <Image
            src={background}
            alt="Background"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <Image
          src={Mockup}
          alt="Mockup"
          layout="fill"
          objectFit="contain"
          quality={100}
          className="absolute top-0 left-0 min-h-[410px]"
        />
      </div>
    </div>
  );
}
