import BackgroundImg from "@/assets/background.png";
import Mockup from "@/assets/videos/cell3.png";
import Image from "next/image";

interface VideoCardProps {
  background: string;
  startQuiz?: boolean
}

export function VideoCard({ background, startQuiz }: VideoCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImg.src})` }}
      className="w-full max-w-[384px] rounded-[20px] flex items-center justify-center bg-center p-4 bg-no-repeat border-0 mb-8"
    >
      <div className="relative w-full h-[410px] rounded-[20px] bg-center bg-no-repeat overflow-hidden">
          <Image
            src={background}
            alt="Background"
            layout="fill"
            objectFit="contain"
            priority
            quality={100}
            className={`${startQuiz ? "scale-x-[0.79] scale-y-95" : "scale-95"}`}
          />
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
