import React, {Component} from 'react';
import InputField from '../InputField';
import { Button, Form } from 'react-bootstrap';

import { Validators } from '../library/Validators';

export default class AddCategory extends Component {

    state = {
        text: '',
        number: '',
        email: '',
        country: '',
        message: '',
        require: '',
        acceptance: false
    };

    handleChange = (key) => (value) => {
        this.setState({[key]: value});
    };


    render() {
        const {text, message, parentCategory } = this.state;

        return (
            <div className="container p-5">
                <h2>Add New Category</h2>
                <hr/>
                <Form>
                    <InputField
                        label='Category Name:*'
                        value={text}
                        type='text'
                        require='required'
                        placeholder='Enter Category Name'
                        validators={[
                            {check: Validators.required, message: 'This field is required'}
                        ]}
                        onChange={this.handleChange('text')}/>

                    <InputField
                        label='Select Parent Category (if applicable):'
                        data={[
                                {value: 1, label: 'Category 1'},
                                {value: 2, label: 'Category 2'},
                                {value: 3, label: 'Category 3'},
                                {value: 4, label: 'Category 4'},
                        ]}
                        value={parentCategory}
                        type='select'
                        placeholder='Select Parent Catergory'
                        onChange={this.handleChange('parentCategory')}
                    />

                    <InputField
                        label='Description:'
                        value={message}
                        type='textarea'
                        placeholder='Category Description'
                        validators={[
                            {check: Validators.required, message: 'This field is required'}
                        ]}
                        onChange={this.handleChange('message')}
                    />

                    
                    <div className='text-center mt-3'>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </div>
                </Form>

            </div>
        );
    }
}