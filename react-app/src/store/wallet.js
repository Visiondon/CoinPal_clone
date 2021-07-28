//constants
const SET_WALLET = 'session/SET_WALLET'
const REMOVE_WALLET = 'session/REMOVE_WALLET'
const UPDATE_WALLET = 'session/UPDATE_WALLET'

//same as user id
const setWallet = (userWallet) => ({
    type: SET_WALLET,
    payload: userWallet
})

const removeWallet = () => ({
    type: REMOVE_WALLET
})

const updateWallet = (userWallet) => ({
    type: UPDATE_WALLET,
    payload: userWallet
})

const initialState = { wallet: null }

export const getWallet = (userId) => async (dispatch) => {
    const response = await fetch(`/api/wallet/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        const data = await response.json();
        if(data.errors){
            return;
        }
        dispatch(setWallet(data))
    }
}

export const reNewWallet = (userId, Balance) => async (dispatch) => {

    const [bitcoinBalance, ethereumBalance, usdCoinBalance] = Balance

    const response = await fetch(`/api/wallet${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bitcoinBalance,
            ethereumBalance,
            usdCoinBalance
        })
    });

    if (response.ok){
        const data = await response.json();
        dispatch(updateWallet())
        if(data.errors) {
            return data.errors
        }
    } else if (response.status < 500){
        const data = await response.json();
        if(data.errors){
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again']
    }
}

export const dropWallet = () => async (dispatch) => {
    const response = await fetch('/api/wallet', {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok){
        dispatch(removeWallet())
    }
}


export default function reducer(state= initialState, action){
    switch (action.type){
        case SET_WALLET:
            const wallet = {}
            return {wallet: action.payload}
        case REMOVE_WALLET:
            return {wallet: null}
        case UPDATE_WALLET:
            return {wallet: action.payload}
        default:
            return state
    }
}