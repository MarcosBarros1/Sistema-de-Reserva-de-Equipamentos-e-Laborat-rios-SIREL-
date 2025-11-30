import React, { useState } from 'react';
import styles from './AuditoriumReservationScreen.module.css';
import logoIFCE from '../../assets/LogoIFCE (1).png'

interface AuditoriumReservationScreenProps {
    onGoHome: () => void;
}

// Componente para um único cartão de tipo de evento
interface EventCardProps {
    title: string;
}

const EventCard: React.FC<EventCardProps> = ({ title }) => {
    // Estado local para armazenar a descrição que o usuário digitar
    const [description, setDescription] = useState('');

    const handleReservation = () => {
        if (description.trim() === '') {
            alert(`Por favor, insira a descrição para "${title}".`);
            return;
        }
        // Lógica de reserva: Aqui, você enviaria 'title' e 'description' para o backend.
        alert(`Reserva de ${title} solicitada. Descrição: ${description}`);
    };

    return (
        <div className={styles['event-card']}>
            <div className={styles['text-content']}>
                <h3>{title}</h3>
                
                {/* 👇 CAMPO PARA INSERIR A DESCRIÇÃO */}
                <label className={styles.label} htmlFor={`desc-${title}`}>
                    Descrição:
                </label>
                <textarea
                    id={`desc-${title}`}
                    className={styles.textarea}
                    placeholder="Detalhe o que será feito no auditório..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3} // Define o número de linhas visíveis
                />
                
                {/* Botão de reserva que usa a função de tratamento */}
                <button 
                    className={styles['btn-reservar']}
                    onClick={handleReservation}
                >
                    Reservar
                </button> 
            </div>
        </div>
    );
};


function AuditoriumReservationScreen({ onGoHome }: AuditoriumReservationScreenProps) {
    const userName = "Jéssica de Paulo Rodrigues";
    const userMatricula = "20241283000xxx";

    return (
        <div className={styles['reservation-body']}>
            <div className={styles['reservation-screen']}>
                <header className={styles.header}>
                    <div className={styles['header-left']} onClick={onGoHome}>
                        <img src={logoIFCE} alt="Logo IFCE Pequeno" />
                        INSTITUTO FEDERAL<br />Ceará
                    </div>
                    <div className={styles['user-info']}>
                        <div className={styles['user-details']}>
                            {userName}<br />
                            {userMatricula}
                        </div>
                        <img src="https://via.placeholder.com/40/f4c2c2/000000?text=JR" alt="Avatar do Usuário" className={styles['user-avatar']} />
                    </div>
                </header>

                <main className={styles.main}>
                    <button className={styles['btn-voltar']} onClick={onGoHome}>
                        ← Voltar para Reservas
                    </button>

                    <h2>Auditório</h2>
                    
                    <div className={styles['event-list']}>
                        <EventCard
                            title="Evento?"
                        />
                        <EventCard
                            title="Palestra?"
                        />
                        <EventCard
                            title="Projeto de Extensão?"
                        />
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

export default AuditoriumReservationScreen;