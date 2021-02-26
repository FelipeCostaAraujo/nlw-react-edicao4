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
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    lastExperience: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActivaChallenge] = useState(null);
    const [lastExperience, setLastExperience] = useState(0);

    function levelUp() {
        setLastExperience(experienceToNextLevel);
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]
        setActivaChallenge(challenge);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActivaChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function resetChallenge() {
        setActivaChallenge(null);
    }

    return (
        <ChallengesContext.Provider value={{
            level, currentExperience, challengesCompleted, activeChallenge, experienceToNextLevel, lastExperience,
            levelUp, startNewChallenge, resetChallenge, completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}