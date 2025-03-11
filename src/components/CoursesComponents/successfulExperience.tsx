import { FC } from "react";

const SuccessfulExperience: FC = () => {
  return (
    <>
      <div className="successful-experience my-8 bg-brand">
        <div className="container mx-auto flex items-center space-x-8">
          <div className="side w-1/2">
            <div className="content my-12">
              <h3 className="title text-5xl text-white font-bold w-3/4 mb-4">
                Ipakchilikdagi muvaffaqiyatli tajriba
              </h3>
              <p className="subtitle text-lg text-white font-medium">
                Ipakchilikdagi muvaffaqiyatli tajriba, bu sohada amalga
                oshirilgan innovatsion yondashuvlar va zamonaviy texnologiyalar
                yordamida erishilgan natijalar haqida.
              </p>
            </div>
          </div>
          <div className="side w-1/2"></div>
        </div>
      </div>
    </>
  );
};


export default SuccessfulExperience;
