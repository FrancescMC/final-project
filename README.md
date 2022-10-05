# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance.

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web.

## Important

This app is not setUp to be deployed to a production environment like vercel or netlify.

## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Planning

    ### Martes 4/10 (day 1):

        La idea sería decidir el diseño hoy. Voy a intentar ponerle estilo a las páginas sign in y signup para  poder hacerme una idea de como quede todo en general.
        He decidido más o menos como va a ser la web estéticamente.
        La web va a tener modo claro y modo oscuro y va a ser responsive con tres tamaños, mobile, tablet y    desktop.
        Empezaré haciendo el modo claro, ya que puede tener más colores que el oscuro.
        Empezaré por mobile.
        Han quedado hechos el SignIn y el SignUp en modo claro de mobile.
    # Miércoles 5/10 (day 2):

        Crear parte tablet y desktop.
        Que se puedan crear todos
        Resultado:
        Puedo ver las tasks en pantalla y les he añadido un poco de estilo.
    #Jueves 6/10 (day 3):
        Poder crear TO-DOs
        Acabar la parte estética de las cartas.
        Empezar un navbar donde aparezca si estamos logueados, posibilidad de desloguearse y login

### Links:

    ### Palette

    https://coolors.co/01161e-124559-598392-aec3b0-eff6e0 winner

    https://mycolor.space/?hex=%23311D4E&sub=1

    ### Font style

    https://fonts.google.com/specimen/Manrope?category=Sans+Serif&preview.text=No%20s%C3%A9%20qu%C3%A9%20tipo%20de%20letra%20quiero,%20a%20ver%20como%20quedan%20escritas%20varias%20l%C3%ADneas,%20con%20palabras%20con%20t%C3%ADldes,%20en%20catal%C3%A1n%20Con%20May%C3%BAsculas,%20etc.&preview.text_type=custom
