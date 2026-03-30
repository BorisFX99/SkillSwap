import { SkillsModalContext } from '@/shared/context/SkillsModalContext';
import styles from './UserCardSkillCounter.module.scss';
import type { TUserCardSkillCounterProps } from './types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const UserCardSkillCounter: React.FC<TUserCardSkillCounterProps> = ({
  counter,
  skills,
  visibleSkills,
  cardRef
}: TUserCardSkillCounterProps) => {
  if (counter <= 0) return null;
  const skillsRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLUListElement>(null);
  const [showSkills, setShowSkills] = useState(false);
  const [leftTooltipPosition, setLeftTooltipPosition] = useState<number>(0);


  const slicedSkills = skills?.filter(skill=> !visibleSkills?.some(item => item.subCategory === skill.subCategory))

  const handleMouseEnter = () => {
  setShowSkills(true);   // переключаем на true при наведении
  };

  const handleMouseLeave = () => {
  setShowSkills(false);   // переключаем на true при наведении
  };

    const adjustTooltipPosition = () => {
    if (!skillsRef.current || !tooltipRef.current || !cardRef?.current) return;

    const counterRect = skillsRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const cardRect = cardRef?.current.getBoundingClientRect();

    // Начальное смещение относительно ЛЕВОГО КРАЯ .counter
    let desiredLeft = (counterRect.width / 2) - (tooltipRect.width / 2);
    // Где окажется правый край тултипа (в координатах viewport)
    const wouldBeRight = counterRect.left + desiredLeft + tooltipRect.width;

    if (wouldBeRight > cardRect.right) {
      const overflow = wouldBeRight - cardRect.right;
      desiredLeft -= (overflow + 10);
    }

    setLeftTooltipPosition(desiredLeft);
  };

    useLayoutEffect(()=>{
      if (showSkills && skillsRef.current && tooltipRef.current){
        adjustTooltipPosition();
      }
    },[showSkills, slicedSkills])

  return <span
  ref={skillsRef}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className={styles.counter}>+{counter}
  {showSkills&& slicedSkills &&
    <ul
      ref={tooltipRef}
      className={styles.show_skills}
      style={{
        position:'absolute',
        bottom:'100%',
        left:`${leftTooltipPosition}px`
      }}
    >
      {
        slicedSkills.map((item, index) => (<li key ={index} className={styles.list_item}>{item.subCategory}</li>))
      }
    </ul>}
  </span>;
};
