import React from "react";

export default function IntroPage(){
    return(
        <section id="intro-page" >
            <div className="intro-page-container">
                <div className="upper-right"></div>
                <h1>Quizzy</h1>
                <p>Test your knowledge</p>
                <a href="#second-page" type="button" className="intro-page-button">start quiz</a>
                <div className="bottom-left"></div>
            </div>
        </section>
    )
}