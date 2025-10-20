import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../images/logo.png';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { RiGithubFill, RiLinkedinFill, RiTelegram2Fill, RiDiscordFill, RiSpotifyFill } from 'react-icons/ri';
import { BsYoutube } from 'react-icons/bs';
import effectImage from '../images/effect.gif';
import bgGif from '../images/axolotl.gif';
import videoSrc from '../video/background.mp4';

const words = ['hilltty', 'хиллтти', 'ヒルッティ', 'ひるってぃ'];

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const smoothAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
  filter: blur(5px);

  @media (max-width: 768px) {
    width: auto;
    height: auto;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const MotionBackgroundWrapper = styled.div`
  position: absolute;
  top: 61%;
  left: 100%;
  width: 40%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 92%;
    left: 80%;
    width: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MotionBackgroundImage = styled(motion.img)`
  width: 100%;
  height: auto;
  object-fit: cover;
  will-change: transform, width, height, opacity;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 2rem;
  margin-left: 5rem;
  margin-top: -5rem;
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 0.25s ease 0.4s forwards;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-left: 0;
    margin-top: 0;
    min-height: calc(100vh - 250px);
    padding-top: 50px;
  }
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem 1.5rem 7rem;
  margin-bottom: 1rem;
  z-index: 2;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeInUp} 0.25s ease 0.75s forwards;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  opacity: 0;
  animation: ${scaleIn} 0.25s ease 0.8s forwards;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-right: 20px;

  &:hover img {
    transform: scale(1.1);
  }

  &:hover::after {
    opacity: 0.7;
    animation: ${smoothAnimation} 6s infinite linear;
    transform: scale(0.8);
  }

  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100px;
    height: 100px;
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    background-size: 400% 400%;
    z-index: -1;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.1s ease-in-out;
  z-index: 0;
`;

const EffectOverlay = styled.img`
  position: absolute;
  max-width: 150%;
  max-height: 150%;
  object-fit: contain;
  pointer-events: none;
  margin-top: 0px;
  margin-left: 5px;
  z-index: 1;
  content: url(${effectImage});
`;

const TypewriterContainer = styled.div`
  user-select: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 24px;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease 0.8s forwards;
`;

const TypewriterText = styled.span`
  color: white;
  font-family: 'Consolas', monospace;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 1px;
`;

const Cursor = styled.span`
  position: absolute;
  right: -10px;
  top: calc(50% + 2px);
  transform: translateY(-50%);
  width: 2px;
  height: 24px;
  background-color: white;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$blink ? blink : 'none'} 0.35s infinite;
  animation-delay: 0.8s;
`;


const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 0;
  opacity: 0;
  animation: ${fadeInUp} 0.25s ease 0.5s forwards;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2vh;
    margin-bottom: 1vh;
    margin-top: 5vh;
  }

  @media (min-width: 1921px) {
    font-size: 3rem;
  }
`;

const DownloadText = styled.span`
  font-family: 'Consolas', monospace;
  font-size: 2.7rem;
  user-select: none;

  @media (min-width: 1921px) {
    font-size: 3.4rem;
  }
`;

const Description = styled.p`
  color: #ccc;
  max-width: 600px;
  margin-bottom: 2rem;
  margin-top: 0;
  font-size: 1rem;
  opacity: 0;
  text-align: left;
  animation: ${fadeInUp} 0.25s ease 0.6s forwards;
  user-select: none;

  @media (max-width: 768px) {
    max-width: 90%;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    text-align: center;
  }

  @media (min-width: 1921px) {
    font-size: 1.2rem;
    max-width: 720px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: -150px;
    min-height: calc(100vh - 300px);
  }
`;

const IconWrapper = styled(motion.div)`
  width: ${props => props.$isFhd ? '50px' : '75px'};
  height: ${props => props.$isFhd ? '50px' : '75px'};
  margin: ${props => props.$isFhd ? '0 10px 0 0' : '0 30px 0 0'};
  opacity: 0.5;
  cursor: pointer;
  user-select: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 75%;
    height: 75%;
  }
`;

