import {cn} from "@bem-react/classname";
import {Box} from "@mui/material";

interface ProductsProps {

}

const cnProducts = cn('Products')
const Products = (props:ProductsProps) => {
  return (
    <Box className={cnProducts()}>
      Products
    </Box>
  );
};

export {Products};