import React from "react";
import PromotionCard from "../Card/Card";
import './List.css';

const PromotionList = ({ loading, promotions, error }) => {
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
                <PromotionCard promotion={promotion} />
            ))}
        </div>
    )
}

export default PromotionList;