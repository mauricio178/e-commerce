// Scripts
import {useState} from 'react'
import {useQuery} from 'react-query'

// Components
import Button from '@material-ui/core/Button'


// Styles
import {Wrapper} from '../Item/item.styles'

//Types
import { CartItem } from '../../App'

type Props = {
    item: CartItem;
    handleAddToCart: (clickedItem: CartItem) => void
}


const Item: React.FC<Props> = ({item, handleAddToCart}) => {


  return (
    <Wrapper>
     <img src={item.image} alt={item.title}/>
     <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <h3> R{item.price}</h3>
     </div>

     <Button onClick={() => handleAddToCart(item)}>
         Add To CArt
     </Button>
    </Wrapper>
  );
}

export default Item;
