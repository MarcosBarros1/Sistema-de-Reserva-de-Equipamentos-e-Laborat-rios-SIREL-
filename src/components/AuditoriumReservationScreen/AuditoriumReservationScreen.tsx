import React, { useState } from 'react';
import styles from './AuditoriumReservationScreen.module.css';
import logoIFCE from '../../assets/LogoIFCE (1).png'
import ReservationModal from '../../components/ReservationModal/ReservationModal'; 

interface AuditoriumReservationScreenProps {
    onGoHome: () => void;
}

interface AuditoriumForm {
    actionType: string;
    otherActionType: string;
    title: string;
    responsible: string;
    description: string;
}

// 🎯 CORREÇÃO 1: Tipo de dados que será passado para o Modal
interface ModalDetails {
    title: string;
    responsible: string; // <-- Agora é o responsável completo
}

function AuditoriumReservationScreen({ onGoHome }: AuditoriumReservationScreenProps) {
    const userName = "Jéssica de Paulo Rodrigues";
    const userMatricula = "20241283000xxx";

    // ESTADOS DO MODAL
    const [showModal, setShowModal] = useState(false);
    // 🎯 CORREÇÃO 2: Use o tipo ModalDetails para armazenar Título E Responsável
    const [reservationDetails, setReservationDetails] = useState<ModalDetails>({
        title: '',
        responsible: '',
    }); 
    
    // ESTADOS DO FORMULÁRIO (mantidos)
    const [formData, setFormData] = useState<AuditoriumForm>({
        actionType: 'Palestra',
        otherActionType: '',
        title: '',
        responsible: '',
        description: '',
    });
    const [showOtherField, setShowOtherField] = useState(false);

    // FUNÇÕES DE CONTROLE DE ESTADO (mantidas)
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleActionTypeChange = (value: string) => {
        const isOther = value === 'Outro';
        setShowOtherField(isOther);
        
        setFormData(prev => ({ 
            ...prev, 
            actionType: value,
            otherActionType: isOther ? prev.otherActionType : '',
        }));
    };
    
    const handleOtherActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            otherActionType: e.target.value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalActionType = showOtherField ? formData.otherActionType : formData.actionType;

        if (!finalActionType.trim() || !formData.title.trim() || !formData.responsible.trim() || !formData.description.trim()) {
            alert("Por favor, preencha todos os campos obrigatórios (Tipo de Ação, Título, Responsável e Descrição).");
            return;
        }

        // 🎯 CORREÇÃO 3: Atualiza o estado de detalhes com o Título e o Responsável
        setReservationDetails({ 
            title: formData.title,
            responsible: formData.responsible,
        }); 
        
        setShowModal(true); 

        // Opcional: Limpar formulário (descomente para limpar os campos após submeter)
        /*
        setFormData({
            actionType: 'Palestra', otherActionType: '', title: '', responsible: '', description: ''
        });
        */
    };

    return (
        <div className={styles['reservation-body']}>
            <div className={styles['reservation-screen']}>
                <header className={styles.header}>
                    <div className={styles['header-left']} onClick={onGoHome}>
                        <img src={logoIFCE} alt="Logo IFCE Pequeno" className={styles['ifce-logo-header']} /> 
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

                    <h2 className={styles.pageTitle}>Auditório</h2>

                    {/* FORMULÁRIO */}
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        
                        {/* SEÇÕES DO FORMULÁRIO (MANTIDAS) */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tipo de Ação:</label>
                            <div className={styles.radioGroup}>
                                {['Palestra', 'Programa', 'Projeto Extensão', 'Mesa Redonda', 'Outro'].map(type => (
                                    <label key={type} className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="actionType"
                                            value={type}
                                            checked={formData.actionType === type}
                                            onChange={() => handleActionTypeChange(type)}
                                            className={styles.radioInput}
                                        />
                                        {type}
                                    </label>
                                ))}
                                
                                {showOtherField && (
                                    <input type="text" name="otherActionType" value={formData.otherActionType} onChange={handleOtherActionChange} className={styles.otherInput} placeholder="Informe o tipo de evento" />
                                )}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Título:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className={styles.textInput} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Responsável:</label>
                            <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} className={styles.textInput} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Descrição:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows={5} />
                        </div>
                        
                        <button type="submit" className={styles['btn-reservar']}>
                            Reservar
                        </button>
                    </form>
                </main>

                <footer className={styles.footer}>
                    Instituto Federal de Educação, Ciência e Tecnologia do Ceará<br />
                    2025. All Rights Reserved.
                </footer>
            </div>
            
            {/* CHAMADA DO MODAL COM OS DADOS CORRIGIDOS */}
            <ReservationModal 
                isVisible={showModal} 
                onClose={handleCloseModal} 
                title={reservationDetails.title} // Título do evento
                responsibleName={reservationDetails.responsible} // Nome do Responsável (NOVO)
                reservationDetails={{
                    data: 'Data pendente', 
                    horario: 'Horário pendente'
                }}
            />
        </div>
    );
}

export default AuditoriumReservationScreen;