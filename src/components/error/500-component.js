import { useEffect, useRef } from "react"

export const InternalServerError = () => {
    const ref = useRef();

    useEffect(() => {
        ref.current.addEventListener('mousemove', (event) => {
            const eyes = document.querySelectorAll('.eye');
            eyes.forEach((eye) => {
                const x = (eye.offsetLeft) + (eye.clientWidth / 2);
                const y = (eye.offsetTop) + (eye.clientHeight / 2);
                const rad = Math.atan2(event.pageX - x, event.pageY - y);
                const rot = (rad * (180 / Math.PI) * -1) + 180;
                eye.style.cssText += `-webkit-transform: rotate(${rot}deg)`;
                eye.style.cssText += `-moz-transform: rotate(${rot}deg)`;
                eye.style.cssText += `-ms-transform: rotate(${rot}deg)`;
                eye.style.cssText += `transform: rotate(${rot}deg)`;
            }); 
        });
    }, []); 

    return (
        <>
            <div ref={ref} className="full-screen">
                <div className='container'>
                    <span className="error-num">5</span>
                    <div className='eye'></div>
                    <div className='eye'></div>
                    <p className="sub-text">Oh eyeballs! Something went wrong. We're <span className="italic">looking</span> to see what happened.</p>
                </div>
            </div>
        </>
    )
}