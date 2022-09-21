import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Handbag } from "phosphor-react";

import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectTotalItems, toggleCartVisibility } from "../store/cartSlice";

import { CartButton, HeaderContainer } from "../styles/components/header";
import logoImg from "../assets/logo.svg";

export const Header = () => {
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectTotalItems);

  const noCart = pathname.includes("/success");

  const handleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  }

  return (
    <HeaderContainer noCart={noCart}>
      <Link href="/">
        <a>
          <Image src={logoImg} alt="" />
        </a>
      </Link>
      <CartButton onClick={handleCartVisibility}>
        <Handbag size={24} weight="bold"/>
        {cartItems > 0 && (
          <span>{cartItems}</span>
        )}
      </CartButton>
    </HeaderContainer>
  )
}