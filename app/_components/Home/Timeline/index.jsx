"use client";
import { useEffect } from "react";
import TimelineData from "@/app/data/Timeline";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Timeline() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="relative mb-10">
      <h1
        id="timeline"
        className="text-3xl font-bold text-center mt-20 text-[#1E293B] min-[744px]:text-[38px] min-[1440px]:text-6xl mb-5"
      >
        Timeline
      </h1>
      <div className="p-5 md:p-0">
        <img
          src="images/2025-images/timeline-top-2.png"
          alt="timeline-top"
          className="h-[97px] min-[744px]:ml-12 lg:mx-auto lg:pl-10 min-[744px]:h-[171px] min-[744px]:ml-20 min-[1080px]:w-[210px] min-[1080px]:h-[170px] min-[744px]:h-[171px] min-[1440px]:h-[258px] min-[1440px]:w-[270px] opacity-50"
        />
        {/* <img
          src="images/design-left.png"
          alt="design-left"
          className="absolute -z-10 opacity-0 lg:opacity-50 lg:w-[30%] left-0 top-1/2"
        />
        <img
          src="images/design-right.png"
          alt="design-right"
          className="absolute -z-10 opacity-0 lg:opacity-50 lg:w-[30%] right-0 top-1/2"
        /> */}
        {TimelineData.length > 0 ? (
          <VerticalTimeline animate={true} className="custom">
            {TimelineData.map((timeline, index) => (
              <div
                key={index}
                data-aos={
                  timeline.position == "left" ? "fade-left" : "fade-right"
                }
              >
                <VerticalTimelineElement
                  position={timeline.position}
                  visible={true}
                  className="vertical-timeline-element--work z-10 custom-sm-card"
                  contentStyle={{
                    boxShadow: "0px 2px 9px #807E7E",
                    borderRadius: "15px",
                    marginBottom: "18px",
                  }}
                  contentArrowStyle={{ borderRight: "10px solid  #EF4A23" }}
                  iconClassName="custom-icon bg-[#EF4A23] border-solid border-[10px] lg:border-[15px] border-[#434040]"
                >
                  <div className="">
                    <h3 className="text-[10px] text-[#EF4A23] font-semibold xl:mb-2 min-[744px]:text-[13px] min-[1440px]:text-[20px]">
                      {timeline.date}
                    </h3>
                    <h4 className="text-[14px] text-[#161414] font-bold xl:leading-8 xl:mb-4 min-[744px]:text-[20px] min-[1440px]:text-[36px]">
                      {timeline.title}
                    </h4>
                    <h5 className="text-[10px] text-[#334155] font-semibold text-justify min-[744px]:text-[13px] min-[1440px]:text-[20px]">
                      {timeline.description}
                    </h5>
                  </div>
                </VerticalTimelineElement>
              </div>
            ))}
          </VerticalTimeline>
        ) : (
          <h1 className="text-2xl text-center my-10 font-light md:ml-14">
            No Timeline found
          </h1>
        )}
        <img
          src="images/2025-images/timeline-mid.png"
          alt="timeline-mid"
          className="h-[98px] -mt-10 min-[744px]:left-24 absolute min-[1170px]:left-48 lg:top-[48%] min-[744px]:h-[120px] min-[744px]:w-[120px] min-[1440px]:h-[210px] min-[1440px]:w-[218px] opacity-50"
        />
        <img
          src="images/2025-images/timeline-end.png"
          alt="timeline-end"
          className="h-[135px] w-[135px] object-contain image-rendering-crisp-edges ml-auto mr-10 -mt-10 
             lg:-mt-52 lg:mr-20 
             min-[744px]:h-[200px] min-[744px]:w-[200px] 
             min-[1440px]:h-[300px] min-[1440px]:w-[300px] opacity-50"
        /> {/* make little big bigger this image */}
      </div>
    </main>
  );
}
