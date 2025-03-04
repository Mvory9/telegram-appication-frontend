import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import "./App.css";
import Footer from './components/Footer';

export default function App() {
    const url = 'https://fluffy-giggle-9776gg49vg4qc74xj-8000.app.github.dev';
    const tg = window.Telegram.WebApp;

    const [fio, setFio] = useState(tg.initDataUnsafe?.user?.first_name);
    const [type, setType] = useState('profile');

    useEffect(() => {
        tg.ready();

        fetch(`${url}/api/profile/${tg.initDataUnsafe?.user?.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then((data) => {
                setFio(data);
            });
    }, []);

    const onClose = () => {
        tg.close();
    }

    // tg.initDataUnsafe?.user

    return (
        <div className='App'>
            <Header username={fio}/>
            <Block1 type={type}/>
            <Block2 type={type}/>
            <Footer setType={setType}/>
        </div>
    );
}

function Block1({ type }) {
    return (
        <div className='block1'>
            {type === 'profile' && (
                <>
                    <div className='block1__square blue_square'>
                        <p className='block1__square-group'>Курс 2 Backend Группа 9</p>
                    </div>
                    <div className='block1__square orange_square'>
                        <p className='block1__square-quote'>Цитата</p>
                    </div>
                </>
            )}

            {type === 'todo' && (
                <>
                    <input className='block1__input' type='text'/>
                    <button className='block1__addButton'>Добавить</button>
                </>
            )}
        </div>
    );
}

function Block2({ type }) {
    return (
        <div className='block2'>
            {type === 'profile' && (
                <div className='block2__square'>
                    <p>Место в рейтинге: 3</p>
                    <p>Образовательная активность: 34</p>
                    <p>Дополнительная активность: 6</p>
                </div>
            )}

            {type === 'todo' && (
                <>
                    <TodoTask text="Снять видео"/>
                    <TodoTask text="Посмотреть запись занятия"/>
                    <TodoTask text="Дз 9 урок"/>
                    <TodoTask text="Снять видео"/>
                    <TodoTask text="Посмотреть запись занятия"/>
                    <TodoTask text="Дз 9 урок"/>
                    <TodoTask text="Снять видео"/>
                    <TodoTask text="Посмотреть запись занятия"/>
                    <TodoTask text="Дз 9 урок"/>
                </>
            )}
        </div>
    );
}

function TodoTask({ text, buttonText = "Выполнить" }) {
    return (
        <div className='block2__todo'>
            <button className='block2__todo-button'>{buttonText}</button>
            <p className='block2__todo-text'>{text}</p>
        </div>
    )
}