import React, {FC, Fragment, useMemo} from 'react';
import {Icons, Link} from '@my-app/ui';

import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {useRoute} from '@react-navigation/native';
import {Image} from '@my-app/ui';
import {View, Text, StyleSheet} from 'react-native';

type SubCategorySelectorProps = {
  categories:any
}

export const SubCategorySelector: FC<BlockComponent<SubCategorySelectorProps>> = ({props}) => {
  const {params} = useRoute();
 
  if (!params?.department) return;

  const render = useMemo(
    () =>
    props?.categories[params?.department]?.map(item => {
        return (
          <Fragment key={item?.href}>
            <Link href={item?.href} style={defaultStyles.text}>
              <View style={defaultStyles.container}>
                <Image
                  src={item?.value}
                  width={48}
                  height={48}
                  resizeMode={'contain'}
                />
                <Text style={defaultStyles.text}>{item?.text}</Text>
              </View>
            </Link>
          </Fragment>
        );
      }),
    [params?.department],
  );

  return render;
};

const defaultStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    width: 80,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: '#390052',
    justifyContent:"center",
    textAlign: 'center',
  },
});

// const cuidadoDelCabello = [
//   {
//     text: 'Accesorios Cabello',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/accesorios-cabello.png',
//     href: '/product-list/cuidado-del-cabello/accesorios-cabello',
//   },
//   {
//     text: 'Acondicionador',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/acondicionador.png',
//     href: '/product-list/cuidado-del-cabello/acondicionador',
//   },
//   {
//     text: 'Cepillos y Peines',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/cepillo-peine.png',
//     href: '/product-list/cuidado-del-cabello/cepillos-y-peines',
//   },
//   {
//     text: 'Color',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/color.png',
//     href: '/product-list/cuidado-del-cabello/color',
//   },
//   {
//     text: 'Extensiones',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/extensiones.png',
//     href: '/product-list/cuidado-del-cabello/extensiones',
//   },
//   {
//     text: 'Keratinas y Aminoacidos',
//     value:
//       'https://moradoapp.vteximg.com.br/arquivos/keratinas-y-aminoacidos.png',
//     href: '/product-list/cuidado-del-cabello/keratinas-y-aminoacidos',
//   },
//   {
//     text: 'Moldeado y Peinado',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/moldeado-peinado.png',
//     href: '/product-list/cuidado-del-cabello/moldeado-peinado',
//   },
//   {
//     text: 'Shampoo',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/shampoo.png',
//     href: '/product-list/cuidado-del-cabello/shampoo',
//   },
//   {
//     text: 'Tratamiento',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/tratamiento.png',
//     href: '/product-list/cuidado-del-cabello/tratamiento',
//   },
// ];

// const unas = [
//   {
//     text: 'Aceite de uñas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/aceite-unas.png',
//     href: '/product-list/unas/aceite-de-unas',
//   },
//   {
//     text: 'Acrilicos',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/acrilicos.png',
//     href: '/product-list/unas/acrilicos',
//   },
//   {
//     text: 'Algodones',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/algodon.png',
//     href: '/product-list/unas/Algodones',
//   },
//   {
//     text: 'Bases',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/bases.png',
//     href: '/product-list/unas/Bases-Unas',
//   },
//   {
//     text: 'Brillos Uñas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/brillos.png',
//     href: '/product-list/unas/brillos-unas',
//   },
//   {
//     text: 'Desengrasantes',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/desengrasantes.png',
//     href: '/product-list/unas/desengrasantes',
//   },
//   {
//     text: 'Dilusores',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/dilusores.png',
//     href: '/product-list/unas/dilusores',
//   },
//   {
//     text: 'Esmalte Tradicional',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/esmalte-tradicional.png',
//     href: '/product-list/unas/esmalte-tradicional',
//   },
//   {
//     text: 'Esmalte Semipermanente',
//     value:
//       'https://moradoapp.vteximg.com.br/arquivos/esmalte-semi-permanente.png',
//     href: '/product-list/unas/esmalte-semi-permanente',
//   },
//   {
//     text: 'Cremas y Exfoliantes Uñas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/exfoliante-unas.png',
//     href: '/product-list/unas/cremas-y-exfoliantes-unas',
//   },
//   {
//     text: 'Herramientas y Limas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/herramientas.png',
//     href: '/product-list/unas/herramientas-y-limas',
//   },
//   {
//     text: 'Kits Uñas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/kit-unas.png',
//     href: '/product-list/unas/kits-unas',
//   },
//   {
//     text: 'Removedores',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/removedor.png',
//     href: '/product-list/unas/removedores',
//   },
//   {
//     text: 'Tratamiento Uñas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/tratamiento-unas.png',
//     href: '/product-list/unas/tratamiento-unas',
//   },
// ];

// const corporal = [
//   {
//     text: 'Accesorios Corporales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/accesorios.png',
//     href: '/product-list/corporal/accesorios-corporales',
//   },
//   {
//     text: 'Aparatologia Estetica',
//     value:
//       'https://moradoapp.vteximg.com.br/arquivos/aparatologia-estetica.png',
//     href: '/product-list/corporal/aparatologia-estetica',
//   },
//   {
//     text: 'Depilación',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/depilacion.png',
//     href: '/product-list/corporal/depilacion',
//   },
//   {
//     text: 'Exfoliación Corporal',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/exfoliacion.png',
//     href: '/product-list/corporal/exfoliacion-corporal',
//   },
//   {
//     text: 'Hidratacion Corporal',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/hidratacion.png',
//     href: '/product-list/corporal/hidratacion-corporal',
//   },
//   {
//     text: 'Limpieza Corporal',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/limpieza.png',
//     href: '/product-list/corporal/limpieza-corporal',
//   },
//   {
//     text: 'Masajes Corporales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/masajes.png',
//     href: '/product-list/corporal/masajes-corporales',
//   },
//   {
//     text: 'Protección Solar y Bronceo',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/proteccion-solar.png',
//     href: '/product-list/corporal/proteccion-solar-y-bronceo',
//   },
// ];

