import { useState } from "react";

export default function Contador() {
    // Estado
    const [count, setCount] = useState(0)

    return (
    <>
        <input type="text" value={count} />
        <button type="button" onClick={() => setCount(count-1) }>-</button>
        <button type="button" onClick={() => setCount(count+1) }>+</button>
    </>
    );
}