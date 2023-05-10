import { create } from 'zustand';

export type configType = {
  numberOfQuestion: number;
  category: { id: number; name: string };
  level: string;
  type: string;
  status: string;
  score: number;
};

const defaultConfig = {
  numberOfQuestion: 10,
  category: { id: 0, name: '' },
  level: '',
  type: '',
  status: '',
  score: 0,
};

const useQuizStore = create(set => ({
  config: { ...defaultConfig },
  addNumberOfQuestion: (count: number) =>
    set((state: any) => ({ config: { ...state.config, numberOfQuestion: count } })),
  addCategory: (id: number, name: string) =>
    set((state: any) => ({ config: { ...state.config, category: { id: id, name: name } } })),
  addLevel: (level: string) => set((state: any) => ({ config: { ...state.config, level: level } })),
  addType: (type: string) => set((state: any) => ({ config: { ...state.config, type: type } })),
  addStatus: (status: string) =>
    set((state: any) => ({ config: { ...state.config, status: status } })),
  addScore: () =>
    set((state: any) => ({ config: { ...state.config, score: state.config.score + 1 } })),
}));

export default useQuizStore;
