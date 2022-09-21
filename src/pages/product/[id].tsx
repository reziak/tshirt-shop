import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/future/image";
import Stripe from "stripe";

import { stripe } from "../../lib/stripe";
import { 
  ImageContainer, 
  ProductContainer, 
  ProductDetails 
} from "../../styles/pages/product";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { addToCart, selectIsItemInCart } from "../../store/cartSlice";
import { priceFormatter } from "../../utils/formatter";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    priceFormatted: string;
    defaultPriceId: string;
  };
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const isItemInCart = useAppSelector(
    (state) => selectIsItemInCart(state, product.id)
  );

  const dispatch = useAppDispatch();

  console.log(isItemInCart);

  const handleAddToCart = () => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      defaultPriceId: product.defaultPriceId,
    }
    dispatch(addToCart(newProduct))
  }

  const pageTitle = `${product.name} | Ignite shop`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>
          <p>{product.description}</p>

          <button onClick={handleAddToCart} disabled={isItemInCart} >
            {isItemInCart ? "Produto no carrinho" : "Colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const id = params?.id;

  const product = await stripe.products.retrieve(id as string, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount,
        priceFormatted: priceFormatter(price.unit_amount! / 100),
        defaultPriceId: price.id,
      },
    },
    revalidate: 3600,
  }
};
