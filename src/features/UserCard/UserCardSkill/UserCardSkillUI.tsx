import styles from './UserCardSkill.module.scss';
import type { TUserCardSkillUIProps } from './type';
import type { FC } from 'react';
import { useRef, useState, useLayoutEffect } from 'react';
import { UserCardSkillCounter } from '@features/UserCard/UserCardSkillCounter';
import clsx from 'clsx';

const CATEGORY_CLASS_MAP: Record<number, string> = {
  [1]: styles.skills_item_businessCareer,
  [2]: styles.skills_item_creativityArt,
  [3]: styles.skills_item_foreignLanguages,
  [4]: styles.skills_item_educationDevelopment,
  [5]: styles.skills_item_homeComfort,
  [6]: styles.skills_item_healthLifestyle
};

export const UserCardSkillUI: FC<TUserCardSkillUIProps> = ({
  title,
  skills,
  cardRef
}: TUserCardSkillUIProps) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const counterRef = useRef<HTMLLIElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(skills.length);

  const calculateVisible = () => {
    const list = listRef.current;
    const counter = counterRef.current;
    if (!list || !counter || !skills.length) return;

    const listWidth = list.offsetWidth;
    const items = Array.from(
      list.querySelectorAll<HTMLLIElement>('[data-skill-item="true"]')
    );

    if (!items.length) {
      setVisibleCount(skills.length);
      return;
    }

    const counterWidth = counter.offsetWidth;
    const style = window.getComputedStyle(list);
    const gap = parseInt(style.getPropertyValue('column-gap')) || 0;

    const lastItem = items[items.length - 1];
    const listRect = list.getBoundingClientRect();
    const lastRect = lastItem.getBoundingClientRect();
    const lastRight = lastRect.right - listRect.left;

    if (lastRight <= listWidth) {
      setVisibleCount(items.length);
      return;
    }

    let maxVisible = items.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemRect = item.getBoundingClientRect();
      const right = itemRect.right - listRect.left;
      const reserveForCounter = counterWidth + gap;

      if (right + reserveForCounter > listWidth) {
        maxVisible = i;
        break;
      }
    }

    setVisibleCount(maxVisible);
  }

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => {
      calculateVisible();
    });

    observer.observe(list);
    calculateVisible(); // начальный расчёт

    return () => observer.disconnect();
  }, [skills, skills.length]);

  const visibleSkills = skills.slice(0, visibleCount);
  const hiddenCount = skills.length - visibleSkills.length;

  return (
    <div className={styles.container}>
      <h4 className={styles['container_title']}>{`${title}:`}</h4>
      <ul className={styles['skills_list']} ref={listRef}>
        {visibleSkills.map((skill, index) => (
          <li
            className={clsx(
              styles['skills_item'],
              CATEGORY_CLASS_MAP[skill.categoryId]
            )}
            data-skill-item='true'
            key={index}
          >
            <span className={styles['skills_item_title']}>
              {skill.subCategory}
            </span>
          </li>
        ))}

        {hiddenCount > 0 && (
          <li>
            <UserCardSkillCounter counter={hiddenCount} skills={skills} visibleSkills={visibleSkills} cardRef={cardRef}/>
          </li>
        )}

        <li
          ref={counterRef}
          aria-hidden='true'
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none'
          }}
        >
          <UserCardSkillCounter counter={skills.length} />
        </li>
      </ul>
    </div>
  );
};
