import { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Empezando el efecto");
        if(!!loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if(value === SECURITY_CODE){
                    setLoading(false);
                    // setError(false)
                }else{
                    setError(true);
                    setLoading(false);
                }
                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminando el efecto");
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {(error && !loading) && (
                <p>Error: el código es incorrecto.</p>
            )}
            {loading && (
                <p>Cargando...</p>
            )}
            <input 
                placeholder="Código de seguridad" 
                type="text" 
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <button
                onClick={() => setLoading(true)}
            >
                Comprobar
            </button>
        </div>
    );
}

export { UseState };