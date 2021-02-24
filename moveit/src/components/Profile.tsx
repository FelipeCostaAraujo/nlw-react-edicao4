import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/FelipeCostaAraujo.png" alt="Felipe Araujo" />
            <div>
                <strong>Felipe Araujo</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}