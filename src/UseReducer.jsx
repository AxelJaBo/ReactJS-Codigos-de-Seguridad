import { useEffect, useState, useReducer } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }){
    const [state, dispatch] = useReducer(reducer, inittialState);

    const onConfirm = () => {
        dispatch({ type: actionTypes.confirm });
    };

    const onError = () => {
        dispatch({ type: actionTypes.error });
    };

    const onWrite = ({ target: { value }}) => {
        dispatch({ type: actionTypes.write, payload: value });
    };

    const onCheck = () => {
        dispatch({ type: actionTypes.check });
    };

    const onDelete = () => {
        dispatch({ type: actionTypes.delete });
    };

    const onReset = () => {
        dispatch({ type: actionTypes.reset });
    };

    useEffect(() => {
        console.log("Empezando el efecto");
        if(!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if(state.value === SECURITY_CODE){
                    onConfirm();
                }else{
                    onError();
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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
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
                    onClick={onDelete}    
                >
                    Si, eliminar
                </button>
                <button
                    onClick={onReset}  
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
                    onClick={onReset}
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

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    delete: 'DELETE',
    write: 'WRITE',
    reset: 'RESET',
    check: 'CHECK',
};

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    [actionTypes.write]: {
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