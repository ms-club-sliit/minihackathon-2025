import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useDisplaySize, usePerspectiveOnMouseMoveEffect } from "../../hooks";

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

	const size = useDisplaySize();

	usePerspectiveOnMouseMoveEffect(ref);

	useImperativeHandle(this_ref, () => ({
		renderTicket: () => {
			if (ref.current === null) {
				return;
			}

			ref.current.style.transform = "none";
			return toPng(htmlRef.current, { cacheBust: true });
		},
	}));

	useEffect(() => {
		if (onRender && ref.current) {
			ref.current.style.transform = "none";
			toPng(ref.current, { cacheBust: true })
				.then((dataUrl) => {
					ref.current.style.transform = "none";
					onRender(dataUrl);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [ref, isDebugModeOn, onRender]);

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
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return new Intl.DateTimeFormat('en-US', options).format(new Date());
	};

	const getCurrentTimeString = () => {
		const options = { hour: 'numeric', minute: 'numeric', hour12: true };
		return new Intl.DateTimeFormat('en-US', options).format(new Date());
	};

	// Embedded styles to ensure they work with html-to-image
	const embeddedStyles = {
		container: {
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			height: '100%',
			border: '4px solid black',
			borderRadius: '30px',
			backgroundColor: 'white',
			backgroundImage: 'url("/assets/teamcard/bg.svg")',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		},
		leftSection: {
			height: '100%',
			flexGrow: 1,
			paddingLeft: '54px',
			paddingTop: '51px',
			paddingBottom: '51px'
		},
		contentWrapper: {
			display: 'flex',
			flexDirection: 'row',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		},
		teamSection: {
			height: '100%',
			maxWidth: '275px',
			marginRight: '30px'
		},
		teamNameWrapper: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: '30px'
		},
		teamName: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			fontSize: '32px',
			fontWeight: '700',
			lineHeight: '38px',
			letterSpacing: '-0.02em',
			display: '-webkit-box',
			WebkitLineClamp: 2,
			WebkitBoxOrient: 'vertical',
			overflow: 'hidden'
		},
		memberRow: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: '14px'
		},
		memberAvatar: {
			width: '40px',
			height: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexShrink: 0,
			borderRadius: '50%',
			backgroundColor: 'black',
			marginRight: '8px',
			overflow: 'hidden'
		},
		avatarText: {
			color: 'white',
			fontSize: '20px',
			fontWeight: 'bold'
		},
		memberName: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			fontSize: '20px',
			fontWeight: '700',
			lineHeight: '24px',
			letterSpacing: '-0.02em',
			display: '-webkit-box',
			WebkitLineClamp: 2,
			WebkitBoxOrient: 'vertical',
			overflow: 'hidden'
		},
		rightSection: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: '40px'
		},
		logo: {
			marginBottom: '8px'
		},
		round: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			color: '#969696',
			fontSize: '24px',
			fontWeight: '500',
			lineHeight: '29px',
			letterSpacing: '-0.02em',
			textAlign: 'center',
			marginBottom: '28px'
		},
		date: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			fontSize: '24px',
			fontWeight: '700',
			lineHeight: '29px',
			letterSpacing: '-0.02em',
			textAlign: 'center',
			marginBottom: '6px'
		},
		time: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			color: '#969696',
			fontSize: '24px',
			fontWeight: '600',
			lineHeight: '29px',
			letterSpacing: '-0.02em',
			textAlign: 'center',
			marginBottom: '16px'
		},
		hostSection: {
			width: '183px',
			height: '70px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		},
		hostText: {
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			fontSize: '20px',
			fontWeight: '700',
			lineHeight: '24px',
			letterSpacing: '-0.02em',
			textAlign: 'center',
			whiteSpace: 'nowrap',
			marginRight: '8px',
			fontSize: '14px',
			marginBottom: '8px'
		},
		logoContainer: {
			display: 'flex',
			justifyContent: 'center'
		},
		hostLogo: {
			height: '40px',
			objectFit: 'contain'
		},
		hostLogoSecond: {
			height: '40px',
			objectFit: 'contain',
			marginLeft: '8px'
		},
		dashedLine: {
			border: '2px dashed rgba(0, 0, 0, 0.19)',
			height: '100%'
		},
		ticketNumber: {
			width: '101px',
			fontFamily: '"SF Pro Display", Arial, sans-serif',
			fontSize: '36px',
			fontWeight: '800',
			writingMode: 'vertical-lr',
			textOrientation: 'mixed',
			transform: 'rotate(-180deg)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}
	};

	return (
		<div>
			<svg width={size === 0 ? 390 : 727} viewBox="0 0 727 400" ref={ref}>
				<foreignObject
					width={727}
					height={400}
					xmlns="http://www.w3.org/2000/svg"
				>
					<div ref={htmlRef} style={embeddedStyles.container}>
						<div style={embeddedStyles.leftSection}>
							<div style={embeddedStyles.contentWrapper}>
								<div style={embeddedStyles.teamSection}>
									<div style={embeddedStyles.teamNameWrapper}>
										<div style={embeddedStyles.teamName}>
											{props.team && props.team.team_name}
										</div>
									</div>

									{getMembers()
										.filter(member => member.name)
										.map((member, index) => (
											<div key={index} style={embeddedStyles.memberRow}>
												<div style={embeddedStyles.memberAvatar}>
													<div style={embeddedStyles.avatarText}>
														{member.name?.[0].toUpperCase()}
													</div>
												</div>
												<div style={embeddedStyles.memberName}>
													{member.name}
												</div>
											</div>
										))}
								</div>
								<div style={{ flexGrow: 1 }}></div>
								<div style={embeddedStyles.rightSection}>
									<img
										width={190}
										src="/assets/logo-light.png"
										alt="Mini hackathon logo"
										style={embeddedStyles.logo}
									/>
									<div style={embeddedStyles.round}>1st Round</div>
									<div style={embeddedStyles.date}>
										{getCurrentDateString()}
									</div>
									<div style={embeddedStyles.time}>
										{getCurrentTimeString()}
									</div>
									<div style={embeddedStyles.hostSection}>
										<div style={embeddedStyles.hostText}>
											Hosted by
										</div>
										<div style={embeddedStyles.logoContainer}>
											<img
												src="/assets/ms_club_logo.png"
												alt="Mini hackathon logo"
												style={embeddedStyles.hostLogo}
											/>
											<img
												src="/assets/fcsc_logo.webp"
												alt="Mini hackathon logo"
												style={embeddedStyles.hostLogoSecond}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div style={embeddedStyles.dashedLine}></div>
						<div style={embeddedStyles.ticketNumber}>
							#{String(props.ticketNo).padStart(4, "0")}
						</div>
					</div>
				</foreignObject>
			</svg>
		</div>
	);
};

export default forwardRef(TeamTicket);