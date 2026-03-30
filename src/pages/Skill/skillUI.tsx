import styles from './skill.module.scss';
import { SkillDetails } from '@/widgets/SkillDetails/SkillDetails';
import { UserInfoCard } from '@/widgets/UserCard/UserInfoCard';
import type { FC } from 'react';
import { CardCarouselUI } from '@/widgets/CardCarousel';
import type { SkillPageUIProps } from './types';

export const SkillUI: FC<SkillPageUIProps> = ({
  user,
  skill,
  suggestionCards,
  cardDetailsRef,
  onSwapClick,
  }) => {

  return (
    <div className={styles.container}>
      <div
        className={styles.teacher_card}
        ref={cardDetailsRef}
      >
        {user &&
        <UserInfoCard user={user} cardDetailsRef = {cardDetailsRef}></UserInfoCard>}
      </div>
      <div className={styles.info_card}>
        {skill && <SkillDetails
          skill={skill}
          onSwapClick={onSwapClick}
        ></SkillDetails>
        }
      </div>
      <div className={styles.sugestions_content}>
        <CardCarouselUI cards={suggestionCards} title={'Похожие предложения'}/>
      </div>
    </div>
  );
};
