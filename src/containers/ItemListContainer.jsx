import React, { useEffect, useState } from "react";
import "../styles/itemListContainer.scss";
import ItemList from "../components/itemList";
import Loading from "../components/loading";
import { useParams } from "react-router-dom";
const ItemListContainer = ({ greeting,title }) => {

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      fetch(
        categoryId
          ? `https://my-json-server.typicode.com/matidsc/SampleJSONPlaceholder/Productos?categoria=${categoryId}`
          : `https://my-json-server.typicode.com/matidsc/SampleJSONPlaceholder/Productos?destacado=true`//La página de inicio muestra las GPUs por defecto
      )
        .then((data) => data.json())
        .then((items) => setProductos(items));
      setIsLoading(false);
    }, 2000);
  }, [categoryId]);

  return (
    <div>
      <section className="itemListContainer">
        <h1 className="greeting">{categoryId ? categoryId : greeting}</h1>
        {isLoading ? <Loading /> : <ItemList productos={productos} />}
      </section>
    </div>
  );
};

export default ItemListContainer;
