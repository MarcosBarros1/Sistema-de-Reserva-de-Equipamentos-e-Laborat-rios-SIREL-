import React, { useState } from 'react';
// Certifique-se de que o CSS Module ainda está sendo usado
import styles from './LoginScreen.module.css'; 
import logoIFCE2 from '../../assets/LogoIFCE2.png'

// 1. Tipagem das Propriedades (Props)
interface LoginScreenProps {
    onLoginSuccess: () => void; // A prop é uma função que não recebe nada e não retorna nada.
}

// 2. Aplicando a tipagem na definição do componente
function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
    // useState é inferido pelo TypeScript, mas podemos ser explícitos
    const [matricula, setMatricula] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    // 3. Tipagem do Evento de Submit do Formulário
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Simulação de lógica de login
        if (matricula && senha) {
            onLoginSuccess();
        } else {
            alert('Por favor, preencha Matrícula e Senha.');
        }
    };

    return (
        <div className={styles['login-body']}>
            <div className={styles['login-screen']}>
                <div className={styles['login-box']}>
                    <div className={styles.logo}>
                        <img src= {logoIFCE2} alt="Logo IFCE" className={styles['ifce-logo-header']} />
                        <p>INSTITUTO FEDERAL<br />Ceará</p>
                    </div>
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="matricula">Matrícula</label>
                        <input
                            type="text"
                            id="matricula"
                            placeholder="Insira a sua matrícula:"
                            value={matricula}
                            // O evento onChange de um input de texto é: React.ChangeEvent<HTMLInputElement>
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMatricula(e.target.value)}
                        />
                        
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Insira a sua senha:"
                            value={senha}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                        />
                        
                        <button type="submit" className={styles['btn-entrar']}>ENTRAR</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;