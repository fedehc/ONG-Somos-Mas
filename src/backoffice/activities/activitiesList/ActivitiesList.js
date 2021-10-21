import React from "react";
import "./activitiesList.scss";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const ActivitiesList = () => {
  let actividades = [
    {
      name: "feria",
      image:
        "https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg",
      createdAt: "14-06-21",
    },
    {
      name: "merendero",
      image:
        "https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg",
      createdAt: "14-08-21",
    },
    {
      name: "donaciones",
      image:
        "https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg",
      createdAt: "20-06-21",
    },
    {
      name: "misa",
      image:
        "https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg",
      createdAt: "14-05-21",
    },
  ];

  return (
    <div className="activityList">
      <div className="header">
        <p>Lista de actividades</p>
        <Link className="link-button" to="/backoffice/activities/create">
          <Button colorScheme="blue">Crear Actividad</Button>
        </Link>
      </div>
      <Table variant="simple" size="sm" className="table">
        <TableCaption>Actividades actuales</TableCaption>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Foto de descripción</Th>
            <Th>Fecha de creación</Th>
            <Th className="acciones">Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {actividades.length > 0
            ? actividades.map((activity) => (
                <Tr>
                  <Td>{activity.name}</Td>
                  <Td>
                    <img
                      className="activityPhoto"
                      src={activity.image}
                      alt=""
                    />
                  </Td>
                  <Td>{activity.createdAt}</Td>

                  <Td className="buttonField">
                    <Button
                      className="EditButton"
                      colorScheme="yellow"
                      variant="solid"
                    >
                      Editar
                    </Button>

                    <Button colorScheme="red" variant="solid">
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))
            : "no se encontaron actividades"}
        </Tbody>
      </Table>
    </div>
  );
};

export default ActivitiesList;