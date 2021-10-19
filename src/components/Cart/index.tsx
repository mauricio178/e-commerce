/* eslint-disable @typescript-eslint/no-unused-expressions */
// Components
import Button from '@material-ui/core/Button'

// Styles
import { Wrapper } from './cart.styles'

//Types
import { CartItemProps } from '../../App'
import CartItem from '../CartItem'

type Props = {
  cartItems: CartItemProps[];
  addToCart: (clickedItem: CartItemProps) => void
  removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {

  const calculateTotal = (items: CartItemProps[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>

      {
        cartItems.length === 0 ?
          <p>No items on cart.</p>
          :
          <>
          {cartItems.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
          </>
      }

      <h2>Total: $:{calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
}

export default Cart;
