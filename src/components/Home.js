import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { RiGithubFill, RiLinkedinFill, RiTelegram2Fill, RiDiscordFill, RiSpotifyFill } from 'react-icons/ri';
import { BsYoutube } from 'react-icons/bs';

const isSafari = (() => {
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua) || /iPad|iPhone|iPod/.test(ua);
})();

const imageFormat = isSafari ? 'webp' : 'avif';

const logo = require(`../images/logo.${imageFormat}`);
const effectImage = require(`../images/effect.${imageFormat}`);
const bgGif = require(`../images/axolotl.${imageFormat}`);

const words = ['hilltty', 'хиллтти', 'ヒルッティ', 'ひるってぃ'];

const SOCIAL_LINKS = [
  { url: 'https://github.com/hilltty', Icon: RiGithubFill, label: 'GitHub' },
  { url: 'https://www.linkedin.com/in/hilltty/', Icon: RiLinkedinFill, label: 'LinkedIn' },
  { url: 'https://t.me/hilltty', Icon: RiTelegram2Fill, label: 'Telegram' },
  { url: 'https://discordapp.com/users/412623325886677015', Icon: RiDiscordFill, label: 'Discord' },
  { url: 'https://www.youtube.com/channel/UCi8RN4oFauC_MIj717ENtMQ', Icon: BsYoutube, label: 'YouTube' },
  { url: 'https://open.spotify.com/user/073gq6uta4c5zag5ftclcr7en?si=a1d0f6e0eb2349dd', Icon: RiSpotifyFill, label: 'Spotify' }
];

