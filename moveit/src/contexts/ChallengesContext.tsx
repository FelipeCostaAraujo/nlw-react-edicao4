import { createContext, ReactNode, useState } from 'react';

interface ChallengesProviderProps {
    children: ReactNode
}

interface ChallengeContextData {
    level: number;
    currentExperience: number,
    challengesCompleted: number,
    levelUp: () => void;
    startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        console.log("new challenge");
    }

    return (
        <ChallengesContext.Provider value={{
            level, currentExperience, challengesCompleted,
            levelUp, startNewChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}