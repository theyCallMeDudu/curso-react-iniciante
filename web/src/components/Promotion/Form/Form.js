import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import axios from 'axios';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/promotions/${id}`)
                .then((response) => {
                    setValues(response.data);
            });
        }
    }, []);

    function onChange(event) {
        const { name, value } = event.target;
        
        setValues({ ...values, [name]: value });
    }

    function onSubmit(event) {
        event.preventDefault();

        const method = id ? 'put' : 'post';

        axios[method](`http://localhost:5000/promotions${id ? `/${id}` : ''}`, values)
            .then((response) => {
                navigate('/');
            })
    }

    return (
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>

            {!values
                ? (
                    <div>Carregando...</div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className='promotion-form__group'>
                            <label htmlFor='title'>Título</label>
                            <input id='title' name='title' type='text' onChange={onChange} value={values.title} />
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor='url'>Link</label>
                            <input id='url' name='url' type='text' onChange={onChange} value={values.url} />
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor='imageUrl'>Image (URL)</label>
                            <input id='imageUrl' name='imageUrl' type='text' onChange={onChange} value={values.imageUrl} />
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor='price'>Preço</label>
                            <input id='price' name='price' type='number' onChange={onChange} value={values.price} />
                        </div>
                        <div>
                            <button type='submit'>Salvar</button>
                        </div>
                    </form>
                )}

        </div>
    );
};

export default PromotionForm;