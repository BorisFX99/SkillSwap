import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { SkillsModalContext } from './SkillsModalContext';

interface SkillsModalProviderProps {
  children: ReactNode;
}

export const SkillsModalProvider: FC<SkillsModalProviderProps> = ({ children }) => {
  const [shouldModalRender, setShouldmodalRender] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <SkillsModalContext.Provider
      value={{
        shouldModalRender,
        setShouldmodalRender,
        showProfileModal,
        setShowProfileModal,
      }}>
      {children}
    </SkillsModalContext.Provider>
  );
};
