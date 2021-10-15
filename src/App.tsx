// Scripts
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Item from '../src/components/Item/item'

// Styles
import { Wrapper, ButtonStyled } from './App.styles'

// Types 
export type CartItem = {
  id: number
  category: string
  description: string
  image: string
  price: string
  title: string
  amount: number
}


const getProducts = async (): Promise<CartItem[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}

const App = () => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItem[])

  const { data, isLoading, error } = useQuery<CartItem[]>('products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItem[]) => null
    // items.reduce((ack: number, item) => ack + item.amount, 0);
  
  const handleAddToCart = (clickedItem: CartItem) => null
  const handleRemoveToCart = () => null

  if (isLoading) return <LinearProgress />
  if (error) return <div>Algo deu errado.</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart Goes here
      </Drawer>
      <ButtonStyled onClick={()=> setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon/>
        </Badge>
      </ButtonStyled>

      <Grid container spacing={3}>
        {
          data?.map(item => {
            return (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            )
          })
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
