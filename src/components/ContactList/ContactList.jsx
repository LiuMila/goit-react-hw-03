import PropTypes from 'prop-types'
import { ContactItem }  from '../ContactItem/ContactItem'
import {List} from './ContactList.style'

export const Contacts = ({ contacts,deleteContact }) => {

    return (<List>
        {contacts.map(({ id, name, number }) => (
            <ContactItem key={id}
                id={id}
                name={name}
                number={number}
                deleteContact={ deleteContact} />
            
        ))}
    </List>)
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    deleteContact: PropTypes.func.isRequired
}