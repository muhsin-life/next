import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta
          name="description"
          content="Life Pharmacy is a trusted UAE online pharmacy. Order prescription/OTC medicines online. Explore a wide range of vitamins, medicines, beauty brands, baby care products, and sports supplements. Delivery in 30 minutes, Order Now!"
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        
        /><link data-n-head="ssr" as="font" media="all" type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Poppins:300,400,500,600,700 display=swap"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
