import * as React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';


export type ChatModeId = 'immediate' | 'immediate-follow-up' | 'write-user' | 'react' | 'draw-imagine' | 'draw-imagine-plus';

/// Describe the chat modes
export const ChatModeItems: {
  [key in ChatModeId]: {
    label: string;
    description: string | React.JSX.Element;
    shortcut?: string;
    experimental?: boolean
  }
} = {
  'immediate': {
    label: 'Chat',
    description: 'Persona replies',
  },
  'write-user': {
    label: 'Write',
    description: 'Appends a message',
    shortcut: 'Alt + Enter',
  },
  'draw-imagine': {
    label: 'Draw',
    description: 'AI Image Generation',
  },
  'draw-imagine-plus': {
    label: 'Assisted Draw',
    description: 'Assisted Image Generation',
    experimental: true,
  },
  'immediate-follow-up': {
    label: 'Chat Plus · α',
    description: 'Augmented chat with auto-diagrams',
  },
  'react': {
    label: 'Reason + Act · α',
    description: 'Answers questions in multiple steps',
  },
};


/// Composer Store

interface ComposerStore {

  startupText: string | null; // if not null, the composer will load this text at startup
  setStartupText: (text: string | null) => void;

}

const useComposerStore = create<ComposerStore>()(
  persist((set, _get) => ({

      startupText: null,
      setStartupText: (text: string | null) => set({ startupText: text }),

    }),
    {
      name: 'app-composer',
      version: 1,
      /*migrate: (state: any, version): ComposerStore => {
        // 0 -> 1: rename history to sentMessages
        if (state && version === 0) {
          state.sentMessages = state.history;
          delete state.history;
        }
        return state as ComposerStore;
      },*/
    }),
);


export const useComposerStartupText = (): [string | null, (text: string | null) => void] =>
  useComposerStore(state => [state.startupText, state.setStartupText], shallow);

export const setComposerStartupText = (text: string | null) =>
  useComposerStore.getState().setStartupText(text);