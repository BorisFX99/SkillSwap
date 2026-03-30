import React from 'react';
import type { TUserInfoCardProps } from './type';
import { skillsListAdapter } from '@/shared/lib/utils/skillsListAdapter';
import { skillsSelectors } from '@slice/skills';
import { useAppSelector } from '@store-hooks';
import styles from './UserCard.module.scss';
import { UserCardAvatar, UserCardSkillUI } from '@features/index';

export const UserInfoCard: React.FC<TUserInfoCardProps> = ({user, cardDetailsRef}) => {
  if (!user) return null;

  const skills = useAppSelector(skillsSelectors.selectskills);

  const skillsToLearn = skillsListAdapter(user.toLearn, skills);
  const skillsCanTeach = skillsListAdapter(user.canTeach, skills);

  return (
    <div className={styles.card}>
      <UserCardAvatar
        name={user.name}
        avatarPic={user.avatarPic}
        location={user.location}
        dateOfBirth={user.dateOfBirth}
      />
      <div className={styles.description}>
        {user.aboutMe}
      </div>
      <div className={styles.skills}>
        <UserCardSkillUI title='Может научить' skills={skillsCanTeach} cardRef={cardDetailsRef}/>
        <UserCardSkillUI title='Хочет научиться' skills={skillsToLearn} cardRef={cardDetailsRef}/>
      </div>
    </div>
  );
};
