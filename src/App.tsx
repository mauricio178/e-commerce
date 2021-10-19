// Scripts
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Item from './components/Item'
import Cart from '../src/components/Cart/index'

// Styles
import { Wrapper, ButtonStyled } from './App.styles'

// Types 
export type CartItemProps = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}


const getProducts = async (): Promise<CartItemProps[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}

const App = () => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemProps[])

  const { data, isLoading, error } = useQuery<CartItemProps[]>('products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItemProps[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemProps) => {
    setCartItems(oldValue => {

      // 1. verify if the item is already in the cart
      const isItemInCart = oldValue.find((item: any) => item.id === clickedItem.id)

      if (isItemInCart) {
        return (
          oldValue.map((item: any) => (
            item.id === clickedItem.id ?
              { ...item, amount: item.amount + 1 }
              :
              item
          ))
        )
      }
      return [ ...oldValue, {...clickedItem, amount: 1}]
    })
  }

  const handleRemoveToCart = (id: number) => {
    setCartItems(oldValue => (
      oldValue.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;

          return [...ack, {...item, amount: item.amount -1}]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemProps[])
    ))
  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Algo deu errado.</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveToCart} />
      </Drawer>
      <ButtonStyled onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
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
