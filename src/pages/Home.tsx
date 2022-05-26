import { useHistory } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

import img from '../assets/images/img.png';
import dollar_logo from '../assets/images/dollar_logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist');
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={img} alt="Ilustração simbolizando budget" />
        <strong>Gerencie suas finanças pessoais</strong>
      </aside>
      <main>
        <div className="main-content">
          <img src={dollar_logo} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Entre com sua conta Google
          </button>
        </div>
      </main>
    </div>
  )
}