import React from "react";
import PastWinner from "../../../app/_components/Home/PastWinners";

const PastWinnersList = () => {
  return (
    <div className="relative mr-0 px-10 lg:px-0">
      {/* <img
        src="images/design-left.png"
        alt="design-left"
        className="absolute -z-10 opacity-0 lg:opacity-50 lg:w-[30%] left-0 top-1/2"
      /> */}
      <div className="lg:px-20 my-2 z-10">
        <div>
          <div className="flex justify-center items-center p-6 rounded-lg my-5">
            
            <div className="flex-1 h-px bg-gray-300"></div>
            
            <div className="mx-6">
              <div className="bg-slate-700 text-white px-8 py-3 rounded-full">
                <h1 className="font-semibold text-lg lg:text-xl text-center whitespace-nowrap">
                  Past Winners
                </h1>
              </div>
            </div>
            
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
        <PastWinner />
      </div>
    </div>
  );
};

export default PastWinnersList;