import React, { useState } from "react";
import PromotionCard from "../Card/Card";
import PromotionModal from '../Modal/Modal';
import './List.css';

const PromotionList = ({ loading, promotions, error }) => {
    const [promotionId, setPromotionId] = useState(null);

    if (error) {
        return <div>Ops, ocorreu um erro!</div>
    }
    
    if (loading || promotions === null) {
        return <div>Carregando...</div>
    }
    
    if (promotions.length === 0) {
        return <div>Nenhum resultado encontrado.</div>
    }

    return (
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard 
                    promotion={promotion} 
                    onClickComments={() => setPromotionId(promotion.id)} 
                />
            ))}
            {promotionId && (
                <PromotionModal 
                    promotionId={promotionId}
                    onClickClose={() => setPromotionId(null)} />
            )}
        </div>
    )
}

export default PromotionList;