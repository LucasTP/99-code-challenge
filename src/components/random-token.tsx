import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import ACT from '../../public/tokens/ACT.svg';
import APOLLO from '../../public/tokens/APOLLO.svg';
import USD from '../../public/tokens/USD.svg';
import NEO from '../../public/tokens/NEO.svg';
import BTM from '../../public/tokens/BTM.svg';
import LEO from '../../public/tokens/LEO.svg';
import MDX from '../../public/tokens/MDX.svg';
import NGM from '../../public/tokens/NGM.svg';
import C98 from '../../public/tokens/C98.svg';
import DAI from '../../public/tokens/DAI.svg';
import ENA from '../../public/tokens/ENA.svg';
import FIL from '../../public/tokens/FIL.svg';

const tokens = [ACT, APOLLO, USD, NEO, BTM, LEO, MDX, NGM, C98, DAI, ENA, FIL];

const BlurLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 1;
  pointer-events: none;
`;

const IconWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  transform: translate(-50%, -50%);
  animation: float 5s infinite ease-in-out;
  width: 50px; /* Adjust size as needed */
  height: 50px;

  img {
    width: 100%;
    height: 100%;
  }

  @keyframes float {
    0% {
      transform: translate(-50%, -50%) translateY(0);
    }
    50% {
      transform: translate(-50%, -50%) translateY(-20px);
    }
    100% {
      transform: translate(-50%, -50%) translateY(0);
    }
  }
`;

export const RandomToken = () => {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );

  useEffect(() => {
    const randomPositions = Array.from({ length: tokens.length }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));

    setPositions(randomPositions);
  }, []);

  return (
    <BlurLayer>
      {tokens.map((Token, index) => (
        <IconWrapper
          key={index}
          top={positions[index]?.top || 0}
          left={positions[index]?.left || 0}
        >
          <img src={Token} alt={`Token ${index + 1}`} />
        </IconWrapper>
      ))}
    </BlurLayer>
  );
};
