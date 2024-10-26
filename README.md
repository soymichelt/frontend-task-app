# Buddy Frontend Project - Developed by [SoymichelDev](https://www.linkedin.com/in/soymichelt)

Este repositorio de GitHub contiene el Frontend de un proyecto de una aplicación de gestión de tareas, el cúal he nombrado como **Buddy***. Esta es una herramienta sencilla, eficiente y fácil de usar diseñada para ayudar a usuarios a organizar su flujo de trabajo de manera efectiva. Los usuarios pueden registrarse e iniciar sesión para acceder a su panel personal, donde pueden crear, editar y eliminar tareas según sus necesidades.

Cada tarea cuenta con una descripción y puede ser asignada a diferentes estados, como "Por Hacer", "En Proceso", "Testeando", "Congelada" y "Completada", facilitando el seguimiento del progreso de cada una. La interfaz es intuitiva, lo que permite a los usuarios gestionar sus tareas de manera rápida y sin complicaciones, optimizando su tiempo y productividad.

# Arquitectura de la aplicación

![image](https://github.com/user-attachments/assets/7f04045e-05b5-458c-a87b-8108a8f6a537)


# Instrucciones de Uso

## Setup

Para inicializar el proyecto, primero será necesario clonar el repositorio de GitHub. Esto es algo que podemos lograr con el comando:

```bash
$ git clone git@github.com:soymichelt/frontend-task-app.git
```

Una vez descargado se debe abrir una consola y posicionarla dentro de la carpeta del repositorio que acabamos de clonar. Una vez ahí ejecutamos el siguiente comando:

```bash
$ npm install
```

Ya todo está listo para usar la aplicación en modo desarrollo o localhost. Para esto se debe utilizar otro comando npm:

```bash
$ npm run start
```

> NOTA: es importante tener en cuenta que para ejecutar correctamente la aplicación web con Angular se requiere de la configuración de un proyecto de Firebase y la URL en donde se encuentra el Backend en ejecución. El Backend podrás encontrarlo en `https://github.com/soymichelt/backend-task-app`. Ambas cosas deberás configurarlas en el archivo `https://github.com/soymichelt/frontend-task-app/blob/main/src/app/environments/environment.ts`.

## Build

Para llevar el proyecto a un servidor o a la nube se debe empaquetar la aplicación. Esto se logra con el comando:

```bash
$ npm run build
```

Notarás que una vez que finalice la ejecución de este script de npm, se creará una carpeta en la raíz del proyecto nombrada `/dist`. Dentro de dicha carpeta habrá otra, con el nombre del proyecto, es esta última la que deberás publicar en tu servicio para exponerla al público.

## Running unit tests

Para la ejecución de tests unitarios el proyecto utiliza Jasmine y [Karma](https://karma-runner.github.io). En modo local podrás ejecutar el comando siguiente para lanzar el runner de tests y vez el resultado de las pruebas:

```bash
$ npm run test
```

Podrás notar que al ejecutar el comando, se abre una ventana de un navegador en donde se muestran los resultados. Esto es algo útil porque tienes mucha información en tiempo real conforme vayas añadiendo testing. 

# CI / CD

## Deploy

Este proyecto actualmente tiene una configuración de Firebase Hosting para alojar la aplicación, debido a esto es posible realizar despliegues a dicho servicio.
Este proyecto actualmente tiene una configuración de Firebase Hosting por lo que es posible realizar despliegues. Pero, previamente deberás solicitar acceso al proyecto de Firebase. Sí ya lo tienes se deben seguir los siguientes pasos:

1. Firebase Tools

Primero se debe instalar la herramienta Firebase Tools globalmente. Para ello ejecuta el siguiente comando de npm:

```bash
$ npm install -g firebase-tools
```

2. Loguear en Firebase localmente

Ahora se debe loguear localmente en Firebase para poder ejecutar operaciones con el proyecto de Firebase, como lo será la realización de despliegues en Firebase Hosting. Ejecuta el comando:

```bash
$ firebase login
```

Este comando abrirá una ventana interactiva en la que se debe inicar sesión con una cuenta que tenga acceso al proyecto de Firebase que está configurado.

3. Despliegue

Una vez configurado Firebase localmente puede realizar el siguiente comando para desplegar la aplicación:

```bash
$ firebase deploy --only hosting
```

También, es posible ejecutar el siguiente script:

```bash
$ npm run deploy
```

## Pipeline CI/CD

Este proyecto cuenta con la configuración de un workflow de **GitHub Action**. Este es un pipeline de CI/CD el cuál se ejecuta cada vez que se suben cambios a la rama `main`. El pipeline ejecuta una serie de pasos, dentro de los cuáles se lanza el linter y los tests. Sí se encuentra un error se notifica al desarrollador por correo electrónico. Sí todo sale bien se despliega la aplicación de Angular en Firebase Hosting.

# Contacto

Añado información de contacto, para cualquier duda o información:

- [mtraatabladaa94@gmail.com](mailto:mtraatabladaa94@gmail.com)
- [https://soymichel.dev](https://soymichel.dev)
- [LinkedIn](https://www.linkedin.com/in/soymichelt)

![Foto de Perfil](https://github.com/soymichelt/CV/blob/master/public/res/circleProfile64x64.png)
