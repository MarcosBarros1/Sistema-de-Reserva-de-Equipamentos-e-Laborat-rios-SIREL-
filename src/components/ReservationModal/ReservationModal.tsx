import React from 'react';
import styles from './ReservationModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ReservationModalProps {
    isVisible: boolean; // Controla se o modal é visível
    onClose: () => void; // Função para fechar o modal
    title: string;
    responsibleName?: string; // Nome do responsável
    reservationDetails?: { // Detalhes opcionais da reserva
        data: string;
        horario: string;
    };
}

// 🎯 CORREÇÃO: Adicionado responsibleName à desestruturação das props 🎯
const ReservationModal: React.FC<ReservationModalProps> = ({
    isVisible,
    onClose,
    title,
    responsibleName,
    reservationDetails
}) => {

    if (!isVisible) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />

                <h2>Reserva Concluída!</h2>

                <p className={styles.message}>
                    Seu pedido de reserva para:
                    <br />
                    <strong>{title}</strong>
                    <br />
                    foi realizado com sucesso.
                </p>

                {/* Agora responsibleName existe e será renderizado se fornecido */}
                {responsibleName && (
                    <div className={styles.responsibleInfo}>
                        Responsável: <strong>{responsibleName}</strong>
                    </div>
                )}

                {reservationDetails && (
                    <div className={styles.details}>
                     { /* <p><strong>Data:</strong> {reservationDetails.data}</p> */}
                       { /*  <p><strong>Horário:</strong> {reservationDetails.horario}</p> */}
                        <p className={styles.note}>
                            Aguarde a aprovação do coordenador(a) para liberação final do item.
                        </p>
                    </div>
                )}

                <button className={styles.closeButton} onClick={onClose}>
                    OK, ENTENDI
                </button>
            </div>
        </div>
    );
};

export default ReservationModal;
