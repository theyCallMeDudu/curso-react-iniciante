import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import useApi from '../../utils/useApi';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();
    const [load, loadInfo] = useApi({
        // url: `http://localhost:5000/promotions/${id}`,
        url: `/promotions/${id}`,
        method: 'GET',
        onCompleted: (response) => {
            setValues(response.data);
        }
    });

    const [save, saveInfo] = useApi({
        url: id ? `http://localhost:5000/promotions/${id}` : 'http://localhost:5000/promotions',
        method: id ? 'put' : 'post',
        data: values,
        onCompleted: (response) => {
            console.log(response);
            if (!response.error) {
                navigate('/');
            }
        }
    });

    useEffect(() => {
        if (id) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function onChange(event) {
        const { name, value } = event.target;
        
        setValues({ ...values, [name]: value });
    }

    function onSubmit(event) {
        event.preventDefault();
        save();
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
                        {saveInfo.loading && <span>Salvando dados...</span>}
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