import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen/LoginScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';

function App() {
    // Estado para controlar se o usuário está logado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Função para ser chamada quando o login for bem-sucedido
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                // Se estiver logado, mostra a tela Home
                <HomeScreen />
            ) : (
                // Se não estiver logado, mostra a tela de Login
                <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;