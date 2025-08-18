import React from 'react'
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {scrollTrigger} from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";


import { hightlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from "../utils"

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef(([]));
    const videoDivRef = useRef([]);

    const [ video, setVideo ] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLasrVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying) {
                videoRef.current[videoId].pause();
            } else{
                startPlay && videoRef.current[videoId].play();
            }
        }

    },[startPlay, videoId, isPlaying, loadedData])

    useEffect (() => {
        const currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]){
            //animate the process of the video
            let anim =gsap.to(span[videoId], {
                onUpdate: () => {

                },

                onComplete: () => {

                }
            })
        }
    })

  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
            <div key={list.d} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
                    <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                        <video
                            id="video"
                            playsInline = {true}
                            preload='auto'
                            muted
                            ref={(el) => (videoRef.current[i] = el)}
                            onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying: true
                                }))
                            }}
                        >
                            <source src={list.video} type="video/mp4" />
                        </video>
                    </div>

                    <div className="absolute top-12 left-[5%] z-10">
                        {list.textLists.map((text) => (
                            <p key={text} className="md:text-2xl text-xl font-medium">
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        ))}

        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        ref={(el) => (videoDivRef.current[i] = el)}
                        className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />

                    </span> 
                ))}
            </div>

            <button className="control-btn">
                <img
                    src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo ? 'replay' : !isPlaying? 'play' : 'pause' }
                    onClick={
                        isLastVideo
                         ? () => handleProcess('video-reset')
                         : !isPlaying
                         ? () => handleProcess('play')
                         : () => handleProcess('pause')
                    }
                />
            </button>
        </div>
    </div>
    </>
  )
}

export default VideoCarousel
