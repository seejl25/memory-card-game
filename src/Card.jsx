import { useEffect, useState } from "react";

export default function Card({ url, onClick }) {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => setUserData(data.message))
    }, [url])

    const handleClick = () => {
        const breed = userData?.split("/").at(-2)
        if (breed) {
            onClick(breed)
        }
    }

    return (
        <div className="image-card" onClick={handleClick} >
            {userData && (
                <>
                    <img src={userData} />
                    <p>{userData?.split("/").at(-2).toUpperCase()}</p>
                </>
            )}
        </div>
    )
}