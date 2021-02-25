import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye',
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActivaChallenge] = useState(null);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]
        setActivaChallenge(challenge);
    }

    return (
        <ChallengesContext.Provider value={{
            level, currentExperience, challengesCompleted, activeChallenge,
            levelUp, startNewChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}