// const barberia = [
//   {
//     text: 'Barba',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/barba.png',
//     href: '/product-list/barberia/barba',
//   },
//   {
//     text: 'Cabello Hombre',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/cabello.png',
//     href: '/product-list/barberia/Cabello-Hombre',
//   },
//   {
//     text: 'Afeitado',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/afeitado.png',
//     href: '/product-list/barberia/Afeitado',
//   },
//   {
//     text: 'Máquina y Herramientas Barbería',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/maquinas-afeitar.png',
//     href: '/product-list/barberia/maquina-y-herramientas-barberia',
//   },
//   {
//     text: 'Kits Barbería',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/kits-barberia.png',
//     href: '/product-list/barberia/kits-barberia',
//   },
// ];

// const facial = [
//   {
//     text: 'Limpiadoras Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/limpiadores.png',
//     href: '/product-list/facial/limpiadoras-faciales',
//   },
//   {
//     text: 'Tratamientos y Maquinas Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/tratamientos.png',
//     href: '/product-list/facial/tratamientos-y-maquinas-faciales',
//   },
//   {
//     text: 'Mascarillas Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/mascarillas.png',
//     href: '/product-list/facial/mascarillas-faciales',
//   },
//   {
//     text: 'Tonicos Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/tonicos.png',
//     href: '/product-list/facial/tonicos-faciales',
//   },
//   {
//     text: 'Serum Sueros Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/serum.png',
//     href: '/product-list/facial/serum-sueros-faciales',
//   },
//   {
//     text: 'Hidratación Facial',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/hidratacion.png',
//     href: '/product-list/facial/hidratacion-facial',
//   },
//   {
//     text: 'Proteccion Solar',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/protector-solar.png',
//     href: '/product-list/facial/proteccion-solar',
//   },
//   {
//     text: 'Accesorios Faciales',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/accesorios-faciales.png',
//     href: '/product-list/facial/accesorios-faciales',
//   },
// ];

// const electricos = [
//   {
//     text: 'Cortadoras',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/limpiadores.png',
//     href: '/product-list/electricos/cortadoras',
//   },
//   {
//     text: 'Lámpara UV',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/lampara-uv.png',
//     href: '/product-list/electricos/lampara-uv',
//   },
//   {
//     text: 'Lamparas Gel',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/lampara-uv.png',
//     href: '/product-list/electricos/lamparas-gel',
//   },
//   {
//     text: 'Planchas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/plancha.png',
//     href: '/product-list/electricos/planchas',
//   },
//   {
//     text: 'Rizadoras',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/rizadora.png',
//     href: '/product-list/electricos/rizadoras',
//   },
//   {
//     text: 'Secadores',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/secadores.png',
//     href: '/product-list/electricos/secadores',
//   },
// ];

// const AseoBioseguridad = [
//   {
//     text: 'Ambientadores y Velas',
//     value:
//       'https://moradoapp.vteximg.com.br/arquivos/ambientadores-y-velas.png',
//     href: '/product-list/aseo-y-bioseguridad/ambientadores-y-velas',
//   },
//   {
//     text: 'Articulos de Papel',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/papel.png',
//     href: '/product-list/aseo-y-bioseguridad/articulos-de-papel',
//   },
//   {
//     text: 'Baño',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/limpieza.png',
//     href: '/product-list/aseo-y-bioseguridad/bano',
//   },
//   {
//     text: 'Bioseguridad',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/bioseguridad.png',
//     href: '/product-list/aseo-y-bioseguridad/bioseguridad',
//   },
//   {
//     text: 'Control de Plagas',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/control-de-plagas.png',
//     href: '/product-list/aseo-y-bioseguridad/control-de-plagas',
//   },
//   {
//     text: 'Paños de Limpieza',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/limpieza.png',
//     href: '/product-list/aseo-y-bioseguridad/panos-de-limpieza',
//   },
//   {
//     text: 'Cuidado de la Ropa',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/cuidado-ropa.png',
//     href: '/product-list/aseo-y-bioseguridad/cuidado-ropa',
//   },
//   {
//     text: 'Desechables',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/desechables.png',
//     href: '/product-list/aseo-y-bioseguridad/desechables',
//   },
// ];

// const fragancias = [
//   {
//     text: 'Fragancias Hombre',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/fragancia-hombre.png',
//     href: '/product-list/fragancias/fragancias-hombre',
//   },
//   {
//     text: 'Fragancias Mujer',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/fragancia-mujer.png',
//     href: '/product-list/fragancias/fragancias-mujer',
//   },
//   {
//     text: 'Fragancias Niños y Bebes',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/fragancia-ninos.png',
//     href: '/product-list/fragancias/fragancias-ninos-y-bebes',
//   },
//   {
//     text: 'Fragancias Unisex',
//     value: 'https://moradoapp.vteximg.com.br/arquivos/fragancia-unisex.png',
//     href: '/product-list/fragancias/fragancias-unisex',
//   },
// ];
// const department = {
//   'cuidado-del-cabello': cuidadoDelCabello,
//   uñas: unas,
//   corporal: corporal,
//   barberia: barberia,
//   facial: facial,
//   electricos: electricos,
//   'aseo-y-bioseguridad': AseoBioseguridad,
//   fragancias: fragancias,
// };


