import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GameInputs } from './gameLogic/GameInputs';

const App = () => {
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
        if (!canvas) {
            throw new Error('canvasタグが存在しません。');
        }
        setCanvasContext(canvas?.getContext('2d') ?? null);

    });
    useEffect(() => {
        if (!canvasContext) { return; }
        initialize({ canvasContext, setScore });
    }, [canvasContext]);

    return <><input type="number" value={score} /><canvas
        width="1280"
        height="720"
        id="canvas"
    ></canvas></>
}

async function initialize(inputs: GameInputs) {
    // TODO: 別ファイルに切り出す 
    const { canvasContext, setScore } = inputs;
    canvasContext?.fillRect(25, 25, 600, 1000);
    canvasContext?.fillRect(25, 25, 600, 1000);
    canvasContext?.clearRect(45, 45, 60, 60);
    canvasContext?.strokeRect(50, 45 + 5, 50, 50);
    for (let index = 25; index < 1000; index += 10) {
        const height = index;
        canvasContext?.fillRect(25, 25, 600, 1000);
        canvasContext?.clearRect(45, height, 60, 60);
        canvasContext?.strokeRect(50, height + 5, 50, 50);
        setScore(height);
        await sleep(100);
    }
}

async function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(_ => resolve(), ms));
}

ReactDOM.render(<App />, document.getElementById('root'));
