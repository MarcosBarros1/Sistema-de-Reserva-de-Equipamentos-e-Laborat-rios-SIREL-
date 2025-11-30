import React, { useState } from 'react';
import styles from './LabReservationScreen.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface LabReservationScreenProps {
    onGoHome: () => void;
}

// 1. Definição dos tipos de status (mantida)
type SlotStatus = 'reserved' | 'scheduled' | 'available' | 'selected';

// 2. NOVA INTERFACE: Define o formato de cada slot no estado
interface TimeSlot {
    period: string;
    slot: string;
    initialStatus: SlotStatus;
    status: SlotStatus; // Propriedade dinâmica que estava faltando na inicialização
}

// Interface para o Type Casting do CSS Modules (mantida)
interface StyleModule {
    statusBadge: string;
    reserved: string;
    scheduled: string;
    available: string;
    selected: string;
    // Adicionamos [key: string]: string; para acesso dinâmico de forma segura
    [key: string]: string; 
}

// Fazemos o casting para informar ao TypeScript sobre as chaves válidas
const styleClasses = styles as unknown as StyleModule;

// 3. Dados iniciais 'crus' (sem a propriedade 'status' ainda)
const rawInitialSlots = [
    { period: '07:30', slot: '09:30', initialStatus: 'reserved' as SlotStatus },
    { period: '09:45', slot: '11:30', initialStatus: 'available' as SlotStatus },
    { period: '13:00', slot: '15:00', initialStatus: 'scheduled' as SlotStatus },
    { period: '15:20', slot: '17:20', initialStatus: 'scheduled' as SlotStatus },
    { period: '18:30', slot: '20:00', initialStatus: 'reserved' as SlotStatus },
    { period: '20:30', slot: '21:30', initialStatus: 'available' as SlotStatus },
];

// 4. Inicialização do estado: Mapeamos o rawInitialSlots para criar a propriedade 'status'
const initialTimeSlotsState: TimeSlot[] = rawInitialSlots.map(slot => ({
    ...slot,
    status: slot.initialStatus, // Inicializa 'status' com o valor de 'initialStatus'
}));


