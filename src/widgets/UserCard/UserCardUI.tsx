import styles from './UserCard.module.scss';
import React from 'react';
import { UserCardAvatar, UserCardSkillUI } from '@features/index';
import type { TUserCardUIProps } from './type';
import { Button, LikeButtonUI } from '@shared/ui';
import clockIcon from '@assets/icons/clock.svg';

export const UserCardUI: React.FC<TUserCardUIProps> = ({
  user,
  handleMore,
  skillsToLearn,
  skillsCanTeach,
  isFavorite,
  isSuggested = false,
  handleLike,
  type,
  likeCounter,
  cardRef,
  likeRef,
  isLikeMessage,
}: TUserCardUIProps) => {
  if (!user) return null;

  const { name, avatarPic, location, dateOfBirth } = user;

  return (
    <div ref={cardRef} className={styles.card}>
      {isLikeMessage && <span className={styles.like_info} >Сначала войдите или зарегистрируйтесь</span>}
      <div className={styles.like}>
        <span>{likeCounter}</span>
        <LikeButtonUI
          onClick={(e)=>handleLike(e)}
          isLiked={isFavorite()}
          likeRef={likeRef}
        />
      </div>
      <UserCardAvatar
        name={name}
        avatarPic={avatarPic}
        location={location}
        dateOfBirth={dateOfBirth}
      />
      <div className={styles.skills}>
        {type === 'learn' && (
          <>
            <UserCardSkillUI title='Хочет научиться' skills={skillsToLearn}  cardRef={cardRef}/>
            <UserCardSkillUI title='Может научить' skills={skillsCanTeach}  cardRef={cardRef}/>
          </>
        )}
        {type === 'teach' && (
          <>
            <UserCardSkillUI title='Может научить' skills={skillsCanTeach} cardRef={cardRef}/>
            <UserCardSkillUI title='Хочет научиться' skills={skillsToLearn} cardRef={cardRef}/>
          </>
        )}
      </div>
      {isSuggested ? (
        <Button status='secondary' onClick={handleMore}>
          <img className={styles.buttonImg} src={clockIcon} alt='часы' />
          Обмен предложен
        </Button>
      ) : (
        <Button status='primary' onClick={handleMore}>
          Подробнее
        </Button>
      )}
    </div>
  );
};
