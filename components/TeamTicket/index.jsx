import React, { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useDisplaySize, usePerspectiveOnMouseMoveEffect } from '../../hooks';
import {
  getTicketImageOptions,
  convertImageToBase64,
  SF_PRO_DISPLAY_FONTS,
  TEAM_TICKET_STYLES,
} from '../../utils/ticketImageUtils';

/**
 *
 * @param {{
 * 		headerImage: "",
 * 		ticketNo: "",
 * 		team: "",
 * 		studentItNo: "",
 * 		title: "",
 * 		subTitle: "",
 * 		date: "",
 * 		url: "",
 *      onRender: "",
 * 		onClickSave: "",
 * 		save: ""
 * }} props
 * @property url - The url is required to generate the QR code
 * @example 	
	* <Ticketa
				headerImage={logo}
				title="Mini Hackathon 2022"
				subTitle="Awareness Session 📣"
				date={new Date()}
				ticketNo="334535"
				studentItNo="IT19104218"
				studentNames={["Rusiru Abhisheak"]}
				url={SessionInfo.awarenessSessionLink}
			/>
 */
const TeamTicket = (props, this_ref) => {
  const isDebugModeOn = false;
  const ref = useRef(null);
  const htmlRef = useRef(null);
  const { onRender } = props;
  const [base64Images, setBase64Images] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const size = useDisplaySize();

  usePerspectiveOnMouseMoveEffect(ref);

  // Function to convert image URL to base64 - using utility
  const getImageAsBase64 = convertImageToBase64;

  // Load base64 images on component mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('Loading images for ticket...');
        const [logoLight, msClubLogo, fcscLogo, backgroundSvg] =
          await Promise.all([
            getImageAsBase64('/assets/logo-light.png'),
            getImageAsBase64('/assets/ms_club_logo.png'),
            getImageAsBase64('/assets/fcsc_logo.webp'),
            getImageAsBase64('/assets/teamcard/bg.svg'),
          ]);

        setBase64Images({
          logoLight,
          msClubLogo,
          fcscLogo,
          backgroundSvg,
        });
        console.log('Images loaded successfully');
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        // Use fallback URLs
        setBase64Images({
          logoLight: '/assets/logo-light.png',
          msClubLogo: '/assets/ms_club_logo.png',
          fcscLogo: '/assets/fcsc_logo.webp',
          backgroundSvg: '/assets/teamcard/bg.svg',
        });
        setImagesLoaded(true);
      }
    };
    loadImages();
  }, []);

  useImperativeHandle(this_ref, () => ({
    renderTicket: () => {
      if (ref.current === null || !imagesLoaded) {
        return Promise.reject('Ticket not ready - images not loaded');
      }

      return toPng(htmlRef.current, getTicketImageOptions(727, 400));
    },
  }));

  useEffect(() => {
    if (onRender && ref.current && imagesLoaded) {
      console.log('Starting ticket render with loaded images...');
      // Longer delay to ensure images and fonts are fully rendered, especially on production
      const delay = process.env.NODE_ENV === 'production' ? 2000 : 1000;
      setTimeout(() => {
        ref.current.style.transform = 'none';
        toPng(ref.current, getTicketImageOptions(727, 400))
          .then(dataUrl => {
            console.log('Ticket rendered successfully');
            ref.current.style.transform = 'none';
            onRender(dataUrl);
          })
          .catch(err => {
            console.error('Ticket render error:', err);
          });
      }, delay); // Increased delay for production
    }
  }, [ref, isDebugModeOn, onRender, imagesLoaded]);

  const getMembers = useCallback(() => {
    if (!props.team) return [];

    let members = [];
    for (let i = 1; i <= 4; i++) {
      let member = props.team[`member0${i}`];

      if (member) members.push({ image: member.imgUrl, name: member.name });
    }

    return members;
  }, [props.team]);

  const getCurrentDateString = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  };

  const getCurrentTimeString = () => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  };

  // Don't render until images are loaded
  if (!imagesLoaded) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
          <div>Loading ticket images...</div>
          <div className='text-sm text-gray-500 mt-2'>
            Please wait while we load the logos
          </div>
        </div>
      </div>
    );
  }

  // Inline styles for ticket to ensure they work in html-to-image conversion
  const inlineStyles = TEAM_TICKET_STYLES;

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: SF_PRO_DISPLAY_FONTS }} />
      <svg width={size === 0 ? 390 : 727} viewBox='0 0 727 400' ref={ref}>
        <foreignObject
          width={727}
          height={400}
          xmlns='http://www.w3.org/2000/svg'
        >
          <div
            ref={htmlRef}
            className='flex flex-row w-full h-full border-black border-[4px] rounded-[30px] bg-white'
            style={{
              backgroundImage: `url(${
                base64Images.backgroundSvg || '/assets/teamcard/bg.svg'
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className='h-full flex-grow pl-[54px] py-[51px]'>
              <div className='flex flex-row h-full justify-center items-center'>
                <div className='h-full max-w-[275px] mr-[30px]'>
                  <div className='flex flex-row items-center mb-[30px]'>
                    <div
                      className='line-clamp-2'
                      style={inlineStyles.ticketTeamName}
                    >
                      {props.team && props.team.team_name}
                    </div>
                  </div>

                  {getMembers()
                    .filter(member => member.name) // Filter out members with an empty or undefined name
                    .map((member, index) => (
                      <div
                        key={index}
                        className='flex flex-row items-center mb-[14px]'
                      >
                        <div className='w-[40px] h-[40px] flex justify-center items-center flex-shrink-0 rounded-full bg-black mr-[8px] overflow-hidden'>
                          <div className='text-white text-xl font-bold'>
                            {member.name?.[0].toUpperCase()}
                          </div>
                        </div>
                        <div
                          className='line-clamp-2'
                          style={inlineStyles.ticketTeamMember}
                        >
                          {member.name}
                        </div>
                      </div>
                    ))}
                </div>
                <div className='flex-grow'></div>
                <div className='flex flex-col justify-center items-center mr-[40px]'>
                  <img
                    width={190}
                    src={base64Images.logoLight || '/assets/logo-light.png'}
                    alt='Mini hackathon logo'
                    className='mb-[8px]'
                  />
                  <div
                    className='mb-[28px]'
                    style={inlineStyles.ticketTeamRound}
                  >
                    1st Round
                  </div>
                  <div className='mb-[6px]' style={inlineStyles.ticketTeamDate}>
                    {getCurrentDateString()}
                  </div>
                  <div
                    className='mb-[16px]'
                    style={inlineStyles.ticketTeamTime}
                  >
                    {getCurrentTimeString()}
                  </div>
                  <div className='w-[183px] h-[70px] flex-row justify-center'>
                    <div
                      className='whitespace-nowrap mr-[8px] text-sm mb-2'
                      style={inlineStyles.teamHostedBy}
                    >
                      Hosted by
                    </div>
                    <div className='flex justify-center'>
                      <img
                        src={
                          base64Images.msClubLogo || '/assets/ms_club_logo.png'
                        }
                        alt='MS Club logo'
                        className='h-[40px] object-contain'
                      />
                      <img
                        src={base64Images.fcscLogo || '/assets/fcsc_logo.webp'}
                        alt='FCSC logo'
                        className='h-[40px] object-contain ml-2'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={inlineStyles.teamDashedLine}></div>
            <div
              className='w-[101px] flex justify-center items-center'
              style={inlineStyles.teamNumber}
            >
              #{String(props.ticketNo).padStart(4, '0')}
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default forwardRef(TeamTicket);
