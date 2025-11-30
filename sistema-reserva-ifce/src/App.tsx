import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen/LoginScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import EquipmentReservationScreen from './components/EquipmentReservationScreen/EquipmentReservationScreen';
import LabReservationScreen from './components/LabReservationScreen/LabReservationScreen';
import AuditoriumReservationScreen from './components/AuditoriumReservationScreen/AuditoriumReservationScreen'; // NOVO COMPONENTE

// Define as visualizações possíveis do aplicativo
const View = {
    LOGIN: 'login',
    HOME: 'home',
    EQUIPMENTS: 'equipments',
    LABS: 'labs',
    AUDITORIUM: 'auditorium', // NOVO ESTADO
}

function App() {
    // Define a tela inicial como LOGIN
    const [currentView, setCurrentView] = useState(View.LOGIN);

    const handleLoginSuccess = () => {
        setCurrentView(View.HOME);
    };

    const handleNavigateToEquipments = () => {
        setCurrentView(View.EQUIPMENTS);
    };

    const handleNavigateToLabs = () => {
        setCurrentView(View.LABS);
    };

    // FUNÇÃO DE NAVEGAÇÃO: HOME -> AUDITÓRIO (NOVO)
    const handleNavigateToAuditorium = () => {
        setCurrentView(View.AUDITORIUM);
    };

    // FUNÇÃO DE NAVEGAÇÃO: Voltar para Home
    const handleGoHome = () => {
        setCurrentView(View.HOME);
    };

    let componentToRender;

    switch (currentView) {
        case View.HOME:
            // Passa as funções de navegação para a tela Home
            componentToRender = (
                <HomeScreen 
                    onNavigateToEquipments={handleNavigateToEquipments} 
                    onNavigateToLabs={handleNavigateToLabs}
                    onNavigateToAuditorium={handleNavigateToAuditorium} // NOVO PROPS
                />
            );
            break;
        case View.EQUIPMENTS:
            componentToRender = <EquipmentReservationScreen onGoHome={handleGoHome} />;
            break;
        case View.LABS:
            componentToRender = <LabReservationScreen onGoHome={handleGoHome} />;
            break;
        case View.AUDITORIUM: // NOVA ROTA
            componentToRender = <AuditoriumReservationScreen onGoHome={handleGoHome} />;
            break;
        case View.LOGIN:
        default:
            componentToRender = <LoginScreen onLoginSuccess={handleLoginSuccess} />;
            break;
    }

    return (
        <div className="App">
            {componentToRender}
        </div>
    );
}

export default App;