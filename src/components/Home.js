import React, { useState, useEffect } from 'react';import styled, { keyframes, createGlobalStyle } from 'styled-components';
import logo from '../images/logo.png';
import { motion } from 'framer-motion';
import { RiGithubFill, RiLinkedinFill, RiTelegram2Fill, RiDiscordFill, RiSpotifyFill } from 'react-icons/ri';
import { BsYoutube } from 'react-icons/bs';
import effectImage from '../images/effect.gif';
import bgGif from '../images/axolotl.gif';

const words = ['hilltty', 'хиллтти', 'ヒルッティ', 'ひるってぃ'];

const GlobalStyles = createGlobalStyle`
  html {
    touch-action: manipulation;
  }

  * {
    touch-action: manipulation;
  }

  :root {
    --bp-mobile: 768px;
    --bp-tablet: 1024px;
    --scale-unit: 1vw;
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-xxl: 5rem;
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --text-sm: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
    --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --text-header: clamp(1.125rem, 1rem + 0.8vw, 1.5rem);
    --text-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
    --text-xl: clamp(1.8rem, 1.4rem + 2vw, 3rem);
    --icon-sm: 50px;
    --icon-md: 60px;
    --icon-lg: 75px;
    --logo-sm: 42px;
    --logo-md: 50px;
    --logo-lg: 60px;
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const smoothAnimation = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const spiralRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const PageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const SpiralBackgroundContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: ${props => props.$background};
  filter: blur(3px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    filter: blur(2px);
  }
`;

const SpiralTextWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  animation: ${spiralRotate} ${props => props.$duration}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: ${props => props.$opacity};
  will-change: transform;
  font-family: 'Consolas', monospace;
  font-size: ${props => props.$fontSize}px;
  font-weight: bold;
  color: ${props => props.$textColor};
  white-space: nowrap;
`;

const TextChar = styled.span.attrs(props => ({
  style: {
    transform: `rotate(${props.$angle}deg) translate(${props.$radius}px) rotate(90deg)`
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  display: inline-block;
`;

const SPIRAL_TEXT = "dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et Lorem ipsum ";

const getTheme = () => {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;

  return {
    background: isNight
      ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
      : 'linear-gradient(135deg, #a8a4ce 0%, #c9a7d6 50%, #e6b8d7 100%)',
    textColor: isNight ? '#ffffff' : '#2d1b3d'
  };
};

const BASE_VIEWPORT = { width: 1920, height: 1080 };

const RINGS_DATA = [
  { size: 2400, opacity: 0.50, duration: 60, fontSize: 88 },
  { size: 2200, opacity: 0.47, duration: 58.5, fontSize: 80 },
  { size: 2000, opacity: 0.44, duration: 57, fontSize: 72 },
  { size: 1800, opacity: 0.41, duration: 55.5, fontSize: 64 },
  { size: 1600, opacity: 0.38, duration: 54, fontSize: 56 },
  { size: 1400, opacity: 0.35, duration: 52.5, fontSize: 56 },
  { size: 1200, opacity: 0.32, duration: 51, fontSize: 48 },
  { size: 1000, opacity: 0.29, duration: 49.5, fontSize: 40 },
  { size: 850, opacity: 0.26, duration: 48, fontSize: 34 },
  { size: 700, opacity: 0.23, duration: 46.5, fontSize: 28 },
  { size: 560, opacity: 0.20, duration: 45, fontSize: 22 },
  { size: 440, opacity: 0.17, duration: 43.5, fontSize: 18 },
  { size: 340, opacity: 0.14, duration: 42, fontSize: 14 },
  { size: 250, opacity: 0.11, duration: 40.5, fontSize: 10 },
  { size: 180, opacity: 0.08, duration: 39, fontSize: 8 },
  { size: 120, opacity: 0.06, duration: 37.5, fontSize: 6 },
  { size: 70, opacity: 0.04, duration: 36, fontSize: 5 },
  { size: 35, opacity: 0.02, duration: 34.5, fontSize: 4 }
];

