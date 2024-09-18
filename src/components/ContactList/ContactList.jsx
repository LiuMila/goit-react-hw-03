import PropTypes from 'prop-types';
import { Button } from '../ContactForm/ContactForm.style';
import { Item, Text } from './ContactList.style';

// ContactItem компонент
export const ContactItem = ({ name, number, id, deleteContact }) => {
  return (
    <Item key={id}>
      <Text>{name} : {number}</Text>
      <Button type="button" onClick={() => deleteContact(id)}>Delete</Button>
    </Item>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

// ContactList компонент
export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem 
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
