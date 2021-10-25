import React, { useState } from "react";
import Modal from 'react-modal';

export default function FunctionsModal({setIsOpen, modalIsOpen}) {
    //const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: 300,
            height: 500,
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const funciones = [{ label: 'Raíz cuadrada', function: 'sqrt(x)' }, { label: 'Raíz cúbica', function: 'cbrt(x)' }, { label: 'Seno', function: 'sin(x)' }, { label: 'Arco seno', function: 'asin(x)' }, { label: 'Coseno', function: 'cos(x)' }, { label: 'Arco coseno', function: 'acos(x)' }, { label: 'Tangente', function: 'tan(x)' }, { label: 'Arco tangente', function: 'atan(x)' }, { label: 'Cotangente', function: 'cot(x)' }, { label: 'Arco cotangente', function: 'acot(x)' }, { label: 'Secante', function: 'sec(x)' }, { label: 'Arco secante', function: 'asec(x)' }, { label: 'Cosecante', function: 'csc(x)' }, { label: 'Arco cosecante', function: 'acsc(x)' }, { label: 'Función exponencial', function: 'e^x' },]
    return (
        <div>
            {/* <button style={classes.question} onClick={openModal}>?</button> */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{marginBottom:18}}>
                    <button onClick={closeModal} style={{ backgroundColor: 'transparent', borderColor: 'transparent', fontSize: 14 }}>X</button>
                   <span style={{fontSize:18}}> Funciones </span>
                </div>

                <div class="grid-container">
                    {funciones.map((fun) => {
                        return <>
                            <div class="grid-item">{fun.label}</div>
                            <div class="grid-item">{fun.function}</div>
                        </>
                    })}
                </div>
            </Modal>
        </div>
    )
}

const classes = ({
    question: {
        color: "#FFF",
        backgroundColor: "#E562C9",
        width: 22,
        height: 22,
        borderRadius: 20,
        borderColor: "#E562C9",
        fontSize: 12,
        fontFamily: 'Montserrat'
    }
});
