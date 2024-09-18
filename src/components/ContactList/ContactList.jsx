import PropTypes from 'prop-types'
import { Button } from '../ContactForm/ContactForm.style'
import { Item, Text } from './ContactList.style'

export const ContactItem = ({ name, number, id, deleteContact }) => {
    return (
        <Item key={id}>
        <Text>{name} : {number}</Text>
         <Button type="button" onClick={()=>deleteContact(id)}>Delete</Button>
         </Item>)
           
}

ContactItem.propTypes = {
    name: PropTypes.string.isRequired, 
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, 
    deleteContact: PropTypes.func.isRequired
}