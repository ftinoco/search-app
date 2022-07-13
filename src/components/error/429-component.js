export const TooManyRequests = () => {
    return (
        <>
            <div className="full-screen">
                <div className='container'>
                    <span className="error-num">4</span>
                    <span className="error-num">2</span>
                    <span className="error-num">9</span>
                    <p className="sub-text">Client is rate limited.</p>
                </div>
            </div>
        </>
    );

}