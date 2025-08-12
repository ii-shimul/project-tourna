import React, { useContext } from 'react';
const TeamProvider = useContext(null)
const TeamContext = () => {
    return (
        <TeamProvider.Provider>
            
        </TeamProvider.Provider>
    );
};

export default TeamContext;