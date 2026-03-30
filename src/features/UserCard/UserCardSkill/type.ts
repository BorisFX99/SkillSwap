import type { TCategory, TSkill as Skill } from '@entities/skills';

export type TSkillAdapter = {
  categoryId: TCategory['id'];
  subCategory: Skill['title'];
};

export type TUserCardSkillUIProps = {
  title: 'Может научить' | 'Хочет научиться';
  skills:  TSkillAdapter[];
  cardRef:React.RefObject<HTMLDivElement | null>;
};
