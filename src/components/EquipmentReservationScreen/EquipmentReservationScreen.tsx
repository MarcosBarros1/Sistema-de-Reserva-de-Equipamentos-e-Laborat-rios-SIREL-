import React from 'react';
import styles from './EquipmentReservationScreen.module.css';
// Importações de imagens locais (mantidas)
import projetorBranco from '../../assets/DataShowBranco.jpeg';
import projetorPreto from '../../assets/DataShowPreto.jpeg';
import projetorAmarelo from '../../assets/DataShowAmarelo.jpeg';

// Interface para as props (mantida)
interface EquipmentReservationScreenProps {
    onGoHome: () => void; // Função para voltar à tela inicial
}

// Componente para um único item de equipamento (mantido)
interface EquipmentItemProps {
    name: string;
    description: string;
    imageUrl: string;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({ name, description, imageUrl }) => (
    <div className={styles['equipment-card']}>
        <div className={styles['text-content']}>
            <h3>{name}</h3>
            <p>{description}</p>
            <button className={styles['btn-reservar']}>Reservar</button>
        </div>
        <div className={styles['image-container']}>
            <img src={imageUrl} alt={name} />
        </div>
    </div>
);


function EquipmentReservationScreen({ onGoHome }: EquipmentReservationScreenProps) {
    // Reutilizando os dados do usuário da Home (simulação)
    const userName = "Jéssica de Paulo Rodrigues";
    const userMatricula = "20241283000xxx";

    return (
        <div className={styles['reservation-body']}>
            <div className={styles['reservation-screen']}>
                <header className={styles.header}>
                    <div className={styles['header-left']}>
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
                    {/* 👇 NOVO BOTÃO DE VOLTAR */}
                    <button className={styles['btn-voltar']} onClick={onGoHome}>
                        ← Voltar para Reservas
                    </button>
                    
                    <h2>Equipamentos</h2>
                    
                    {/* Lista de Equipamentos (mantida) */}
                    <div className={styles['equipment-list']}>
                        <EquipmentItem
                            name="Data Show (BRANCO) - com suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorBranco}
                        />
                        <EquipmentItem
                            name="Data Show (PRETO) - sem suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorPreto}
                        />
                        <EquipmentItem
                            name="Data Show (AMARELO) - sem suporte para HDMI"
                            description="Equipamento de exibição de vídeo."
                            imageUrl={projetorAmarelo}
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

export default EquipmentReservationScreen;