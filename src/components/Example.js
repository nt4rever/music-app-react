import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function Example() {
    const [videoId, setVideoId] = useState("fzu4VT-QWK4");
    const [title, setTitle] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlay, setIsPlay] = useState(false);
    const [user, setUser] = useState("lactranh");
    const [listUser, setListUser] = useState([]);
    const axios = require('axios');

    useEffect(() => {
        const getListUser = async () => {
            try {
                const result = await axios.get('https://api.nt4rever.live/api/v2/user', { params: { api_token: "liigNo5RnfjHhQghSoD2hlJY3Ril8f2JnITbNu63lsjSnrOeSCF93BHZ77Aq" } });
                setListUser(result.data)
                console.clear()
            } catch (e) {
                console.error(e)
            }
        }
        getListUser()
    }, [])

    useEffect(() => {
        const updateVideoId = async () => {
            try {
                const result = await axios.get('https://api.nt4rever.live/api/v2/get', { params: { api_token: "liigNo5RnfjHhQghSoD2hlJY3Ril8f2JnITbNu63lsjSnrOeSCF93BHZ77Aq", user: user } });
                setVideoId(result.data.url)
                setTitle(result.data.name)
                console.clear()
            } catch (e) {
                console.error(e)
            }
        }
        const timerId = setInterval(() => {
            updateVideoId()
        }, 1500);
        return () => clearInterval(timerId);
    }, [user])

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

    const handleChangeSelected = (event) => {
        setUser(event.target.value)
    }

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
                            <button type="button" className='button is-danger mr-2' onClick={onPauseVideo} disabled={!player}>
                                Pause
                            </button>
                        ) : (
                            <button type="button" className='button is-primary mr-2' onClick={onPlayVideo} disabled={!player}>
                                Play
                            </button>
                        )
                    }
                    <div class="select is-primary">
                        <select value={user} onChange={handleChangeSelected}>
                            {
                                listUser.map((data) => (
                                    <option value={data.user}>{data.user}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;