const getVisibleRings = (viewportWidth, viewportHeight) => {
  const baseDiagonal = Math.sqrt(BASE_VIEWPORT.width ** 2 + BASE_VIEWPORT.height ** 2);
  const currentDiagonal = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2);
  const scale = currentDiagonal / baseDiagonal;
  const maxVisibleSize = currentDiagonal * 1.1;

  if (scale >= 1) {
    return RINGS_DATA.map(ring => ({
      ...ring,
      size: ring.size * scale,
      fontSize: Math.round(ring.fontSize * scale)
    }));
  }

  return RINGS_DATA.filter(ring => ring.size <= maxVisibleSize);
};

const MemoizedTextChar = React.memo(({ char, angle, radius }) => (
  <TextChar $angle={angle} $radius={radius}>
    {char}
  </TextChar>
));

MemoizedTextChar.displayName = 'MemoizedTextChar';

const MemoizedTextRing = React.memo(({ ring, chars, angleStep, textColor }) => {
  const radius = ring.size / 2;

  return (
    <TextRing
      $opacity={ring.opacity}
      $duration={ring.duration}
      $fontSize={ring.fontSize}
      $delay={ring.delay}
      $textColor={textColor}
    >
      {chars.map((char, charIndex) => (
        <MemoizedTextChar
          key={charIndex}
          char={char}
          angle={charIndex * angleStep}
          radius={radius}
        />
      ))}
    </TextRing>
  );
});

MemoizedTextRing.displayName = 'MemoizedTextRing';

