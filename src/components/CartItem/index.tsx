// Scripts
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import Button from '@material-ui/core/Button'

// Styles
import { Wrapper } from './cartItem.styles'
import { CartItemProps } from '../../App'

type Props = {
  item: CartItemProps;
  addToCart: (clickedItem: CartItemProps) => void
  removeFromCart: (id: number) => void
}


const Cart: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: $:{item.price}</p>
          <p>Total: $:{(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <button
            onClick={() => removeFromCart(item.id)}
          > - </button>

          <p>{item.amount}</p>

          <button
            onClick={() => addToCart(item)}
          > + </button>

        </div>
      </div>

      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
}

export default Cart;
