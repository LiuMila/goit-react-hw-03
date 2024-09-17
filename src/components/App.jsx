import { Component } from 'react'
import  Form  from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import shortid from "shortid";
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import './App.css';


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

    return <container>
      <section title='Phonebook'>
      <form onSubmit={ this.formSubmitHandler} />
      </section>
      <section title='Contacts'>
        <filter value={this.state.filter} changeFilter={this.changeFilter} />
        <contacts contacts={visibleContacts}
          deleteContact={ this.deleteContact} />
      </section>
    </container>
  }
}

export default App;

