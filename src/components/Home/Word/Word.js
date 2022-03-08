import React from 'react';
import dimondImg from "../../../images/diamond.png";
import woodImg from "../../../images/wood.png";
import bushImg from "../../../images/Untitled_design__7_-removebg-preview.png";

const Word = (props) => {
    const {wordLine1,wordLine2,redirectUrl,symbol} = props.data;

    let imgUrl;
    if(symbol === "diamond"){
        imgUrl = dimondImg;
    }else if(symbol === "bush"){
        imgUrl = bushImg;
    }
    return (
        <div className="col-md-6 col-lg-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-3 pe-0">
                    <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
                        <img className="img-fluid" src={imgUrl} alt="" />
                    </a>
                </div>
                
                <div className="col-9 ps-0 position-relative">
                    <div>
                        <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
                            <img className="img-fluid" src={woodImg} alt="" />
                        </a>
                    </div>

                    <div className="word-content">
                        <a className="text-decoration-none text-white" href={redirectUrl} target="_blank" rel="noopener noreferrer">
                            <h2 className="mb-0 text-capitalize">{wordLine1}</h2>
                            <h4 className="mt-0 text-capitalize">{wordLine2}</h4>
                        </a>
                    </div>
                </div> 

            </div>
        </div>
    );
};

export default Word;