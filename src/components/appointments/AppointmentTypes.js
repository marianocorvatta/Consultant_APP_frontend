import React from 'react'

const AppointmentTypes = ({type}) => {

    if (type === 1) return <span>Terapia Floral</span>
    if (type === 2) return <span>Reiki</span>

    return (
        <span>
            Sin tipo
        </span>
    )
}

export default AppointmentTypes



