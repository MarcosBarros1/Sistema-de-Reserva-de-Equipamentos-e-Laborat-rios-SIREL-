import React from 'react';
import styles from './HomeScreen.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faDesktop, faUsers } from '@fortawesome/free-solid-svg-icons';

interface HomeScreenProps {
    onNavigateToEquipments: () => void; // Nova prop para navegação
}

function HomeScreen({ onNavigateToEquipments }: HomeScreenProps) {
    return (
        <div className={styles['home-body']}>
            <div className={styles['home-screen']}>
                <header className={styles.header}>
                    <div className={styles['header-left']}>
                        <img src="https://via.placeholder.com/20x25/298642/ffffff?text=IF" alt="Logo IFCE Pequeno" />
                        INSTITUTO FEDERAL<br />Ceará
                    </div>
                    <div className={styles['user-info']}>
                        <div className={styles['user-details']}>
                            Jéssica de Paulo Rodrigues<br />
                            20241283000xxx
                        </div>
                        <img src="https://via.placeholder.com/40/f4c2c2/000000?text=JR" alt="Avatar do Usuário" className={styles['user-avatar']} />
                    </div>
                </header>

                <main className={styles.main}>
                    <h1>Sistema de Reserva de<br />Equipamentos e Laboratórios</h1>
                    <div className={styles['reservation-options']}>
                        
                        {/* CARD EQUIPAMENTOS - AGORA COM O REDIRECIONAMENTO */}
                        <div className={styles['option-card']}>
                            <h2>EQUIPAMENTOS</h2>
                            <FontAwesomeIcon icon={faVideo} size="6x" className={styles.icon} /> 
                            <button 
                                className={styles['btn-reservar']} 
                                onClick={onNavigateToEquipments} // <--- AQUI ESTÁ A MUDANÇA
                            >
                                RESERVAR
                            </button>
                        </div>

                        {/* CARD LABORATÓRIOS */}
                        <div className={styles['option-card']}>
                            <h2>LABORATÓRIOS</h2>
                            <FontAwesomeIcon icon={faDesktop} size="6x" className={styles.icon} /> 
                            <button className={styles['btn-reservar']}>RESERVAR</button>
                        </div>
                        
                        {/* CARD AUDITÓRIO */}
                        <div className={styles['option-card']}>
                            <h2>AUDITÓRIO</h2>
                            <FontAwesomeIcon icon={faUsers} size="6x" className={styles.icon} />
                            <button className={styles['btn-reservar']}>RESERVAR</button>
                        </div>
                    </div>
                </main>

                <footer className={styles.footer}>
                    Instituto Federal de Educação, Ciência e Tecnologia do Ceará<br />
                    2025. All Rights Reserved.
                </footer>
            </div>
        </div>
    );
}

export default HomeScreen;