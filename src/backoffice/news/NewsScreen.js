import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Link } from "@chakra-ui/react";
// import { AiTwotoneEdit, AiOutlineClose } from "react-icons/ai";
import "./NewsScreen.css";
import { getNews } from "../../services/apiNews";


const NewsScreen = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getNews();
        setNewsList(results.data.data);
      }
      catch(error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Link href={process.env.REACT_APP_ENDPOINT_NEWS_CREATE}>
        <Button colorScheme="teal">Crear novedad</Button>
      </Link>

      <div className="container">
        <Table size="lg" variant="striped" colorScheme="teal">
          <Thead>
            <Tr className="trTop">
              <Th>Nombre</Th>
              <Th>Imagen</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsList.length > 0
              ? newsList.map((news) => (
                  <Tr key={news.id}>
                    <Td>{news.name}</Td>
                    <Td>
                      <img className="profilePhoto" src={news.image} alt="" />
                    </Td>
                    <Td>{news.created_at}</Td>
                    <Td className="buttonField">
                      <Link href={process.env.REACT_APP_ENDPOINT_NEWS_EDIT + news.id}>
                        <Button className="EditButton"
                                colorScheme="yellow"
                                variant="solid">Editar</Button>
                      </Link>
                      <Link href={process.env.REACT_APP_ENDPOINT_NEWS_DELETE + news.id}>
                        <Button colorScheme="red"
                                variant="solid">Eliminar</Button>
                      </Link>
                    </Td>
                  </Tr>
                ))
              : <Tr>
                  <Td colSpan={4}>No se encontraron noticias.</Td>
                </Tr>
            }
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default NewsScreen;