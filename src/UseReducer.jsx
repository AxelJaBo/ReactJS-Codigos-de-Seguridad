import { useEffect, useState, useReducer } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }){
    const [state, dispatch] = useReducer(reducer, inittialState);
    // const onWrite = (newValue) => {
    //     setState({
    //         ...state,
    //         value: newValue,
    //     });
    // };

    useEffect(() => {
        console.log("Empezando el efecto");
        if(!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if(state.value === SECURITY_CODE){
                    dispatch({
                        type: 'CONFIRM',
                    });
                }else{
                    dispatch({
                        type: 'ERROR',
                    });
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
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value
                        });
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: 'CHECK',
                        });
                    }}
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
                        dispatch({
                            type: 'DELETE',
                        });
                    }}    
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET',
                        });
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
                        dispatch({
                            type: 'RESET',
                        });
                    }}  
                >
                    Resetear
                </button>
            </>
        )
    }
}

const inittialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};
const reducerObject = (state, payload) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    'WRITE': {
        ...state,
        value: payload
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    }else{
        return state;
    }
};

export { UseReducer };