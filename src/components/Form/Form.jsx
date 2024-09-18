import PropTypes from 'prop-types'
import { Component } from "react"
import shortid from "shortid";
import { Input, Label, FormContainer, Button } from "./Form.style";

class Form extends Component{
state = {
    name: '',
    number: ''
}

    nameInputId = shortid.generate()
    telInputId = shortid.generate()

 static propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

handleChange = e => {
    const { name, value} = e.currentTarget
    console.log(e.currentTarget.value)
    this.setState({ [name]: value })
}
    
handleSubmit = e => {
    e.preventDefault();
         
    this.props.onSubmit(this.state)

    this.reset()
}   
    
reset = () => {
    this.setState({
    name: '',
    number: ''})
    }

    render() {
           return (
        <FormContainer onSubmit={this.handleSubmit}>
            <Label htmlFor={this.nameInputId}> Name
            <Input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={this.state.name}
                onChange={this.handleChange}
                id={this.nameInputId}           />

                </Label>
                <Label htmlFor={this.telInputId}>
                    Number
            <Input
                type="tel"
                name="number"
               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={this.state.number}
                onChange={this.handleChange}
               id={this.telInputId } />
                </Label>
            <Button type="submit">Add contact</Button>
     </FormContainer>
)}
}


export default Form;