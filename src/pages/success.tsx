import { GetServerSideProps, NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    imageUrl: string;
  }[];
}

const Success: NextPage<SuccessProps> = ({ customerName, products }) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <div>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={120} alt="" />
            </ImageContainer>
          ))}
        </div>

        <h1>Compra efetuada!</h1>
      
        <p>
          Uhull <strong>{customerName}</strong>, sua compra já está a caminho da sua casa.
        </p>
        
        <Link href="/">
          <a>Voltar ao catálogo</a>
        </Link>
      </SuccessContainer>
    </>
  )
}

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });


  const customerName = session.customer_details?.name;

  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      id: item.id,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
