import getSingleProductData from "@/lib/getSingleProductData"
import SingleProductsContent from "@/components/single-product-page"

const SingleProductPage = ({ singleProductData, relatedProductsData }: { singleProductData: any, relatedProductsData: any }) => {

    return (
        <SingleProductsContent pro_data={singleProductData} relatedProductsData={relatedProductsData} />
    )
}

export default SingleProductPage

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: "blocking",
    };
}

export async function getStaticProps({ locale, params }: { locale: any, params: any }) {
    const singleProductData = await getSingleProductData(locale, params.singleProduct);
    return {
        props: {
            singleProductData: singleProductData.data.product,
            relatedProductsData:singleProductData.data.related_products
        },
    };
}