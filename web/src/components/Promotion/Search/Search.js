import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';
import PromotionList from '../List/List';
import useApi from '../../utils/useApi';

const PromotionSearch = () => {
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({
        url: 'http://localhost:5000/promotions',
        // url: '/promotions',
        method: 'GET',
        params: {
            _embed: 'comments',
            _order: 'desc',
            _sort: 'id',
            title_like: search || undefined,
        },
        // onCompleted: (response) => {
        //     setPromotions(response.data);
        // }
    });

    useEffect(() => {
        load();
    }, [search]);

    return (
        <div className='promotion-search'>
            <header className='promotion-search__header'>
                <h1>Promo Show</h1>
                <Link to='/create'>Nova Promoção</Link>
            </header>
            <input 
                type='search' 
                className='promotion-search__input'
                placeholder='Buscar'
                value={search}
                onChange={(evento) => setSearch(evento.target.value)} />
                <PromotionList 
                    promotions={loadInfo.data} 
                    loading={loadInfo.loading}
                    error={loadInfo.error} 
                />
            
        </div>
    );
};

export default PromotionSearch;