import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen/LoginScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import EquipmentReservationScreen from './components/EquipmentReservationScreen/EquipmentReservationScreen';

// Define as visualizações possíveis do aplicativo
enum View {
    LOGIN = 'login',
    HOME = 'home',
    EQUIPMENTS = 'equipments',
    // Pode adicionar LABS e AUDITORIUM futuramente
}

function App() {
    // Define a tela inicial como LOGIN
    const [currentView, setCurrentView] = useState<View>(View.LOGIN);

    const handleLoginSuccess = () => {
        setCurrentView(View.HOME);
    };

    // FUNÇÃO DE NAVEGAÇÃO: HOME -> EQUIPAMENTOS
    const handleNavigateToEquipments = () => {
        setCurrentView(View.EQUIPMENTS);
    };

    // FUNÇÃO DE NAVEGAÇÃO: Voltar (para uso futuro)
    const handleGoHome = () => {
        setCurrentView(View.HOME);
    };

    let componentToRender;

    switch (currentView) {
        case View.HOME:
            // Passa a função de navegação para a tela Home
            componentToRender = <HomeScreen onNavigateToEquipments={handleNavigateToEquipments} />;
            break;
        case View.EQUIPMENTS:
            // Passa a função para voltar à tela Home (se necessário)
            componentToRender = <EquipmentReservationScreen onGoHome={handleGoHome} />;
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