import axios from "axios";
import Image from "next/future/image";
import { X } from "phosphor-react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { 
  removeFromCart,
  selectIsCartVisible, 
  selectItems, 
  selectTotalItems, 
  selectTotalPrice, 
  toggleCartVisibility
} from "../store/cartSlice";
import { 
  CartContainer, 
  CloseCart, 
  FooterContainer, 
  ImageContainer, 
  ItemContainer 
} from "../styles/components/cart";
import { priceFormatter } from "../utils/formatter";

export const Cart = () => {
  const isCartVisible = useAppSelector(selectIsCartVisible);
  const cartItems = useAppSelector(selectItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  const handleCloseCart = () => {
    dispatch(toggleCartVisibility());
  }

  const handleRemoveItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  }

  const handleCheckout = async () => {
    const itemsForCheckout = cartItems.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity,
      }
    });

    try {
      const response = await axios.post("/api/checkout", {
        items: itemsForCheckout,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // conectar a uma ferramenta de observabilidade
      console.error("Falha ao redirecionar para o checkout.");
    }
  }
  
  if (!isCartVisible) {
    return null;
  }

  return (
    <CartContainer>
      <CloseCart onClick={handleCloseCart}>
        <X size={24} weight="bold" />
      </CloseCart>
      <h1>Sacola de compras</h1>
      <div>
        {cartItems.map((item) => {
          return (
            <ItemContainer key={item.id}>
              <ImageContainer>
                <Image 
                  src={item.imageUrl} 
                  alt="" 
                  width={90}
                  height={90}
                />
              </ImageContainer>
              <div>
                <p>{item.name}</p>
                <strong>{priceFormatter(item.price / 100)}</strong>
                <button onClick={() => handleRemoveItemFromCart(item.id)}>
                  Remover
                </button>
              </div>
            </ItemContainer>
          );
        })}
      </div>
      <FooterContainer>
        <div>
          <p>Quantidade</p>
          <p>{totalItems === 1 ? `${totalItems} item` : `${totalItems} itens`}</p>
        </div>
        <div>
          <strong>Valor total</strong>
          <span>{priceFormatter(totalPrice / 100)}</span>
        </div>
        <button onClick={handleCheckout} disabled={totalItems <= 0}>
          {totalItems > 0 ? "Finalizar compra" : "Sem itens no carrinho"}
        </button>
      </FooterContainer>
    </CartContainer>
  )
}