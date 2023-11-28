import { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    useEffect(() => {
        console.log("Empezando el efecto");
        if(!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true
                    });
                }else{
                    setState({
                        ...state,
                        error: true,
                        loading: false,
                    })
                }
                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminando el efecto");
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto.</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder="Código de seguridad" 
                    type="text" 
                    value={state.value}
                    onChange={(event) => {
                        setState({
                            ...state,
                            value: event.target.value,
                        });
                    }}
                />
                <button
                    onClick={() => setState({
                        ...state,
                        loading: true,
                    })}
                >
                    Comprobar
                </button>
            </div>
        );
    }else if(!!state.confirmed && !state.deleted){
        return (
            <>
                <p>Pedimos confirmación, Estas seguro?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true,
                        })
                    }}    
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: '',
                        })
                    }}  
                >
                    No
                </button>
            </>
        )
    }else{
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: '',
                        })
                    }}  
                >
                    Resetear
                </button>
            </>
        )
    }

}

export { UseState };