import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Body, Card, Formula, Frac, Heading, Note, Rise, Stage, Sub, Sup} from './components/Bits';
import {Bars, CylinderPair} from './components/Figures';
import {palette} from './theme';

type SceneProps = {dur: number};

const row: React.CSSProperties = {display: 'flex', alignItems: 'center', gap: 26};
const col: React.CSSProperties = {display: 'flex', flexDirection: 'column', justifyContent: 'center'};

/* 01 ------------------------------------------------------------------ */
const Title: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="Rotational mechanics · problem 25">
      <div style={{flex: 1.05, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Rise delay={0}>
          <Heading size={98} style={{marginTop: 10}}>
            Two Cylinders,
            <br />
            One Friction
          </Heading>
        </Rise>
        <Rise delay={14}>
          <Body size={34} style={{marginTop: 30, maxWidth: 700}}>
            Press two spinning cylinders together. The slipping stops on its own. Where do the spins end up?
          </Body>
        </Rise>
      </div>
      <div style={{flex: 0.95, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair
          angle1={-rotation * 1.6}
          angle2={rotation * 2.4}
          width={700}
          showContact
          showFriction={false}
        />
      </div>
    </Stage>
  );
};

/* 02 ------------------------------------------------------------------ */
const Setup: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="The setup">
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair angle1={-rotation * 0.9} angle2={rotation * 1.3} width={660} />
      </div>
      <div style={{...col, flex: 0.9, gap: 26}}>
        <Rise delay={6}>
          <Card>
            <Note style={{color: palette.indigo, fontWeight: 700, letterSpacing: '0.16em'}}>CYLINDER ONE</Note>
            <Formula size={46} style={{marginTop: 8}}>
              r<Sub>1</Sub>, I<Sub>1</Sub>, ω<Sub>1</Sub>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={18}>
          <Card>
            <Note style={{color: palette.teal, fontWeight: 700, letterSpacing: '0.16em'}}>CYLINDER TWO</Note>
            <Formula size={46} style={{marginTop: 8}}>
              r<Sub>2</Sub>, I<Sub>2</Sub>, ω<Sub>2</Sub>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={30}>
          <Note>Axes fixed, parallel, and independent.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

/* 03 ------------------------------------------------------------------ */
const Contact: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="At the contact" accent={palette.teal}>
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair
          angle1={-rotation * 1.1}
          angle2={rotation * 1.6}
          width={660}
          showContact
          showFriction
          showRadii={false}
        />
      </div>
      <div style={{...col, flex: 0.9, gap: 24}}>
        <Rise delay={4}>
          <Heading size={56}>Equal, and opposite</Heading>
        </Rise>
        <Rise delay={16}>
          <Body>
            The rims touch at one point and slide past each other. Friction acts on both surfaces, the same size,
            in opposite directions.
          </Body>
        </Rise>
        <Rise delay={28}>
          <Note>This pair of forces is the whole engine of the problem.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

/* 04 ------------------------------------------------------------------ */
const Impulse: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="Same impulse, different lever">
      <div style={{...col, flex: 1, gap: 28}}>
        <Rise delay={4}>
          <Card bg="#ffffff">
            <Note style={{color: palette.indigo, fontWeight: 700, letterSpacing: '0.16em'}}>ON CYLINDER ONE</Note>
            <Formula size={48} style={{marginTop: 8}}>
              angular impulse = J r<Sub>1</Sub>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={16}>
          <Card bg="#ffffff">
            <Note style={{color: palette.teal, fontWeight: 700, letterSpacing: '0.16em'}}>ON CYLINDER TWO</Note>
            <Formula size={48} style={{marginTop: 8}}>
              angular impulse = J r<Sub>2</Sub>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={28}>
          <Note>One impulse J, two different lever arms. So two different kicks.</Note>
        </Rise>
      </div>
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair angle1={-rotation * 0.7} angle2={rotation * 1} width={620} showOmega={false} />
      </div>
    </Stage>
  );
};

