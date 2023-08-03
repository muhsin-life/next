import { useDispatch, useSelector } from 'react-redux';
import createCartPOSTReq from '@/lib/createCart';
import { updateCartData } from '@/redux/cart.slice';
import { RootState } from '../redux/store';
import updateCartApiReq from '@/lib/updateCart';

export function useCartActions() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart);
    const cartItemsData = cartItems.cart.cart_data ? cartItems.cart.cart_data.items : []
    const cartId = cartItems.cart.cart_data ? cartItems.cart.cart_data.cart_id : null

    const createCart = (payloadData: any) => {
        debugger
        // console.log(cartItems);

        // const itemExists = cartItemsData.find((item: any) => item.id === payloadData.data.items[0].id);
        if (cartItemsData.length > 0) {
            updateCart(payloadData)
        }
        else {
            createCartPOSTReq(payloadData).then((res) => {
                debugger

                dispatch(updateCartData(res));

            });
        }

    };


    const updateCart = (payloadData: any) => {
        payloadData.action = "update_items"
        debugger
        updateCartApiReq(payloadData, cartId).then((res) => {
            debugger

            dispatch(updateCartData(res));

            // localStorage.setItem('life-store', JSON.stringify({ cart: res.data }));
        });
    };

    return {
        createCart,
        updateCart
    };
}