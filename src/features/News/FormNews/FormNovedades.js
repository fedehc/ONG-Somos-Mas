import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Center, Heading } from '@chakra-ui/layout';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Select } from '@chakra-ui/select';




// validaciones
const formSchema = Yup.object().shape({
  title: Yup.string()
        .min(4,"Se requieren 4 caracteres como mínimo")
        .required("Requerido"),
  content: Yup.string()
        .required("Requerido"),
  category: Yup.string()
        .required("Requerido"),
  image: Yup.string()
        .required("Requerido")
});

// example object novedades
const object2 = {
  id:"1",
  title: "hola mundo",
  content: "<p> ejemplo de contenido </p>",
  category:"Eventos",
  image:""
}


const FormNovedades = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  const initialValues ={
    title: "",
    content: "",
    category:"",
    image:""
  };

  // categories
  useEffect(() => {
    axios.get("http://ongapi.alkemy.org/api/categories")
      .then((response) => {
        setResponse(response.data);
        console.log(response);
        setLoading(false);
      })
      .catch((error) =>{
        setError(error);
        setLoading(false);
      })
  }, [])
  
  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  
  
  return (
    <Center>
    <Formik
      initialValues={ isObjEmpty(object2) ? initialValues : object2}
      validationSchema={formSchema}
      onSubmit={(values) => {
        isObjEmpty(object2)
         ?(
            axios.post(`http://ongapi.alkemy.org/api/news`, { values })
              .then(res => {
                console.log(res);
                console.log(res.data);
              })
         )
         :(
            axios.put(`http://ongapi.alkemy.org/api/news/${object2.id}`, { values })
              .then(res => {
                console.log(res);
                console.log(res.data);
              })
         )
          console.log(values);
      }}
    >
      {(formik) => (
        <Form >
        <Heading m={4}>Formulario Novedades</Heading>
          <Field mt={5} className="input" name="title">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Titulo</FormLabel>
                <Input {...field} id="title" placeholder="Titulo" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field mt={5} className="input" name="content">
            {({ form }) => (
              <FormControl
                isInvalid={form.errors.content && form.touched.content}
              >
                <FormLabel htmlFor="content">Contenido</FormLabel>
                <CKEditor editor={ ClassicEditor }
                    data={formik.values.content}
                    onChange={ (e,editor) => {
                      const data = editor.getData();
                      formik.setFieldValue("content", data)
                    }} />
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field mt={5} className="input" name="category">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.category && form.touched.category}>
                <FormLabel htmlFor="category">Categoria</FormLabel>
                  {
                    !loading 
                     && ( error 
                     ? <Input value={error} isDisabled />
                     : <Select placeholder="elija una Categoria" {...field}>
                        {response.data.map(category => <option key={category.id}>{category.name}</option>)}
                       </Select>)}
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field mt={5} className="input" name="image">
            {({form }) => (
              <FormControl isInvalid={form.errors.image && form.touched.image}>
                <FormLabel htmlFor="image">Imagen</FormLabel>
                <Input id="image"
                  type="file"
                  onChange={ (event) => {
                    const files = event.target.files;
                    let myFiles = Array.from(files);
                    formik.setFieldValue("image", myFiles[0]);
                  }} />
                <FormErrorMessage>{form.errors.image}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt={4} width="100%" colorScheme="teal" type="submit">
           {isObjEmpty(object2) ? "Enviar" : "Guardar"}
          </Button>
        </Form>
      )}
    </Formik>
  </Center>
  );
}

export default FormNovedades;