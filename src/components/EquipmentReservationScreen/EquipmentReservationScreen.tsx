import React, { useState } from 'react';
import styles from './EquipmentReservationScreen.module.css';
import ReservationModal from '../../components/ReservationModal/ReservationModal';

// Importações de imagens locais
import projetorBranco from '../../assets/DataShowBranco.jpeg';
import projetorPreto from '../../assets/DataShowPreto.jpeg';
import projetorAmarelo from '../../assets/DataShowAmarelo.jpeg';

// Interface para as props
interface EquipmentReservationScreenProps {
    onGoHome: () => void;
}

// Componente para um único item de equipamento
interface EquipmentItemProps {
    name: string;
    description: string;
    imageUrl: string;
    onReserve: (itemName: string) => void;
}

// O Componente EquipmentItem
const EquipmentItem: React.FC<EquipmentItemProps> = ({ name, description, imageUrl, onReserve }) => (
    <div className={styles['equipment-card']}>
        <div className={styles['text-content']}>
            <h3>{name}</h3>
            <p>{description}</p>
            <button 
                className={styles['btn-reservar']}
                onClick={() => onReserve(name)} 
            >
                Reservar
            </button>
        </div>
        <div className={styles['image-container']}>
            <img src={imageUrl} alt={name} />
        </div>
    </div>
);


function EquipmentReservationScreen({ onGoHome }: EquipmentReservationScreenProps) {
    // ESTADO PARA O MODAL
    const [showModal, setShowModal] = useState(false);
    const [reservedItem, setReservedItem] = useState('');

    const userName = "Jéssica de Paulo Rodrigues";
    const userMatricula = "20241283000xxx";

    // Função que simula a reserva e mostra o Modal
    const handleReserve = (itemName: string) => {
        setReservedItem(itemName);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className={styles['reservation-body']}>
            <div className={styles['reservation-screen']}>
                <header className={styles.header}>
                    <div className={styles['header-left']} onClick={onGoHome}>
                        <img src="https://via.placeholder.com/20x25/298642/ffffff?text=IF" alt="Logo IFCE Pequeno" />
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
                    
                    <h2>Equipamentos</h2>
                    
                    <div className={styles['equipment-list']}>
                        <EquipmentItem
                            name="Data Show (BRANCO) - com suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorBranco}
                            onReserve={handleReserve}
                        />
                        <EquipmentItem
                            name="Data Show (PRETO) - sem suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorPreto}
                            onReserve={handleReserve}
                        />
                        <EquipmentItem
                            name="Data Show (AMARELO) - sem suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorAmarelo}
                            onReserve={handleReserve}
                        />
                    </div>
                </main>


                <footer className={styles.footer}>
                    Instituto Federal de Educação, Ciência e Tecnologia do Ceará<br />
                    2025. All Rights Reserved.
                </footer>
            </div>

            {/* INTEGRANDO O MODAL AQUI */}
            <ReservationModal 
                isVisible={showModal} 
                onClose={handleCloseModal} 
                title={reservedItem}
                reservationDetails={{
                    data: '15/01/2026',
                    horario: '10:00 - 12:00'
                }}
            />
        </div>
    );
}

export default EquipmentReservationScreen;