/* 05 ------------------------------------------------------------------ */
const Equations: React.FC<SceneProps> = ({dur}) => {
  return (
    <Stage kicker="Two equations">
      <div style={{...col, flex: 1, gap: 30}}>
        <Rise delay={2}>
          <Card bg="#ffffff">
            <Formula size={54}>
              I<Sub>1</Sub>(ω<Sub>1</Sub>′ − ω<Sub>1</Sub>) = − J r<Sub>1</Sub>
            </Formula>
            <Note style={{marginTop: 10}}>friction opposes the spin, so omega one falls</Note>
          </Card>
        </Rise>
        <Rise delay={16}>
          <Card bg="#ffffff">
            <Formula size={54}>
              I<Sub>2</Sub>(ω<Sub>2</Sub>′ − ω<Sub>2</Sub>) = + J r<Sub>2</Sub>
            </Formula>
            <Note style={{marginTop: 10}}>friction drives the spin, so omega two rises</Note>
          </Card>
        </Rise>
        <Rise delay={30}>
          <Note>Each change is the angular impulse, divided by the moment of inertia.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

/* 06 ------------------------------------------------------------------ */
const NoSlip: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="When the slipping stops" accent={palette.amberDeep}>
      <div style={{...col, flex: 1, gap: 26}}>
        <Rise delay={2}>
          <Heading size={58}>Rim speeds must match</Heading>
        </Rise>
        <Rise delay={14}>
          <Card bg={palette.amber} border={palette.amberDeep}>
            <Formula size={68} color={palette.amberDeep}>
              ω<Sub>1</Sub>′ r<Sub>1</Sub> = ω<Sub>2</Sub>′ r<Sub>2</Sub>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={26}>
          <Body>Radius times angular speed is the speed of the surface. Equal surfaces, no sliding.</Body>
        </Rise>
      </div>
      <div style={{flex: 0.85, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair angle1={-rotation * 1.1} angle2={rotation * 1.6} width={600} showContact showOmega={false} />
      </div>
    </Stage>
  );
};

/* 07 ------------------------------------------------------------------ */
const Eliminate: React.FC<SceneProps> = ({dur}) => {
  return (
    <Stage kicker="Eliminate the impulse">
      <div style={{...col, flex: 1, gap: 26}}>
        <Rise delay={2}>
          <Formula size={46} color={palette.inkSoft}>
            I<Sub>1</Sub> r<Sub>2</Sub> (ω<Sub>1</Sub> − ω<Sub>1</Sub>′) = I<Sub>2</Sub> r<Sub>1</Sub> (ω<Sub>2</Sub>′ − ω<Sub>2</Sub>)
          </Formula>
        </Rise>
        <Rise delay={14}>
          <div style={{...row, gap: 18}}>
            <div
              style={{
                fontFamily: 'inherit',
                fontSize: 40,
                fontWeight: 700,
                color: palette.muted,
                textDecoration: 'line-through',
                textDecorationThickness: 4,
              }}
            >
              J
            </div>
            <Note style={{fontSize: 28}}>gone — it appeared on both sides, so it cancels</Note>
          </div>
        </Rise>
        <Rise delay={26}>
          <Card bg={palette.indigoSoft} border={palette.indigo}>
            <Formula size={46} color={palette.indigo}>
              I<Sub>1</Sub> r<Sub>2</Sub> ω<Sub>1</Sub> + I<Sub>2</Sub> r<Sub>1</Sub> ω<Sub>2</Sub>
              <span style={{margin: '0 18px'}}>=</span>
              I<Sub>1</Sub> r<Sub>2</Sub> ω<Sub>1</Sub>′ + I<Sub>2</Sub> r<Sub>1</Sub> ω<Sub>2</Sub>′
            </Formula>
          </Card>
        </Rise>
        <Rise delay={38}>
          <Note>That weighted combination of the two spins never changes.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

/* 08 ------------------------------------------------------------------ */
const Answer: React.FC<SceneProps> = ({dur}) => {
  return (
    <Stage kicker="The answer">
      <div style={{...col, flex: 1, gap: 34}}>
        <Rise delay={2}>
          <Card bg="#ffffff" style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Formula size={50}>
              ω<Sub>1</Sub>′ = r<Sub>2</Sub>
              <Frac
                num={
                  <>
                    I<Sub>1</Sub> r<Sub>2</Sub> ω<Sub>1</Sub> + I<Sub>2</Sub> r<Sub>1</Sub> ω<Sub>2</Sub>
                  </>
                }
                den={
                  <>
                    I<Sub>1</Sub> r<Sub>2</Sub>
                    <Sup>2</Sup> + I<Sub>2</Sub> r<Sub>1</Sub>
                    <Sup>2</Sup>
                  </>
                }
              />
            </Formula>
          </Card>
        </Rise>
        <Rise delay={18}>
          <Card bg="#ffffff" style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Formula size={50}>
              ω<Sub>2</Sub>′ = r<Sub>1</Sub>
              <Frac
                num={
                  <>
                    I<Sub>1</Sub> r<Sub>2</Sub> ω<Sub>1</Sub> + I<Sub>2</Sub> r<Sub>1</Sub> ω<Sub>2</Sub>
                  </>
                }
                den={
                  <>
                    I<Sub>1</Sub> r<Sub>2</Sub>
                    <Sup>2</Sup> + I<Sub>2</Sub> r<Sub>1</Sub>
                    <Sup>2</Sup>
                  </>
                }
              />
            </Formula>
          </Card>
        </Rise>
        <Rise delay={34}>
          <Note>Same fraction in both lines. Only the radius in front changes places.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

/* 09 ------------------------------------------------------------------ */
const Check: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const rotation = Math.min(frame, dur);
  return (
    <Stage kicker="Sanity check">
      <div style={{...col, flex: 1.05, gap: 24}}>
        <Rise delay={2}>
          <Body size={34}>Two identical cylinders. One spins at omega, the other is still.</Body>
        </Rise>
        <Rise delay={14}>
          <Card bg="#ffffff">
            <Formula size={50}>
              ω<Sub>1</Sub>′ = ω<Sub>2</Sub>′ =
              <Frac num={<>ω</>} den={<>2</>} />
            </Formula>
          </Card>
        </Rise>
        <Rise delay={28}>
          <Note>Half each — exactly like a perfectly inelastic collision.</Note>
        </Rise>
      </div>
      <div style={{flex: 0.95, display: 'flex', justifyContent: 'center'}}>
        <CylinderPair
          angle1={-rotation * 1.1}
          angle2={rotation * 1.1}
          width={560}
          R1={120}
          R2={120}
          showOmega={false}
          showNames={false}
        />
      </div>
    </Stage>
  );
};

/* 10 ------------------------------------------------------------------ */
const Energy: React.FC<SceneProps> = ({dur}) => {
  return (
    <Stage kicker="What you must not do" accent={palette.amberDeep}>
      <div style={{...col, flex: 1, gap: 24}}>
        <Rise delay={2}>
          <Heading size={54}>
            Energy is
            <br />
            not conserved
          </Heading>
        </Rise>
        <Rise delay={16}>
          <Body>
            While the rims slide, friction turns rotation into heat. Angular momentum about either single axis is
            not conserved either, because the two friction torques differ.
          </Body>
        </Rise>
        <Rise delay={30}>
          <Note>Only the weighted combination of the two spins survives.</Note>
        </Rise>
      </div>
      <div style={{flex: 0.9, display: 'flex', justifyContent: 'center'}}>
        <Bars heights={[250, 125]} labels={['before', 'after']} accent={palette.amberDeep} caption="rotational energy, identical cylinders" />
      </div>
    </Stage>
  );
};

/* 11 ------------------------------------------------------------------ */
const Recap: React.FC<SceneProps> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 200, mass: 0.8, stiffness: 90}});
  return (
    <Stage kicker="Recap">
      <div style={{...col, flex: 1, gap: 26, opacity: p}}>
        <Rise delay={2}>
          <Heading size={62}>
            Equal and opposite friction,
            <br />
            at different radii,
            <br />
            until the rim speeds match.
          </Heading>
        </Rise>
        <Rise delay={22}>
          <Card bg={palette.indigoSoft} border={palette.indigo}>
            <Formula size={44} color={palette.indigo}>
              ω<Sub>1</Sub>′ r<Sub>1</Sub> = ω<Sub>2</Sub>′ r<Sub>2</Sub>
              <span style={{margin: '0 16px', color: palette.muted}}>with</span>
              I<Sub>1</Sub> r<Sub>2</Sub> ω<Sub>1</Sub> + I<Sub>2</Sub> r<Sub>1</Sub> ω<Sub>2</Sub>
              <span style={{margin: '0 12px'}}>fixed</span>
            </Formula>
          </Card>
        </Rise>
        <Rise delay={38}>
          <Note>Two equations, one answer, and both cylinders settle into steady spins.</Note>
        </Rise>
      </div>
    </Stage>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  '01-title': Title,
  '02-setup': Setup,
  '03-contact': Contact,
  '04-impulse': Impulse,
  '05-equations': Equations,
  '06-noslip': NoSlip,
  '07-eliminate': Eliminate,
  '08-answer': Answer,
  '09-check': Check,
  '10-energy': Energy,
  '11-recap': Recap,
};