const SpiralTextAnimation = () => {
  const [viewportSize, setViewportSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const chars = React.useMemo(() => SPIRAL_TEXT.split(''), []);
  const angleStep = React.useMemo(() => 360 / chars.length, [chars.length]);
  const theme = React.useMemo(() => getTheme(), []);

  const rings = React.useMemo(() => {
    const visibleRings = getVisibleRings(viewportSize.width, viewportSize.height);
    return visibleRings.map(ring => {
      const originalIndex = RINGS_DATA.findIndex(r => r.duration === ring.duration);
      return {
        ...ring,
        delay: -(originalIndex * 2.5)
      };
    });
  }, [viewportSize.width, viewportSize.height]);

  return (
    <SpiralBackgroundContainer $background={theme.background}>
      <SpiralTextWrapper>
        {rings.map(ring => (
          <MemoizedTextRing
            key={ring.duration}
            ring={ring}
            chars={chars}
            angleStep={angleStep}
            textColor={theme.textColor}
          />
        ))}
      </SpiralTextWrapper>
    </SpiralBackgroundContainer>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const AxolotlContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: -1;

  @media (max-width: 768px) {
    bottom: 8vh;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(150px, 40vw, 220px);
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    top: 50%;
    left: 100%;
    transform: translate(5%, -50%);
    width: clamp(200px, calc(25 * var(--scale-unit)), 480px);
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    top: 50%;
    left: 100%;
    transform: translate(10%, -50%);
    width: clamp(250px, calc(25 * var(--scale-unit)), 480px);
  }

  @media (min-width: 1367px) {
    top: 50%;
    left: 100%;
    transform: translate(15%, -50%);
    width: clamp(280px, calc(25 * var(--scale-unit)), 480px);
  }

  @media (max-width: 768px) and (max-height: 570px) {
    display: none;
  }
`;

const MotionBackgroundImage = styled(motion.img)`
  width: 100%;
  height: auto;
  will-change: transform;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-xl) var(--space-md) var(--space-xxl);
  margin-bottom: var(--space-sm);
  z-index: 3;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeInUp} 0.25s ease 0.75s forwards;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-xl);
  }

  @media (max-width: 768px) {
    padding: var(--space-sm) var(--space-md);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const LogoWrapper = styled.div`
  opacity: 0;
  animation: ${scaleIn} 0.25s ease 0.8s forwards;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--logo-lg);
  height: var(--logo-lg);

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

  @media (max-width: 1024px) {
    width: var(--logo-md);
    height: var(--logo-md);
  }

  @media (max-width: 768px) {
    width: var(--logo-sm);
    height: var(--logo-sm);
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
`;

const EffectOverlay = styled.img`
  position: absolute;
  max-width: 150%;
  max-height: 150%;
  object-fit: contain;
  pointer-events: none;
  margin-top: 0;
  margin-left: 5px;
  z-index: 1;
`;

const TypewriterContainer = styled.div`
  user-select: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  height: clamp(20px, 3vh, 28px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease 0.8s forwards;
`;

const TypewriterText = styled.span`
  color: white;
  font-family: 'Consolas', monospace;
  font-weight: bold;
  font-size: var(--text-header);
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const Cursor = styled.span`
  position: absolute;
  right: -10px;
  top: calc(50% + 2px);
  transform: translateY(-50%);
  width: 2px;
  height: clamp(20px, 3vh, 28px);
  background-color: white;
  opacity: ${props => props.$visible ? 1 : 0};
  animation: ${props => props.$blink ? blink : 'none'} 0.35s infinite;
  animation-delay: 0.8s;
`;

const MainContent = styled.main.attrs({
  role: 'main'
})`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: ${fadeIn} 0.25s ease 0.4s forwards;

  @media (max-width: 768px) and (orientation: landscape) {
    width: 100%;
    padding: 1rem 0;
    padding-top: 5vh;
    padding-bottom: max(15vh, 150px);
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 768px) and (orientation: portrait) {
    width: 100%;
    padding: 0;
    padding-top: max(10vh, 60px);
    padding-bottom: max(22vh, 220px);
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  @media (min-width: 769px) {
    justify-content: center;
    align-items: flex-start;
    padding-left: clamp(3rem, 8vw, 8rem);
    max-width: 55%;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 1rem;
  margin-top: 0;
  opacity: 0;
  animation: ${fadeInUp} 0.25s ease 0.5s forwards;
  user-select: none;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 6vw, 2.2rem);
    width: 90%;
  }

  @media (min-width: 769px) {
    font-size: clamp(1.8rem, calc(2.5 * var(--scale-unit)), 48px);
  }
`;

const DownloadText = styled.span`
  font-family: 'Consolas', monospace;
  cursor: pointer;
  user-select: none;
  display: inline-block;
`;

const Description = styled.p`
  color: #e5e5e5;
  max-width: 600px;
  margin-bottom: clamp(2rem, 3vh, 3rem);
  margin-top: 0;
  opacity: 0;
  animation: ${fadeInUp} 0.25s ease 0.6s forwards;
  user-select: none;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    font-size: clamp(1rem, 4vw, 1.3rem);
    width: 85%;
    max-width: 100%;
  }

  @media (min-width: 769px) {
    font-size: clamp(0.85rem, calc(1.125 * var(--scale-unit)), 21.6px);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: clamp(2rem, 5vh, 3rem);
    margin-bottom: 0;
    justify-content: center;
    flex-wrap: nowrap;
    gap: clamp(1rem, 4vw, 1.5rem);
    width: 90%;
  }

  @media (max-width: 360px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(38px, 48px));
    justify-content: center;
    gap: clamp(0.8rem, 3vw, 1.2rem);
    width: auto;
  }

  @media (min-width: 769px) {
    margin-top: 0;
    justify-content: flex-start;
    gap: clamp(12px, calc(1.25 * var(--scale-unit)), 24px);
  }
