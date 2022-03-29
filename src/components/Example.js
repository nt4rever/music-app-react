import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function Example() {
    const [videoId, setVideoId] = useState(null);
    const [player, setPlayer] = useState(null);
    const [timer, setTimer] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    async function updateVideoId() {
        try {
            const result = await fetch('https://lactranh.herokuapp.com/api/get?key=lactranh')
            const data = await result.json()
            setVideoId(data.url)
        } catch (e) {
            console.error(e)
        }
        clearTimeout(timer)
        setTimer(setTimeout(updateVideoId, 1000))
    }

    useEffect(() => {
        if (!isMounted) {
            updateVideoId()
            setIsMounted(true)
        }
    })

    const onReady = (event) => {
        setPlayer(event.target);
    };

    const onPlayVideo = () => {
        player.playVideo();
    };

    const onPauseVideo = () => {
        player.pauseVideo();
    };

    const opts = {
        height: '500',
        width: '700',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className='wrapper p-2'>
            <div>
                <YouTube videoId={videoId} onReady={onReady} opts={opts} />
                <div className='control'>
                    <button type="button" className='button is-primary mr-2' onClick={onPlayVideo} disabled={!player}>
                        Play
                    </button>
                    <button type="button" className='button is-danger' onClick={onPauseVideo} disabled={!player}>
                        Pause
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Example;