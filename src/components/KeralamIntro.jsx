import useScrollLock from '../hooks/useScrollLock';
import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import { LOGO_DURATION, LogoAnimation } from './KeralamLogo';
import './keralam-intro.css';

export default function KeralamIntro() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const player = useRef(null);
  const overlay = useRef(null);
  useScrollLock(visible);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => setVisible(false);
    const instance = player.current;
    const onFrame = ({ detail }) => {
      if (overlay.current) overlay.current.style.opacity = String(Math.min(1, Math.max(0, (LOGO_DURATION - 1 - detail.frame) / 30)));
    };
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => { if (preference.matches) dismiss(); };
    instance?.addEventListener('ended', dismiss);
    instance?.addEventListener('error', dismiss);
    instance?.addEventListener('frameupdate', onFrame);
    preference.addEventListener('change', onPreference);
    // Fail open if playback cannot start. No session flag: reload always replays.
    const timeout = window.setTimeout(dismiss, (LOGO_DURATION / 60) * 1000 + 2000);
    return () => {
      instance?.removeEventListener('ended', dismiss);
      instance?.removeEventListener('error', dismiss);
      instance?.removeEventListener('frameupdate', onFrame);
      preference.removeEventListener('change', onPreference);
      window.clearTimeout(timeout);
    };
  }, [visible]);

  if (!visible) return null;
  return <div ref={overlay} className="keralam-intro" data-testid="keralam-intro">
    <div className="keralam-intro__ambient" aria-hidden="true"/>
    <div className="keralam-intro__content">
      <p className="keralam-intro__welcome">WELCOME HOME</p>
      <Player ref={player} component={LogoAnimation} durationInFrames={LOGO_DURATION} compositionWidth={1400} compositionHeight={600} fps={60}
        autoPlay initiallyMuted numberOfSharedAudioTags={0} controls={false} loop={false} moveToBeginningWhenEnded={false}
        clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false}
        style={{ width: '100%' }}/>
      <p className="keralam-intro__caption">Your own space. A shared sense of belonging.</p>
    </div>
    <button className="keralam-intro__skip" onClick={() => setVisible(false)}>Skip intro <span aria-hidden="true">↗</span></button>
  </div>;
}