function LabReservationScreen({ onGoHome }: LabReservationScreenProps) {
    const userName = "Jéssica de Paulo Rodrigues";
    const userMatricula = "20241283000xxx";
    
    // Estado para o dia selecionado (mantido)
    const [selectedDay, setSelectedDay] = useState<number>(13);
    
    // NOVO ESTADO: Usamos o tipo TimeSlot[] e o estado inicial corrigido
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlotsState);

    // Dados do calendário (mantidos estáticos)
    const calendarLayout = [
        { num: 26, dimmed: true }, { num: 27, dimmed: true }, { num: 28, dimmed: true }, { num: 29, dimmed: true }, { num: 30, dimmed: true }, { num: 31, dimmed: true }, { num: 1, dimmed: false },
        { num: 2, dimmed: false }, { num: 3, dimmed: false }, { num: 4, dimmed: false }, { num: 5, dimmed: false }, { num: 6, dimmed: false }, { num: 7, dimmed: false }, { num: 8, dimmed: false },
        { num: 9, dimmed: false }, { num: 10, dimmed: false }, { num: 11, dimmed: false }, { num: 12, dimmed: false }, { num: 13, dimmed: false }, { num: 14, dimmed: false }, { num: 15, dimmed: false },
        { num: 16, dimmed: false }, { num: 17, dimmed: false }, { num: 18, dimmed: false }, { num: 19, dimmed: false }, { num: 20, dimmed: false }, { num: 21, dimmed: false }, { num: 22, dimmed: false },
        { num: 23, dimmed: false }, { num: 24, dimmed: false }, { num: 25, dimmed: false }, { num: 26, dimmed: false }, { num: 27, dimmed: false }, { num: 28, dimmed: false }, { num: 29, dimmed: false },
        { num: 30, dimmed: false }, { num: 31, dimmed: false }, { num: 1, dimmed: true }, { num: 2, dimmed: true }, { num: 3, dimmed: true }, { num: 4, dimmed: true }, { num: 5, dimmed: true },
    ];

    // FUNÇÃO: Manipula a seleção do slot (lógica mantida)
    const handleSlotClick = (clickedIndex: number) => {
        setTimeSlots(prevSlots => {
            const isCurrentlySelected = prevSlots[clickedIndex].status === 'selected';

            // 1. Lógica para desmarcar o slot clicado
            if (isCurrentlySelected) {
                 return prevSlots.map((slot, index) => index === clickedIndex ? { ...slot, status: slot.initialStatus } : slot);
            }

            // 2. Lógica para marcar um novo slot (se for disponível)
            return prevSlots.map((slot, index) => {
                // Se o slot já estiver indisponível (reserved ou scheduled), ele não pode ser alterado.
                if (slot.initialStatus === 'reserved' || slot.initialStatus === 'scheduled') {
                    return slot;
                }

                // Se este for o slot clicado E estiver disponível, marque como 'selected' (VERMELHO)
                if (index === clickedIndex && slot.initialStatus === 'available') {
                    return { ...slot, status: 'selected' as SlotStatus };
                }
                
                // Se for qualquer outro slot que estava 'selected', volte para 'available'
                if (slot.status === 'selected') {
                     return { ...slot, status: 'available' as SlotStatus };
                }

                return slot;
            });
        });
    };
    
    return (
        <div className={styleClasses['reservation-body']}>
            <div className={styleClasses['reservation-screen']}>
                {/* Cabeçalho e User Info (Usa styleClasses) */}
                <header className={styleClasses.header}>
                    <div className={styleClasses['header-left']} onClick={onGoHome}>
                        <img src="https://via.placeholder.com/20x25/298642/ffffff?text=IF" alt="Logo IFCE Pequeno" />
                        INSTITUTO FEDERAL<br />Ceará
                    </div>
                    <div className={styleClasses['user-info']}>
                        <div className={styleClasses['user-details']}>
                            {userName}<br />
                            {userMatricula}
                        </div>
                        <img src="https://via.placeholder.com/40/f4c2c2/000000?text=JR" alt="Avatar do Usuário" className={styleClasses['user-avatar']} />
                    </div>
                </header>

                <main className={styleClasses.main}>

                      <button className={styles['btn-voltar']} onClick={onGoHome}>
                        ← Voltar para Reservas
                    </button>

                    <h1 className={styleClasses.title}>Calendário</h1>
                    
                    <div className={styleClasses['main-content']}>
                        {/* Seção do Calendário (Usa styleClasses) */}
                        <div className={styleClasses['calendar-section']}>
                            <div className={styleClasses['calendar-header']}>
                                <h3>January 2026</h3>
                                <div className={styleClasses.navigation}>
                                    <FontAwesomeIcon icon={faChevronLeft} className={styleClasses.navIcon} />
                                    <FontAwesomeIcon icon={faChevronRight} className={styleClasses.navIcon} />
                                </div>
                            </div>
                            
                            <div className={styleClasses['calendar-weekdays']}>
                                <span>Dom</span>
                                <span>Seg</span>
                                <span>Ter</span>
                                <span>Qua</span>
                                <span>Qui</span>
                                <span>Sex</span>
                                <span>Sáb</span>
                            </div>
                            
                            <div className={styleClasses['calendar-days']}>
                                {calendarLayout.map((day, index) => {
                                    const isSelected = day.num === selectedDay && !day.dimmed;

                                    return (
                                        <span 
                                            key={index} 
                                            className={`${styleClasses.day} ${day.dimmed ? styleClasses.dimmed : ''} ${isSelected ? styleClasses.selectedDay : ''}`}
                                            onClick={() => !day.dimmed && setSelectedDay(day.num)}
                                        >
                                            {day.num}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Seção dos Horários */}
                        <div className={styleClasses['time-slot-section']}>
                            <h3 className={styleClasses['lab-title']}>Laboratório de Informática 1</h3>
                            
                            <div className={styleClasses['slot-grid-header']}>
                                <span>Manhã</span>
                                <span>Tarde</span>
                                <span>Noite</span>
                            </div>

                            <div className={styleClasses['slot-grid']}>
                                {timeSlots.map((slot, index) => (
                                    <div key={index} className={styleClasses['slot-card']}>
                                        <p className={styleClasses.period}>{slot.period}</p>
                                        <div 
                                            className={`${styleClasses.statusBadge} ${styleClasses[slot.status]}`}
                                            onClick={() => handleSlotClick(index)} 
                                        >
                                            {slot.slot}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Legenda (Usa styleClasses) */}
                            <div className={styleClasses.legend}>
                                <div className={styleClasses.legendItem}>
                                    <span className={`${styleClasses.dot} ${styleClasses.reserved}`}></span>
                                    Já está reservado (Indisponível)
                                </div>
                                <div className={styleClasses.legendItem}>
                                    <span className={`${styleClasses.dot} ${styleClasses.scheduled}`}></span>
                                    Reservado para aulas (Indisponível)
                                </div>
                                <div className={styleClasses.legendItem}>
                                    <span className={`${styleClasses.dot} ${styleClasses.selected}`}></span>
                                    **Horário Selecionado** (Pronto para reservar)
                                </div>
                                <div className={styleClasses.legendItem}>
                                    <span className={`${styleClasses.dot} ${styleClasses.available}`}></span>
                                    Livre (Disponível)
                                </div>
                            </div>

                            <button className={styleClasses['btn-final-reservar']}>Reservar</button>
                        </div>
                    </div>
                </main>

                <footer className={styleClasses.footer}>
                    Instituto Federal de Educação, Ciência e Tecnologia do Ceará<br />
                    2025. All Rights Reserved.
                </footer>
            </div>
        </div>
    );
}

export default LabReservationScreen;