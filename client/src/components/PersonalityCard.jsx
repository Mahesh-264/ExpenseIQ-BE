import { useEffect, useState } from "react";
import axios from "axios";

function PersonalityCard() {

    const [personality, setPersonality] = useState({});
    
    useEffect(() => {
        fetchPersonality();
    }, []);

    const fetchPersonality = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/expense/personality"
            );

            setPersonality(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="glass-card mt-4">

            <h2>
                🤖 AI Spending Personality
            </h2>

            <div className="mt-3">

                <h3>
                    {personality.personality}
                </h3>

                <p>
                    {personality.reason}
                </p>

            </div>

        </div>

    );
}

export default PersonalityCard;