import React, { useEffect, useState } from "react";
import UIModal from "../../UI/Modal/Modal";
import useApi from '../../utils/useApi';
import PromotionModalCommentsTree from './CommentsTree/CommentsTree';
import './Modal.css';

const PromotionModal = ({ promotionId, onClickClose }) => {
    const [comment, setComment] = useState('');
    
    const [load, loadInfo] = useApi({
        url: '/comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'POST',
    });

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(evento) {
        evento.preventDefault();
        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load({ quietly: true });
        } catch (error) {}
    }

    async function sendAnswer(text, parentId) {
        await sendComment({
            data: {
                userId: 1,
                promotionId,
                comment: text,
                parentId
            },
        });
        load({ quietly: true });
    }

    return (
        <UIModal 
            isOpen onClickClose={onClickClose}>
            <h1>Comentários</h1>
            <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
                <textarea 
                    placeholder="Comentar..." 
                    onChange={(evento) => setComment(evento.target.value)} 
                    value={comment} 
                    disabled={sendCommentInfo.loading}
                />
                <button type="submit">
                    {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            <PromotionModalCommentsTree 
                comments={loadInfo.data} 
                sendComment={sendAnswer}
            />
        </UIModal>
    );
}

export default PromotionModal;