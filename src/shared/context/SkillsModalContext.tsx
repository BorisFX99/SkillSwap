import { createContext, type RefObject } from 'react';

// Описываю тип данных в контексте
export type TSkillsModalContext = {
  shouldModalRender: boolean;  // isSkillModalVisible
  setShouldmodalRender: (value: boolean) => void;
  showProfileModal: boolean;
  setShowProfileModal: (value: boolean) => void;
}

// Создание контекста с объектом
export const SkillsModalContext = createContext<TSkillsModalContext>({
  shouldModalRender: false,
  setShouldmodalRender: () => {},
  showProfileModal: false,
  setShowProfileModal: () => {},
});
