import { Component } from 'react'
import  Form  from './ContactForm/ContactForm'
import { Contacts } from './ContactList/ContactList'
import shortid from "shortid"
import { Section } from './Section/Section'
import { Filter } from './SearchBox/SearchBox'
import { Container } from './App.style';


class App extends Component{
state = {
  contacts: [],
  filter: '',
}
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  

  formSubmitHandler = data => {
    const { name, number } = data
    const findContact = this.state.contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number);

    if (findContact) {
      alert (`${name} is already in contact.`)
      return
    }

    const newContact = {
      id: shortid.generate(),
      ...data,
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }))
  }

  changeFilter = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  getVisibleContacts = () => {
    const {filter, contacts} = this.state
    const normalizedFilter = filter.toLowerCase()

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }
 
  
  render() {

    
    const visibleContacts = this.getVisibleContacts()

    return <Container>
      <Section title='Phonebook'>
      <Form onSubmit={ this.formSubmitHandler} />
      </Section>
      <Section title='Contacts'>
        <Filter value={this.state.filter} changeFilter={this.changeFilter} />
        <Contacts contacts={visibleContacts}
          deleteContact={ this.deleteContact} />
      </Section>
    </Container>
  }
}

export default App;