const iconVariants = {
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const Typewriter = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(false);
  const [lastTypedTime, setLastTypedTime] = useState(Date.now());
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsStarted(true);
    }, 3600);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    const cursorDelay = setTimeout(() => {
      setCursorVisible(true);
    }, 3200);

    return () => clearTimeout(cursorDelay);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const currentWord = words[wordIndex];
    const typeSpeed = () => Math.random() * (200 - 100) + 100;

    const timer = setTimeout(() => {
      const now = Date.now();

      if (now - lastTypedTime > 1000) {
        setCursorBlink(true);
      } else {
        setCursorBlink(false);
        setCursorVisible(true);
      }

      if (!isDeleting && text.length < currentWord.length) {
        setText(text + currentWord[text.length]);
        setLastTypedTime(now);
      } else if (isDeleting && text.length > 0) {
        setText(text.slice(0, -1));
        setLastTypedTime(now);
      } else if (text.length === currentWord.length) {
        setIsDeleting(true);
        return;
      } else if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        return;
      }
    }, typeSpeed());

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, lastTypedTime, isStarted]);

  return (
    <TypewriterContainer>
      <TypewriterText>{text}</TypewriterText>
      <Cursor $visible={cursorVisible} $blink={cursorBlink} />
    </TypewriterContainer>
  );
};

function MainPage() {
  const [animationStage, setAnimationStage] = useState('initial');
  const [isFhd, setIsFhd] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsFhd(window.innerWidth <= 1920);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.bottom = '0';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
    };
  }, []);

  useEffect(() => {
    setAnimationStage('middle');

    const timer = setTimeout(() => {
      setAnimationStage('final');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked, ignore
      });
    }
  }, []);

  const backgroundVideoVariants = {
    initial: {
      opacity: 0,
      width: '20%',
      height: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    middle: {
      opacity: 1,
      width: '20%',
      height: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      transition: {
        opacity: { duration: 4 },
        width: { duration: 2 },
        height: { duration: 2 },
        top: { duration: 2 },
        left: { duration: 2 }
      }
    },
    final: {
      opacity: 1,
      width: '50%',
      height: '100%',
      top: '50%',
      left: '70%',
      transform: 'translate(-50%, -50%)',
      transition: {
        duration: 1,
        ease: [1, 0.1, 0.1, 1]
      }
    }
  };

  const handleConfetti = () => {
    const isMobile = window.innerWidth <= 768;
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55, x: isMobile ? 0.5 : 0.73 }
    });
  };

  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  const handleMainPageClick = () => {
    window.open("https://www.7-zip.org/", "_blank");
  };

  return (
    <PageContainer>
      <VideoBackground
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </VideoBackground>
      <MotionBackgroundWrapper>
        <MotionBackgroundImage
          src={bgGif}
          initial="initial"
          animate={animationStage}
          variants={backgroundVideoVariants}
        />
      </MotionBackgroundWrapper>

      <Header>
        <LogoContainer>
          <LogoWrapper>
            <Logo
              src={logo}
              alt="Ангелина 200м от вас. Купит интернет - провод, купит пиво."
              onClick={handleMainPageClick}
            />
            <EffectOverlay src={effectImage} alt="Effect" />
          </LogoWrapper>
          <Typewriter />
        </LogoContainer>
      </Header>

      <Main>
        <Title>
          <DownloadText onClick={handleConfetti}>
            hobby developer
          </DownloadText>
        </Title>
        <Description>
          Когда ПП?
        </Description>
        <IconContainer>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://github.com/hilltty")}
          >
            <RiGithubFill />
          </IconWrapper>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://www.linkedin.com/in/hilltty/")}
          >
            <RiLinkedinFill />
          </IconWrapper>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://t.me/hilltty")}
          >
            <RiTelegram2Fill />
          </IconWrapper>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://discordapp.com/users/412623325886677015")}
          >
            <RiDiscordFill />
          </IconWrapper>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://www.youtube.com/channel/UCi8RN4oFauC_MIj717ENtMQ")}
          >
            <BsYoutube />
          </IconWrapper>
          <IconWrapper
            $isFhd={isFhd}
            variants={iconVariants}
            whileHover="hover"
            onClick={() => handleIconClick("https://open.spotify.com/user/073gq6uta4c5zag5ftclcr7en?si=a1d0f6e0eb2349dd")}
          >
            <RiSpotifyFill />
          </IconWrapper>
        </IconContainer>
      </Main>
    </PageContainer>
  );
}

export default MainPage;
