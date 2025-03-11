import { FC } from "react";
import MainPosterImage from "@/assets/courses/main-poster.png";
import BackgroundImage from "@/assets/courses/background.png";

type PosterProps = {
  page?: string;
};

const PosterComponent: FC<PosterProps> = ({ page = "main" }) => {
  if (page !== "main") return null;

  return (
    <div className="relative bg-brand overflow-hidden h-full max-h-fit flex items-center justify-end">
      <div className="absolute w-full h-full z-2">
        <div className="container mx-auto h-full flex items-center justify-start">
          <h1 className="text-5xl font-bold text-white">Kurslar</h1>
        </div>
      </div>

      <img
        src={MainPosterImage}
        alt="Course Poster"
        className="w-1/2 top-0 right-0 z-1"
      />

      <img
        src={BackgroundImage}
        alt="Background"
        className="absolute w-full h-auto -top-1/2 left-0 z-0 opacity-5"
      />
    </div>
  );
};

export default PosterComponent;
