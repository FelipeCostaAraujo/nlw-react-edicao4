import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    lastExperience:number;
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

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActivaChallenge] = useState(null);
    const [lastExperience, setLastExperience] = useState(rest.lastExperience ?? 0);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(()=>{
        Cookie.set('level',level.toString())
        Cookie.set('currentExperience',currentExperience.toString())
        Cookie.set('challengesCompleted',challengesCompleted.toString())
        Cookie.set('lastExperience',lastExperience.toString())
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLastExperience(experienceToNextLevel);
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]
        setActivaChallenge(challenge);

        const soundEffect = new Audio();

        new Audio('/notification.ogg').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
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