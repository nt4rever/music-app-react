import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function Example() {
    const [videoId, setVideoId] = useState("fzu4VT-QWK4");
    const [title, setTitle] = useState(null);
    const [player, setPlayer] = useState(null);
    const [timer, setTimer] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    const [isPlay, setIsPlay] = useState(false);

    async function updateVideoId() {
        try {
            const result = await fetch('https://lactranh.herokuapp.com/api/get?key=lactranh')
            const data = await result.json()
            setVideoId(data.url)
            setTitle(data.name)
            console.clear()
        } catch (e) {
            // console.error(e)
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
        setIsPlay(!isPlay)
        player.playVideo();
    };

    const onPauseVideo = () => {
        setIsPlay(!isPlay)
        player.pauseVideo();
    };

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className='wrapper p-2'>
            <div>
                <div className='wrapper-youtube'>
                    <h3 className='box'>{title}</h3>
                    <YouTube videoId={videoId} onReady={onReady} opts={opts} />
                </div>
                <div className='control'>
                    {
                        isPlay ? (
                            <button type="button" className='button is-danger' onClick={onPauseVideo} disabled={!player}>
                                Pause
                            </button>
                        ) : (
                            <button type="button" className='button is-primary mr-2' onClick={onPlayVideo} disabled={!player}>
                                Play
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Example;