`;

const IconWrapper = styled(motion.div)`
  opacity: 0.5;
  cursor: pointer;
  user-select: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));

  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
    opacity: 1;
  }

  svg {
    width: 75%;
    height: 75%;
  }

  @media (max-width: 768px) {
    width: clamp(38px, 10vw, 48px);
    height: clamp(38px, 10vw, 48px);
  }

  @media (min-width: 769px) {
    width: clamp(45px, calc(3.75 * var(--scale-unit)), 72px);
    height: clamp(45px, calc(3.75 * var(--scale-unit)), 72px);
    margin: 0;
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
  const [showSpiral, setShowSpiral] = useState(false);

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
    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 800 : 0;

    const spiralTimer = setTimeout(() => {
      setShowSpiral(true);
    }, delay);

    return () => clearTimeout(spiralTimer);
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

    const preventZoom = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    };

    const preventWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', preventZoom);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('keydown', preventZoom);
      document.removeEventListener('wheel', preventWheelZoom);
    };
  }, []);

  const isMobile = window.innerWidth <= 768;

  const backgroundVideoVariants = {
    initial: {
      opacity: 0,
      scale: 0.5
    },
    middle: {
      opacity: 1,
      scale: 0.8,
      transition: {
        opacity: { duration: 4 },
        scale: { duration: 2 }
      }
    },
    final: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [1, 0.1, 0.1, 1]
      }
    }
  };

  const handleConfetti = async () => {
    const isMobile = window.innerWidth <= 768;
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55, x: isMobile ? 0.5 : 0.73 }
    });
  };

  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  const handleKeyPress = (event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  const handleMainPageClick = () => {
    window.open("https://www.7-zip.org/", "_blank");
  };

  return (
    <>
      <GlobalStyles />
      <PageContainer>
        {showSpiral && <SpiralTextAnimation />}

        <Header>
          <LogoContainer>
            <LogoWrapper>
              <Logo
                src={logo}
                alt="hilltty logo"
                onClick={handleMainPageClick}
                fetchpriority="high"
              />
              <EffectOverlay src={effectImage} alt="Decorative effect overlay" loading="lazy" />
            </LogoWrapper>
            <Typewriter />
          </LogoContainer>
        </Header>

        <ContentWrapper>
          <MainContent>
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
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://github.com/hilltty")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://github.com/hilltty"))}
                role="button"
                aria-label="Visit GitHub profile"
                tabIndex={0}
              >
                <RiGithubFill aria-hidden="true" />
              </IconWrapper>
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://www.linkedin.com/in/hilltty/")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://www.linkedin.com/in/hilltty/"))}
                role="button"
                aria-label="Visit LinkedIn profile"
                tabIndex={0}
              >
                <RiLinkedinFill aria-hidden="true" />
              </IconWrapper>
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://t.me/hilltty")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://t.me/hilltty"))}
                role="button"
                aria-label="Visit Telegram profile"
                tabIndex={0}
              >
                <RiTelegram2Fill aria-hidden="true" />
              </IconWrapper>
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://discordapp.com/users/412623325886677015")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://discordapp.com/users/412623325886677015"))}
                role="button"
                aria-label="Visit Discord profile"
                tabIndex={0}
              >
                <RiDiscordFill aria-hidden="true" />
              </IconWrapper>
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://www.youtube.com/channel/UCi8RN4oFauC_MIj717ENtMQ")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://www.youtube.com/channel/UCi8RN4oFauC_MIj717ENtMQ"))}
                role="button"
                aria-label="Visit YouTube channel"
                tabIndex={0}
              >
                <BsYoutube aria-hidden="true" />
              </IconWrapper>
              <IconWrapper
                variants={iconVariants}
                whileHover="hover"
                onClick={() => handleIconClick("https://open.spotify.com/user/073gq6uta4c5zag5ftclcr7en?si=a1d0f6e0eb2349dd")}
                onKeyPress={(e) => handleKeyPress(e, () => handleIconClick("https://open.spotify.com/user/073gq6uta4c5zag5ftclcr7en?si=a1d0f6e0eb2349dd"))}
                role="button"
                aria-label="Visit Spotify profile"
                tabIndex={0}
              >
                <RiSpotifyFill aria-hidden="true" />
              </IconWrapper>
            </IconContainer>

            <AxolotlContainer>
              <MotionBackgroundImage
                src={bgGif}
                alt="Axolotl animation"
                loading={isMobile ? "lazy" : "eager"}
                initial="initial"
                animate={animationStage}
                variants={backgroundVideoVariants}
              />
            </AxolotlContainer>
          </MainContent>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

export default MainPage;
