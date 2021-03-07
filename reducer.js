import { Alert, ToastAndroid } from "react-native";

import {
    ACTION_TYPE_TOAST_ADD,
    ACTION_TYPE_TOAST_DELETE,
    ACTION_TYPE_TOAST_CHANGE_DURATION,
} from "./types";

import { AddToast } from "./actions";


const showToastMessage = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

// Начальный state
export const initialState = {
    // Данные модального окна

    toasts: new Map(), // Тосты
    cartItems: new Map(), // Корзина
    cartTotalPrice: 0, // Итоговая цена для корзины
    orders: new Map(), // Список заказов
}

   
/**
 * Редюсер
 * @param  {object} state - объект state
 * @param  {object} action - объект action
 * @returns {object}
 */
export const reducer = (state, action) => {
    /**
     * Проверяет тип действия
     */
    switch (action.type) {

        /**
         * Добавляет новый Toast
         */
        case ACTION_TYPE_TOAST_ADD: {
            const newState = {...state};
            const { payload, id } = action;

            if ( payload ) {
                payload.id = id || uuidv4();
                newState.toasts.set(payload.id, payload);
                return newState;
            }
            return state;
        }

        /**
         * Удаляет Toast
         */
        case ACTION_TYPE_TOAST_DELETE: {
            const newState = {...state};
            const { id } = action;
            
            if ( id ) {
                newState.toasts.delete(id)
                return newState;
            }
            return state;
        }
        
        /**
         * Изменяет длительность Toast
         */
        case ACTION_TYPE_TOAST_CHANGE_DURATION: {
            const newState = {...state};
            const { id, duration } = action;
            
            if ( id && duration ) {
                const toast = newState.toasts.get(id);
                toast.duration = duration;
                newState.toast.set(id, toast);
                return newState;
            }
            return state;
        }

        default:
            return state;
    }
};