const GlobalStyles = createGlobalStyle`
  html {
    touch-action: manipulation;
  }

  * {
    touch-action: manipulation;
  }

  :root {
    --scale-unit: 1vw;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-xxl: 5rem;
    --text-header: clamp(1.125rem, 1rem + 0.8vw, 1.5rem);
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
const BASE_DIAGONAL = Math.sqrt(BASE_VIEWPORT.width ** 2 + BASE_VIEWPORT.height ** 2);

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
  const currentDiagonal = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2);
  const scale = currentDiagonal / BASE_DIAGONAL;

  if (scale >= 1) {
    return RINGS_DATA.map((ring, index) => ({
      ...ring,
      size: ring.size * scale,
      fontSize: Math.round(ring.fontSize * scale),
      delay: -(index * 2.5)
    }));
  }

  const maxVisibleSize = currentDiagonal * 1.1;
  return RINGS_DATA.map((ring, index) => ({
    ...ring,
    delay: -(index * 2.5)
  })).filter(ring => ring.size <= maxVisibleSize);
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

const chars = SPIRAL_TEXT.split('');
const angleStep = 360 / chars.length;

const SpiralTextAnimation = React.memo(() => {
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

  const theme = React.useMemo(() => getTheme(), []);
  const rings = React.useMemo(
    () => getVisibleRings(viewportSize.width, viewportSize.height),
    [viewportSize.width, viewportSize.height]
  );

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
});

SpiralTextAnimation.displayName = 'SpiralTextAnimation';

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

const backgroundFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  animation: ${backgroundFadeIn} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  will-change: transform, opacity;
  transform-origin: center;
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
  animation: ${fadeInUp} 0.2s ease 0.1s forwards;
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
  animation: ${scaleIn} 0.2s ease 0.15s forwards;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--logo-lg);
  height: var(--logo-lg);

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.1);
    }

    &:hover::after {
      opacity: 0.7;
      animation: ${smoothAnimation} 6s infinite linear;
      transform: scale(0.8);
    }
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
  outline: none;

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const EffectOverlay = styled.img`
  position: absolute;
  max-width: 150%;
  max-height: 150%;
  object-fit: contain;
  pointer-events: none;
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
  animation: ${fadeInUp} 0.2s ease 0.15s forwards;
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
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease 0.05s forwards;

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
  animation: ${fadeInUp} 0.2s ease 0.2s forwards;
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
  outline: none;

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const Description = styled.p`
  color: #e5e5e5;
  max-width: 600px;
  margin-bottom: clamp(2rem, 3vh, 3rem);
  margin-top: 0;
  opacity: 0;
  animation: ${fadeInUp} 0.2s ease 0.25s forwards;
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

const IconWrapper = styled.div`
  opacity: 0.5;
  cursor: pointer;
  user-select: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  transition: opacity 0.3s ease;
  position: relative;

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
    opacity: 1;
  }

  @media (hover: hover) {
    &:hover svg {
      transform: scale(1.1);
    }

    &:hover {
      opacity: 1;
    }
  }

  svg {
    width: 75%;
    height: 75%;
    transition: transform 0.3s ease;
    will-change: transform;
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

const Typewriter = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(false);
  const [lastTypedTime, setLastTypedTime] = useState(Date.now());
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => setIsStarted(true), 1200);
    const cursorDelay = setTimeout(() => setCursorVisible(true), 800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(cursorDelay);
    };
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const currentWord = words[wordIndex];
    const timer = setTimeout(() => {
      const now = Date.now();
      setCursorBlink(now - lastTypedTime > 1000);
      if (now - lastTypedTime <= 1000) setCursorVisible(true);

      if (!isDeleting && text.length < currentWord.length) {
        setText(prev => prev + currentWord[prev.length]);
        setLastTypedTime(now);
      } else if (isDeleting && text.length > 0) {
        setText(prev => prev.slice(0, -1));
        setLastTypedTime(now);
      } else if (text.length === currentWord.length) {
        setIsDeleting(true);
      } else if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    }, Math.random() * 100 + 100);

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
  const [showSpiral, setShowSpiral] = useState(false);
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  useEffect(() => {
    Object.assign(document.body.style, {
      position: 'fixed',
      inset: '0'
    });

    return () => {
      Object.assign(document.body.style, {
        position: '',
        inset: ''
      });
    };
  }, []);

  useEffect(() => {
    const spiralTimer = setTimeout(() => {
      setShowSpiral(true);
    }, isMobile ? 200 : 0);

    return () => clearTimeout(spiralTimer);
  }, [isMobile]);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const preventKeyZoom = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    };
    const preventWheelZoom = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };

    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('keydown', preventKeyZoom);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });

    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('keydown', preventKeyZoom);
      document.removeEventListener('wheel', preventWheelZoom);
    };
  }, []);

  const handleConfetti = useCallback(async () => {
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55, x: isMobile ? 0.5 : 0.73 }
    });
  }, [isMobile]);

  const handleIconClick = useCallback((url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
  }, []);

  const handleKeyPress = useCallback((event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }, []);

  const handleMainPageClick = useCallback(() => {
    const newWindow = window.open("https://www.7-zip.org/", "_blank");
    if (newWindow) newWindow.opener = null;
  }, []);

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
          <MainContent role="main">
            <Title>
              <DownloadText onClick={handleConfetti}>
                hobby developer
              </DownloadText>
            </Title>
            <Description>
              Когда ПП?
            </Description>
            <IconContainer>
              {SOCIAL_LINKS.map(({ url, Icon, label }) => (
                <IconWrapper
                  key={url}
                  onClick={() => handleIconClick(url)}
                  onKeyPress={(e) => handleKeyPress(e, () => handleIconClick(url))}
                  role="button"
                  aria-label={`Visit ${label} profile`}
                  tabIndex={0}
                >
                  <Icon aria-hidden="true" />
                </IconWrapper>
              ))}
            </IconContainer>

            <AxolotlContainer>
              <BackgroundImage
                src={bgGif}
                alt="Axolotl animation"
                loading={isMobile ? "lazy" : "eager"}
                fetchpriority={isMobile ? "auto" : "high"}
              />
            </AxolotlContainer>
          </MainContent>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

export default MainPage;
